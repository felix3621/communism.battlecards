const http = require('http');
const WebSocket = require('ws');
const auth = require('./server/authentication.cjs');
const db = require('./server/database.cjs');

const avatar = require('./server/Avatars.json')
const cards = require('./server/Cards.json');

//Game Info
var queuedUsers = new Array();
var battleUsers = new Array();
var battles = new Array();
var tournaments = new Array();

//Game Memory
var gameID = 0;
var tournamentID = 0;

//Game Settings
const tickSpeed = 0.1;
const roundTime = 30/tickSpeed;


var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

class Battle {
    constructor(Tournament = null) {
        this.Tournament = Tournament;
        this.active = false;
        this.gameData = {};
        this.p1 = null;
        this.p2 = null;
        this.turnTime = roundTime;
        this.maxEnergy = 4;
        this.currentPlayer = "";
        this.round = 0;
        this.DataLoaded = 0;
        this.private = false;
        this.code = null
        this.dead = false;
        this.Projectiles = new Array();
    }
    SetP1(userName) {
        this.p1 = new Player(userName,this,"p1");
        if (this.p1 && this.p2) {this.active = true; this.StartGame();}
    }
    SetP2(userName) {
        this.p2 = new Player(userName,this,"p2");
        if (this.p1 && this.p2) {this.active = true; this.StartGame();}
    }
    waitForPlayerData() {
        return new Promise(resolve => {
            if (this.DataLoaded == 2) {
                resolve(true)
            } else {
                setTimeout(() => {
                    let wait = "loop";
                    resolve(wait);
                }, 100);
            }
        })
    }
    StartGame() {
        this.waitForPlayerData().then(() => {
            this.active = true;
            this.currentPlayer = "p1";
            this.DrawCardsToPlayer(this.p1,2);
            this.round = 1;
    
            this.p1.Energy = this.maxEnergy;
            this.p2.Energy = this.maxEnergy;
        })
    }
    SendInfo() {
        // Send to the right client
        //PlayerInfo: DisplayName, Avatar, Field, Hand, Energy, Title
        //EnemyInfo: DisplayName, Avatar, Field, Hand.length
        if (this.p1 && this.p1.Avatar) {
            let p1;
            if (this.Tournament) {
                p1 = this.Tournament.Sockets.find(obj => obj.username == this.p1.UserName);
            } else {
                p1 = battleUsers.find(obj => obj.username == this.p1.UserName);
            }
            
            if (p1 && p1.socket) {
                let rtn = {
                    PlayerInfo: {
                        DisplayName:this.p1.DisplayName,
                        Avatar:this.p1.Avatar,
                        Field:this.p1.Field,
                        Hand:this.p1.Hand,
                        Energy:this.p1.Energy,
                        Title:this.p1.title
                    },
                    TurnTime:Math.round(this.turnTime*tickSpeed),
                    MaxEnergy:this.maxEnergy,
                    round:this.round,
                    yourTurn: this.currentPlayer == "p1"
                }
                if (this.p2) {
                    rtn.EnemyInfo ={
                        DisplayName:this.p2.DisplayName,
                        Avatar:this.p2.Avatar,
                        Field:this.p2.Field,
                        Hand:this.p2.Hand.length
                    }
                }
                if (!this.active) {
                    rtn.code = this.code
                }
                rtn.Projectiles = [];
                for (let i = 0; i < this.Projectiles.length; i++) {
                    rtn.Projectiles.push(this.Projectiles[i]);
                }
                p1.socket.send(JSON.stringify(rtn))
            }
        }
        if (this.p2 && this.p2.Avatar){
            let p2;
            if (this.Tournament) {
                p2 = this.Tournament.Sockets.find(obj => obj.username == this.p2.UserName);
            } else {
                p2 = battleUsers.find(obj => obj.username == this.p2.UserName);
            }
            if (p2 && p2.socket) {
                let rtn = {
                    PlayerInfo: {
                        DisplayName:this.p2.DisplayName,
                        Avatar:this.p2.Avatar,
                        Field:this.p2.Field,
                        Hand:this.p2.Hand,
                        Energy:this.p2.Energy,
                        Title:this.p2.title
                    },
                    EnemyInfo: {
                        DisplayName:this.p1.DisplayName,
                        Avatar:this.p1.Avatar,
                        Field:this.p1.Field,
                        Hand:this.p1.Hand.length
                    },
                    TurnTime:Math.round(this.turnTime/10),
                    MaxEnergy:this.maxEnergy,
                    round:this.round,
                    yourTurn: this.currentPlayer == "p2"
                }
                rtn.Projectiles = [];
                for (let i = 0; i < this.Projectiles.length; i++) {
                    rtn.Projectiles.push(this.Projectiles[i]);
                }
                p2.socket.send(JSON.stringify(rtn))
            }
        }
        for (let i = 0; i < this.Projectiles.length; i++) {
            this.Projectiles = new Array();
        }
    }
    EndTurn() {
        this.turnTime = roundTime;
        if (this.currentPlayer == "p1"){
            if (this.maxEnergy < 20)
                this.maxEnergy++;
            this.currentPlayer = "p2";
            this.p2.Energy = this.maxEnergy;
            this.DrawCardsToPlayer(this.p2,2);
            if (this.round > 1) {
                for (let i = 0; i < this.p2.Field.length; i++) {
                    if (this.p2.Field[i].attackCooldown>0) {
                        this.p2.Field[i].attackCooldown--;
                    }
                }
                this.p2.Avatar.attackCooldown = 0;
            }            
        } else {
            
            this.currentPlayer = "p1";
            this.p1.Energy = this.maxEnergy;
            this.round++;
            this.DrawCardsToPlayer(this.p1,2);
            for (let i = 0; i < this.p1.Field.length; i++) {
                if (this.p1.Field[i].attackCooldown>0) {
                    this.p1.Field[i].attackCooldown--;
                }
            }
            this.p1.Avatar.attackCooldown = 0;
        }
    }
    PlayerDisconnected(userName) {
        if ((this.p1 && this.p1.UserName == userName) || (this.p2 && this.p2.UserName == userName)) {
            this.EndGame(userName)
        }
    }
    Update() {

        if (this.active) {
            if (this.currentPlayer == "p1") {
                this.p1.title = "Your turn";
                this.p2.title = "Other player's turn";
            } else if (this.currentPlayer == "p2") {
                this.p1.title = "Other player's turn";
                this.p2.title = "Your turn";
            } else {
                this.p1.title = "ERROR";
                this.p2.title = "ERROR";
            }
            this.turnTime--;
            if (this.turnTime <= 0) {
                this.EndTurn()
            }
        } else {
            this.p1.title = "Waiting for Players...";
        }
        let p1
        let p2
        if (this.p1)
            p1 = battleUsers.find(obj => obj.username == this.p1.UserName)
        if (this.p2)
            p2 = battleUsers.find(obj => obj.username == this.p2.UserName)
        if (p1 && !p1.socket && p2 && !p2.socket)
            this.EndGame()
        else if (p1 && !p1.socket && !p2)
            this.EndGame()
        this.SendInfo()
    }
    DrawCardsToPlayer(player, amount) {
        var AvalebleCards = new Array();
        for (let i = 0; i < player.Deck.length; i++) {
            if (player.Deck[i].Cost<=this.maxEnergy) {
                AvalebleCards.push(player.Deck[i]);
            }
        }
        if (AvalebleCards.length==0) {
            AvalebleCards = player.Deck;
        }
        for (let i = 0; i < amount; i++) {
            player.Hand.push(AvalebleCards[Math.floor(Math.random() * AvalebleCards.length)]);
        }
    }
    EndGame(looser) {
        console.log("Endgame, Looser:", looser)
        if (!this.dead && !this.Tournament) {
            if (this.p1 && this.p1.UserName == looser && this.p2) {
                giveRewards(this.p2.UserName)
            } else if (this.p2 && this.p2.UserName == looser && this.p1) {
                giveRewards(this.p1.UserName)
            }
        } else if (this.Tournament) {
            this.looser = looser;
        }
        this.dead = true;
    }
}
class Player {
    constructor(userName, match, playerType) {
        this.UserName = userName;
        this.PlayerType = playerType;
        this.DisplayName = null;
        this.Deck = null;
        this.Avatar = null;

        this.title = "";
        
        this.Hand = new Array();
        this.Field = new Array();
        this.Energy = 4;
        this.match = match;

        getPlayerInfo(userName,this, match);
    }
    UseCard(input) {
        if (this.match.currentPlayer == this.PlayerType){
            var Enemy;
            if (this.PlayerType == "p1") {
                Enemy = this.match.p2;
            } else {
                Enemy = this.match.p1;
            }
            var SelectedCardIndex = input.SelectedCardIndex;
            if (this.Hand[SelectedCardIndex] && this.Hand[SelectedCardIndex].Cost <= this.Energy)
            if (this.Hand[SelectedCardIndex] && this.Hand[SelectedCardIndex].Type == "Projectile") {
                var SelectedTargetIndex = input.SelectedTargetIndex;
                var TargetStone;
                if (input.EnemyType=="Avatar" && Enemy.Field.length==0) {
                    TargetStone = Enemy.Avatar;
                } else if (input.SelectedTargetIndex!=null) {
                    TargetStone = Enemy.Field[input.SelectedTargetIndex];
                }
                if (TargetStone) {
                    TargetStone.Health -= this.Hand[SelectedCardIndex].Attack;
                    
                    this.Energy -= this.Hand[SelectedCardIndex].Cost;
                    this.match.Projectiles.push({From:this.PlayerType,EnemyType:input.EnemyType,Texture:this.Hand[SelectedCardIndex].Texture,SelectedTargetIndex:SelectedTargetIndex});;
                    this.Hand.splice(SelectedCardIndex,1);
                    if (TargetStone.Health<=0) {
                        if (input.EnemyType=="Avatar") {
                            this.match.SendInfo();
                            if (this.match.p1 == this) {
                                this.match.EndGame(this.match.p2.UserName);
                            } else {
                                this.match.EndGame(this.match.p1.UserName);
                            }
                        } else {
                            Enemy.Field.splice(Enemy.Field.indexOf(TargetStone),1);
                        }
                    }
                }
            } else if (this.Hand[SelectedCardIndex] && this.Hand[SelectedCardIndex].Type == "Consumable") {

            }
        }
    }
    PlaceCard(input) {
        if (this.match.currentPlayer == this.PlayerType){
            var SelectedIndex = input.SelectedIndex;
            var SelectedCardIndex = input.SelectedCardIndex;
            if (this.Hand[SelectedCardIndex].Type && this.Hand[SelectedCardIndex] == "Projectile") {
                return;
            }
            if (this.Hand[SelectedCardIndex] && this.Field.length<6 && this.Energy >= this.Hand[SelectedCardIndex].Cost) {
                var newField = [
                    ...this.Field.slice(0, SelectedIndex),
                    new stone(this.Hand[SelectedCardIndex].Attack,this.Hand[SelectedCardIndex].Health,this.Hand[SelectedCardIndex].Texture,1),
                    ...this.Field.slice(SelectedIndex) 
                ];
                this.Field = newField;
                this.Energy -= this.Hand[SelectedCardIndex].Cost;
                this.Hand.splice(SelectedCardIndex,1);
            }
        }
    }
    SelectStoneTarget(input) {
        var Enemy;
        if (this.PlayerType == "p1") {
            Enemy = this.match.p2;
        } else {
            Enemy = this.match.p1;
        }
        var SelectedAttackIndex = input.SelectedAttackIndex;
        if (this.match.currentPlayer == this.PlayerType){
            var AttackingStone;
            var TargetStone;

            if (input.Type == "Avatar") {
                AttackingStone = this.Avatar;
            } else if (input.SelectedStoneIndex!=null) {
                AttackingStone = this.Field[input.SelectedStoneIndex];
            }
            if (input.EnemyType=="Avatar" && Enemy.Field.length==0) {
                TargetStone = Enemy.Avatar;
            } else if (input.SelectedAttackIndex!=null) {
                TargetStone = Enemy.Field[input.SelectedAttackIndex];
            }
            if (AttackingStone && !AttackingStone.attackCooldown) {AttackingStone.attackCooldown = 0;}
            if (AttackingStone && TargetStone && AttackingStone.attackCooldown<=0) {
                TargetStone.Health -= AttackingStone.Attack;
                AttackingStone.attackCooldown++;
                if (TargetStone.Health<=0) {
                    if (input.EnemyType=="Avatar") {
                        this.match.SendInfo();
                        if (this.match.p1 == this) {
                            this.match.EndGame(this.match.p2.UserName);
                        } else {
                            this.match.EndGame(this.match.p1.UserName);
                        }
                    } else {
                        Enemy.Field.splice(Enemy.Field.indexOf(TargetStone),1);
                    }
                }
            }
        }
    }
    EndTurn(Input) {
        if (this.match.currentPlayer == this.PlayerType) {
            this.match.EndTurn();
        }
    }
    Surrender(Input) {
        PlayerDisconnected(this.UserName);
    }
}

class stone {
    constructor(Attack, Health, Texture, attackCooldown) {
        this.Attack = Attack;
        this.Health = Health;
        this.Texture = Texture;
        this.attackCooldown = attackCooldown;
    }
}

class Tournament {
    constructor() {
        this.Sockets = new Array();
        this.Battles = new Array();
        this.code = null;
        this.active = false;
        this.CountDown = "";
        this.Alive = true;
    }
    addSocket(username, socket) {
        this.Sockets.push({username: username, socket: socket, reconnectTime: 30/tickSpeed, out: false, inGame:false, ready: false, wins:0});
        getDisplayName(username, this.Sockets[this.Sockets.length-1]);
    }
    Update() {
        if (this.CountDown>0) {
            this.CountDown--;
        }
        for (let i = 0; i < this.Sockets.length; i++) {
            if (this.Sockets[i].socket) {
                this.Sockets[i].reconnectTime = 30/tickSpeed;
            } else {
                this.Sockets[i].reconnectTime--
                if (this.Sockets[i].reconnectTime <= 0) {
                    this.Sockets.splice(i,1)
                    i--;
                }
            }
        }

        let readyPlayers = this.Sockets.filter(obj => !obj.out && !obj.inGame && obj.ready);
        let totalPlayers = this.Sockets.filter(obj => !obj.out)

        if (readyPlayers.length == totalPlayers.length && this.CountDown<=0) {
            this.StartBattles();
        }
        this.SendTournamentInfoTo();
        
        for (let i = 0; i < this.Battles.length; i++) {
            if (this.Battles[i].dead) {
                if (this.Battles[i].p1) {
                    var p1 = this.Sockets.find(obj => obj.username == this.Battles[i].p1.UserName)
                    p1.inGame = false;
                    if (this.Battles[i].looser && this.Battles[i].looser == p1.username) {
                        p1.out = true;
                    } else {
                        this.Sockets.find(obj => obj.username == this.Battles[i].p2.UserName).wins++;
                    }
                    if (!p1) {
                        this.Battles[i].EndGame(this.Battles[i].p1.UserName);
                    }
                }
                if (this.Battles[i].p2) {
                    var p2 = this.Sockets.find(obj => obj.username == this.Battles[i].p2.UserName)
                    p2.inGame = false;
                    if (this.Battles[i].looser && this.Battles[i].looser == p2.username) {
                        p2.out = true;
                    } else {
                        this.Sockets.find(obj => obj.username == this.Battles[i].p1.UserName).wins++;
                    }
                    if (!p2) {
                        this.Battles[i].EndGame(this.Battles[i].p2.UserName);
                    }
                }
                this.Battles.splice(i,1);
                i--;
                if (this.Battles.length==0) {
                    var Players = this.Sockets.filter(obj => !obj.out);
                    if (Players.length<=1) {
                        //Players@0
                        if (Players.length) {
                            giveRewards(Players[0].username);
                            console.log("tournament winner:",Players[0].username);
                        }

                        while (this.Sockets.length > 0) {
                            this.Sockets[0].socket.close(1008, 'Tournament Ended');
                            this.Sockets.splice(0,1);
                        }
                        this.Alive = false;
                    }
                }
            } else if (this.CountDown<=0) {
                this.Battles[i].Update();
            }
        }
    }
    StartBattles() {
        console.log("Start Battles!");
        var PlayerCount = this.Sockets.filter(obj => !obj.out).length;
        var Count=0;
        this.CountDown = 10/tickSpeed;

        
        for (let i = this.Sockets.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.Sockets[i], this.Sockets[j]] = [this.Sockets[j], this.Sockets[i]]; // Swap elements
        }

        for (let i = 0; i < this.Sockets.length; i++) {
            console.log("bob")
            if (!this.Sockets[i].out) {
                Count++;
            }
            if (this.Battles[this.Battles.length-1] && !this.Battles[this.Battles.length-1].active && !this.Battles[this.Battles.length-1].p2 && !this.Sockets[i].out) {
                console.log("a")
                this.Battles[this.Battles.length-1].SetP2(this.Sockets[i].username);
                this.Sockets[i].inGame = true;
                this.Sockets[i].ready = false;
            } else if (i != this.Sockets.length && Count != PlayerCount && !this.Sockets[i].out) {
                console.log("b")
                this.Battles.push(new Battle(this));
                this.Battles[this.Battles.length-1].SetP1(this.Sockets[i].username);
                this.Sockets[i].inGame = true;
                this.Sockets[i].ready = false;
            }
        }
    }
    SendTournamentInfoTo() { // Send Info
        var rtn = {
            TournamentPlayers: [],
            TournamentGames: [],
            TournamentScreen: true,
            TournamentCountDown: this.CountDown>0 ? Math.floor(this.CountDown*tickSpeed) : ""
        }
        if (!this.active) {
            rtn.code = this.code;
        }
        for (let i = 0; i < this.Sockets.length; i++) {
            rtn.TournamentPlayers.push({displayName:this.Sockets[i].displayName, username:this.Sockets[i].username,ready:this.Sockets[i].ready,out:this.Sockets[i].out});
        }
        for (let i = 0; i < this.Battles.length; i++) {
            if (this.Battles[i].DataLoaded == 2) 
                rtn.TournamentGames.push({p1:this.Battles[i].p1.Avatar, p2:this.Battles[i].p2.Avatar});
        }
        for (let i = 0; i < this.Sockets.length; i++) {
            if ((!this.Sockets[i].inGame|| this.CountDown>0) && this.Sockets[i].socket) {
                this.Sockets[i].socket.send(JSON.stringify(rtn));
            }
        }
    }
}

async function getDisplayName(username, value) {
    var result = await client.db("communism_battlecards").collection("accounts").findOne({username: username});
    if (result)
        value.displayName = result.display_name
}

async function giveRewards(username) {
    cardID = Math.floor(Math.random() * cards.length);
    var result = await client.db("communism_battlecards").collection("accounts").findOne({username: username})
    
    var item = result.inventory.find(obj => obj.card == cardID);
    if (item) {
        item.count++;
    } else {
        result.inventory.push({card:cardID,count:1});
    }


    await client.db("communism_battlecards").collection("accounts").updateOne({username: username},{$set:result})
}

// Create an HTTP server
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running.');
});

// Create a WebSocket server and attach it to the HTTP server
const webSocketServer = new WebSocket.Server({ noServer: true });

//authenticate cookies
async function authenticate(cookies) {
    var cookie = cookies
                        .split(';')
                        .map(cookie => cookie.trim())
                        .find(cookie => cookie.startsWith('userToken=')
                )
    if (cookie) {
        cookie = cookie.replace(/^userToken=/, '');
    } else {
        return null
    }


    let token = JSON.parse(auth.decrypt(decodeURIComponent(cookie)))
    let username = auth.decrypt(token[0])
    let password = auth.decrypt(token[1])

    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: username, password: password})
    if (result) {
        return username
    }
    return null;
}

async function authorizeSocket(socket, request) {
    let cookie = request.headers.cookie
    let username
    if (cookie) {
        username = await authenticate(cookie)
    } 
    if (!username) {
        socket.close(1008, 'Authentication failed');
        return false;
    }
    return username
}

async function getPlayerInfo(username, player, game) {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: username})
    
    player.DisplayName = result.display_name
    player.Deck = new Array();
    for (let i = 0; i < result.deck.length; i++) {
        player.Deck.push(cards[result.deck[i]]);
    }
    player.Avatar = { ...avatar[result.avatar]};
    game.DataLoaded++
}

async function tick() {
    for (let i = 0; i < battleUsers.length; i++) {
        //if logged on: ensure disconnectTime is 30s, else count-down
        if (battleUsers[i].socket) {
            battleUsers[i].reconnectTime = 30/tickSpeed;
        } else {
            battleUsers[i].reconnectTime--;
            //if disconnectTime of player hits 0, remove them, and handle that
            if (battleUsers[i].reconnectTime <=0) {
                let game = battles.find(obj => obj.p1.UserName == battleUsers[i].username || obj.p2.UserName == battleUsers[i].username)
                game.PlayerDisconnected(battleUsers[i].username)
            }
        }
    }
    //if players in queue: join open battles, or create new battle
    if (queuedUsers.length > 0) {
        let added = false
        if (battles.length > 0 && !battles[battles.length-1].active) {
            for (let i = battles.length - 1; i >= 0; i--) {
                if (!battles[i].active && !battles[i].private) {
                    battles[i].SetP2(queuedUsers[0].username)
                    added = true;
                    break;
                }
            }
        }
        if (!added) {
            battles.push(new Battle());
            battles[battles.length-1].code = auth.encrypt("game_"+gameID)
            battles[battles.length-1].SetP1(queuedUsers[0].username);
            gameID++
        }
        battleUsers.push(queuedUsers[0]);
        queuedUsers.splice(0,1);
    }
    
    //update all battles
    for (let i = 0; i < battles.length; i++) {
        if (battles[i].dead) {
            if (battles[i].p1) {
                let user1 = battleUsers.find(obj => obj.username == battles[i].p1.UserName)
                if (user1) {
                    if (user1.socket)
                        user1.socket.close(1008,'Game ended')
                    battleUsers = battleUsers.filter(obj => obj.username != user1.username)
                }
            }

            if (battles[i].p2) {
                let user2 = battleUsers.find(obj => obj.username == battles[i].p2.UserName)
                if (user2) {
                    if (user2.socket)
                        user2.socket.close(1008,'Game ended')
                    battleUsers = battleUsers.filter(obj => obj.username != user2.username)
                }
            }

            battles.splice(i,1)
            i--
        } else {
            battles[i].Update();
        }
    }

    for (let i = 0; i < tournaments.length; i++) {
        if (tournaments[i].Sockets.length==0 || !tournaments[i].Alive) {
            tournaments.splice(i,1);
            i--;
        } else {
            tournaments[i].Update()
        } 
    }
}

// Handle WebSocket connections
webSocketServer.on('connection', async(socket, request) => {
    let username = await authorizeSocket(socket, request);
    if (!username) return;

    const search = (new URL(request.url, 'http://localhost')).searchParams
    
    if (search.get("tournament") && decodeURIComponent(search.get("tournament")) == "new") {
        for (let i = 0; i < tournaments.length; i++) {
            let user = tournaments[i].Sockets.find(obj => obj.username == username)
            if (user) {
                user.socket.close(1008, 'Another instance logged on')
                let index = tournaments[i].Sockets.indexOf(obj => obj.username == username)
                tournaments[i].Sockets.splice(index, 1)
                break
            }
        }
        //new tournament
        tournaments.push(new Tournament())
        tournaments[tournaments.length-1].code = auth.encrypt("tournament"+tournamentID);
        tournamentID++;
        tournaments[tournaments.length-1].addSocket(username,socket);
    } else if (search.get("tournament")) {
        //join tournament
        let tournamentSearch = tournaments.find(obj => obj.code == decodeURIComponent(search.get("tournament")) && !obj.active)
        if (tournamentSearch) {
            let user = tournamentSearch.Sockets.find(obj => obj.username == username)
            if (user) {
                if (user.socket)
                    user.socket.close(1008, 'Another instance logged on')
                user.socket = socket
            } else {
                tournamentSearch.addSocket(username, socket)
            }
        } else 
            socket.close(1008, 'Game not found')
    } else {
        // if already logged on with same account, kick that account, and take it's place
        let queueUser = queuedUsers.find(obj => obj.username == username)
        if (queueUser) {
            //already in queue
            if (queueUser.socket) {
                queueUser.socket.close(1008, 'Another instance logged on')
            }
            queueUser.socket = socket;
        } else {
            let battleUser = battleUsers.find(obj => obj.username == username)
            if (battleUser) {
                //already in battle
                if (battleUser.socket) {
                    battleUser.socket.close(1008, 'Another instance logged on')
                }
                if (!search.get("private") && !search.get("code"))
                    battleUser.socket = socket;
                else {
                    let game = battles.find(obj => (obj.p1 && obj.p1.UserName == username) || (obj.p2 && obj.p2.UserName == username))
                    if (game)
                        game.PlayerDisconnected(username)
                }
            } else if (!search.get("private") && !search.get("code")) { 
                //add to queue
                queuedUsers.push({username: username, socket: socket, reconnectTime: 30})
            }
    
            if (search.get("private")) {
                battles.push(new Battle());
                battles[battles.length-1].code = auth.encrypt("game_"+gameID)
                battleUsers.push({username: username, socket: socket, reconnectTime: 30})
                battles[battles.length-1].SetP1(username);
                battles[battles.length-1].private = true;
                gameID++
            } else if (search.get("code")) {
                let battle = battles.find(obj => obj.code == decodeURIComponent(search.get("code")))
                if (battle) {
                    if (!battle.p2 || battle.p2.UserName == username) {
                        battleUsers.push({username: username, socket: socket, reconnectTime: 30})
                        battle.SetP2(username)
                    }
                } else {
                    socket.close(1008, 'game not found');
                }
            }
        }
    }

    socket.on('message', (message) => {
        var command = JSON.parse(message)
        //what game are we in?
        let game = battles.find(obj => (obj.p1 && obj.p1.UserName == username) || (obj.p2 && obj.p2.UserName == username))
        if (game) {
            let p1 = (game.p1.UserName == username)
            if (game[p1 ? "p1" : "p2"][command.function])
                game[p1 ? "p1" : "p2"][command.function](command)
        }
        for (let i = 0; i < tournaments.length; i++) {
            let socketSearch = tournaments[i].Sockets.find(obj => obj.username == username);
            if (socketSearch) {
                let game = tournaments[i].Battles.find(obj => obj.p1.UserName == username || obj.p2.UserName == username)
                if (game) {
                    let p1 = (game.p1.UserName == username)
                    if (game[p1 ? "p1" : "p2"][command.function])
                        game[p1 ? "p1" : "p2"][command.function](command)
                }
                if (command.tournamentReady && tournaments[i].Sockets.length>1) {
                    socketSearch.ready = true;
                }
                break;
            }
        }
    });

    //handle disconnects
    socket.on('close', (id) => {
        if (id != 1008) {
            //was player in queue, then kick them
            let queueUserIndex = queuedUsers.findIndex(obj => obj.username == username);
            if (queueUserIndex != -1) {
                queuedUsers.splice(queueUserIndex,1);
            }

            //was player in battle, then remove socket
            let battleUser = battleUsers.find(obj => obj.username == username)
            if (battleUser) {
                battleUser.socket = null;
            }
        }
    });
});

setInterval(tick, 1000*tickSpeed);

// Upgrade the connection to WebSocket when a WebSocket request is received
httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, (socket) => {
        webSocketServer.emit('connection', socket, request);
    });
});

// Listen on port 3000
httpServer.listen(3000, () => {
    console.log('socket running on port 3000');
});