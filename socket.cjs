const http = require('http');
const WebSocket = require('ws');
const auth = require('./server/authentication.cjs');
const db = require('./server/database.cjs');

const avatar = require('./server/Avatars.json')
const cards = require('./server/Cards.json');
const { Int32 } = require('mongodb');

//Game Info
var queuedUsers = new Array();
var battleUsers = new Array();
var battles = new Array();

const roundTime = 300

class Battle {
    constructor() {
        this.active = false;
        this.gameData = {};
        this.p1 = null;
        this.p2 = null;
        this.turnTime = roundTime;
        this.maxEnergy = 4;
        this.currentPlayer = "";
        this.round = 0;
        this.DataLoaded = 0;
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
            let p1 = battleUsers.find(obj => obj.username == this.p1.UserName)
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
                    TurnTime:Math.round(this.turnTime/10),
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
                p1.socket.send(JSON.stringify(rtn))
            }
        }
        if (this.p2 && this.p2.Avatar){
            let p2 = battleUsers.find(obj => obj.username == this.p2.UserName)
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
                p2.socket.send(JSON.stringify(rtn))
            }
        }
    }
    EndTurn() {
        this.turnTime = roundTime;
        if (this.currentPlayer == "p1"){
            this.currentPlayer = "p2";
            this.DrawCardsToPlayer(this.p2,2);
            
        } else {
            if (this.maxEnergy < 10)
                this.maxEnergy++;
            this.currentPlayer = "p1";
            this.p2.Energy = this.maxEnergy;
            this.p1.Energy = this.maxEnergy;
            this.round++;
            this.DrawCardsToPlayer(this.p1,2);
        }
    }
    PlayerDisconnected(userName) {
        //other player win
        //stop battle, and disconnect all players
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
        this.SendInfo()
    }
    DrawCardsToPlayer(player, amount) {
        var AvalebleCards = new Array();
        for (let i = 0; i < player.Deck.length; i++) {
            if (player.Deck[i].Cost<=this.maxEnergy) {
                AvalebleCards.push(player.Deck[i]);
            }
        }
        for (let i = 0; i < amount; i++) {
            player.Hand.push(AvalebleCards[Math.floor(Math.random() * AvalebleCards.length)]);
        }
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
    PlaceCard(input) {
        if (this.match.currentPlayer == this.PlayerType){
            var SelectedIndex = input.SelectedIndex;
            var SelectedCardIndex = input.SelectedCardIndex;
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
        if (this.match.currentPlayer == this.PlayerType){
            var SelectedStoneIndex = input.SelectedStoneIndex;
            var SelectedAttackIndex = input.SelectedAttackIndex;
            var Enemy;
            if (this.PlayerType == "p1") {
                Enemy = this.match.p2;
            } else {
                Enemy = this.match.p1;
            }
            if (this.Field[SelectedStoneIndex] && Enemy.Field[SelectedAttackIndex]) {
                this.Field[SelectedStoneIndex].Attack = SelectedAttackIndex;
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
    constructor(attackDMG, health, texture, attackCooldown) {
        this.attackDMG = attackDMG;
        this.health = health;
        this.texture = texture;
        this.attackCooldown = attackCooldown;
    }
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
    const cookie = decodeURIComponent(
                    cookies
                        .split(';')
                        .map(cookie => cookie.trim())
                        .find(cookie => cookie.startsWith('userToken='))
                        .replace(/^userToken=/, ''));


    let token = JSON.parse(auth.decrypt(cookie))
    let username = auth.decrypt(token[0])
    let password = auth.decrypt(token[1])

    let client = await db.connect()
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: username, password: password})
    await client.close()
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
    let client = await db.connect()
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: username})
    await client.close()
    
    player.DisplayName = result.display_name
    player.Deck = new Array();
    for (let i = 0; i < result.deck.length; i++) {
        player.Deck.push(cards[result.deck[i]]);
    }
    player.Avatar = avatar[result.avatar];
    game.DataLoaded++
}

async function tick() {
    for (let i = 0; i < battleUsers.length; i++) {
        //if logged on: ensure disconnectTime is 30, else count-down
        if (battleUsers[i].socket) {
            battleUsers[i].reconnectTime = 30;
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
        if (battles.length > 0 && !battles[battles.length-1].active) {
            battles[battles.length-1].SetP2(queuedUsers[0].username)
        } else {
            battles.push(new Battle());
            battles[battles.length-1].SetP1(queuedUsers[0].username);
        }
        battleUsers.push(queuedUsers[0]);
        queuedUsers.splice(0,1);
    }
    
    //update all battles
    for (let i = 0; i < battles.length; i++) {
        battles[i].Update();
    }
}

// Handle WebSocket connections
webSocketServer.on('connection', async(socket, request) => {
    let username = await authorizeSocket(socket, request);
    if (!username) return;

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
            battleUser.socket = socket;
        } else { 
            //add to queue
            queuedUsers.push({username: username, socket: socket, reconnectTime: 30})
        }
    }

    socket.on('message', (message) => {
        //what game are we in?
        let game = battles.find(obj => obj.p1.UserName == username || obj.p2.UserName == username)
        if (game) {
            let p1 = (game.p1.UserName == username)
            command = JSON.parse(message)
            if (game[p1 ? "p1" : "p2"][command.function])
                game[p1 ? "p1" : "p2"][command.function](command)
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

setInterval(tick, 100);

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