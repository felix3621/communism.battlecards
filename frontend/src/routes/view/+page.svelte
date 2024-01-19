<style>
    #logo {
        position: fixed;
        top:0;
        left:0;
        background-color: rgb(50, 50, 50);
        border-radius: 0 0 25px 0;
        outline: 5px black solid;
        max-height: 10%;
        padding: 0 10px 20px 0;
        cursor: pointer;
    }
    #gameList {
        background-color: rgb(50, 50, 50);
        outline: 10px black solid;
        border-radius: 25px;
        position: fixed;
        top: 20%;
        bottom: 10%;
        left: 2.5%;
        right: 55%;
    }
    #selectedDisplay {
        background-color: rgb(50, 50, 50);
        outline: 10px black solid;
        border-radius: 25px;
        position: fixed;
        top: 20%;
        bottom: 10%;
        left: 55%;
        right: 2.5%;
        color: white;
        text-align: center;
    }
    #games {
        float: left;
        height: 100%;
        width: calc(50% - 5px);
        border-right: 5px solid black;
    }
    #tournaments {
        float: left;
        height: 100%;
        width: calc(50% - 5px);
        border-left: 5px solid black;
    }
    .title {
        width: 100%;
        text-align: center;
        color: white;
        font-size: 20px;
        border-bottom: 5px solid black;
        height: calc(5% - 5px);
    }
    .list {
        width: 100%;
        height: 95%;
        overflow: auto;
        color: white;
    }
    :global(#battle_top) {
        width: 100%;
        height: 5%;
        display: grid;
        grid-template-columns: repeat(2,50%);
        grid-template-rows: repeat(2,50%);
        border-bottom: 5px solid black;
    }
    :global(#tournament_top) {
        width: 100%;
        height: calc(5% - 5px);
        display: grid;
        grid-template-columns: repeat(2,50%);
        grid-template-rows: repeat(2,50%);
        border-bottom: 5px solid black;
    }
    :global(#battle_slot_p1) {
        height: calc(95% - 5px);
        width: calc(50% - 5px);
        float: left;
        overflow: auto;
    }
    :global(#battle_slot_p2) {
        height: calc(95% - 5px);
        width: calc(50% - 5px);
        float: left;
        direction: rtl;
        overflow: auto;
    }
    :global(.battle_container) {
        height: 100%;
        width: 100%;
        direction: ltr;
    }
    :global(.battle_container > *) {
        width: 100%;
    }
    :global(.battle_player_username) {
        border-bottom: 5px solid black;
    }
    :global(.battle_player_energy) {
        border-bottom: 5px solid black;
        border-top: 5px solid black;
    }
    :global(.battle_player_energy *) {
        width: 20%;
    }
    :global(.battle_player_avatar) {
        border-bottom: 5px solid black;
        border-top: 5px solid black;
    }
    :global(.battle_player_hand) {
        border-bottom: 5px solid black;
        border-top: 5px solid black;
    }
    :global(.battle_player_hand *) {
        width: 20%;
    }
    :global(.battle_player_field) {
        border-top: 5px solid black;
        display: grid;
        grid-template-columns: repeat(auto-fit,calc(100% / 3));
    }
    :global(.currentPlayer) {
        background-color: rgb(75, 75, 75);
    }
    :global(#tournament_playerCount) {
        border-bottom: 5px solid black;
        border-top: 5px solid black;
        height: calc(4% - 10px);
    }
    :global(#tournament_playerList) {
        border-bottom: 5px solid black;
        border-top: 5px solid black;
        height: calc(15% - 10px);
        overflow: auto;
    }
    :global(#tournament_playerList > div) {
        width: 100%;
    }
    :global(#tournament_playerList > div > div) {
        width: 50%;
        float: left;
    }
    :global(#tournament_battleList) {
        border-bottom: 5px solid black;
        border-top: 5px solid black;
        height: calc(10% - 10px);
        overflow: auto;
    }
    :global(#tournament_battleList *) {
        cursor: pointer;
    }
    :global(#tournament_battleDisplay) {
        width: 100%;
        height: 66%;
    }
    :global(#tournament_battleDisplay_round, #tournament_battleDisplay_timer) {
        width: 50%;
        float: left;
        height: calc(6% - 10px);
        border-bottom: 5px solid black;
        border-top: 5px solid black;
    }
    :global(#tournament_battleDisplay_slot_p1, #tournament_battleDisplay_slot_p2) {
        width: 50%;
        float: left;
        height: 94%;
        overflow: auto;
    }
    :global(#tournament_battleDisplay_slot_p2) {
        direction: rtl;
    }
    #lastPing {
        background-color: rgb(50, 50, 50);
        outline: 5px black solid;
        border-radius: 25px;
        position: fixed;
        top: 12.5%;
        bottom: 82.5%;
        left: 45%;
        right: 45%;
        color: white;
        text-align: center;
    }
    #logPanel {
        position: fixed;
        top:0;
        right:0;
        background-color: rgb(50, 50, 50);
        border-radius: 0 0 0 25px;
        outline: 5px black solid;
        height: 12.5%;
        width: 40%;
        padding: 0 0 10px 10px;
    }
    #logPanel > div {
        direction: rtl;
        overflow: auto;
        width: 100%;
        height: 100%;
    }
    #log {
        width: 100%;
        height: fit-content;
        direction: ltr;
        color: white;
    }
    :global(#log > p) {
        margin: 0;
        border-bottom: 2.5px solid black;
    }
</style>
<img id="logo" src="/images/BattlecardsLogo.png" on:click={()=>window.location.href="/"}>

<div id="gameList">
    <div id="games">
        <div class="title">Games</div>
        <div class="list" id="GamesList"></div>
    </div>
    <div id="tournaments">
        <div class="title">Tournaments</div>
        <div class="list"  id="TournamentsList"></div>
    </div>
</div>
<div id="selectedDisplay"></div>
<div id="lastPing">Last Ping:<br>{lastPing.toFixed(1)}s</div>

<div id="logPanel">
    <div>
        <div id="log"></div>
    </div>
</div>

<script>
    import { onMount } from "svelte";

    var socket;
    var lastPing = 0;

    setInterval(() => {
        lastPing += 0.1;
    }, 100);

    function createSocket() {
        socket = new WebSocket(`wss://${window.location.host}/socket/game?admin=true`);

        socket.onopen = () => {
            console.log('Connected to server');
            lastPing = 0;
        }

        socket.onmessage = (event) => {
            var data = JSON.parse(event.data)
            console.log(data)
            Update(data)
            lastPing = 0;
        }

        socket.onclose = (event) => {
            console.log('Connection closed', event);
            if (event.code == 1008) {
                setTimeout(() => {window.location.href = "/"},1000)
            } else {
                setTimeout(createSocket, 1000)
            }
        }

        socket.onerror = (error) => {
            console.log('WebSocket error:', error);
        }
    }

    onMount(async() => {
        const user = await fetch(window.location.origin+'/api/account/login', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        if (user.ok) {
            let ud = await user.json();
            if (!ud.view)
                window.location.href = '/';
        } else
            window.location.href = '/login';

        createSocket();
    })

    async function autoScroll(element) {
        element.scroll({ top: element.scrollHeight, behavior: 'smooth' });

    }

    function Update(data) {
        UpdateSelected(data)
        if (data.battles)
            UpdateGameList(data.battles)
        if (data.tournaments)
            UpdateTournamentList(data.tournaments)
        if (data.log) {
            let logDiv = document.getElementById("log")
            for (let i = 0; i < data.log.length || i<logDiv.children.length; i++) {
                if (i<data.log.length && i>=logDiv.children.length) {
                    logDiv.appendChild(document.createElement("p"))
                    logDiv.children[i].innerText = data.log[i]
                    autoScroll(logDiv.parentNode)
                } else if (i<data.log.length && i<logDiv.children.length) {
                    logDiv.children[i].innerText = data.log[i];
                } else {
                    logDiv.children[i].remove;
                    autoScroll(logDiv.parentNode)
                    i--;
                }
            }
        }
    }

    function updateGamePlayer(div, data, playerData) {
        if (div.children.length > 0) {
            //username
            div.getElementsByClassName("battle_player_username")[0].innerText = playerData.username

            //energy
            let energyDiv = div.getElementsByClassName("battle_player_energy")[0]
            energyDiv.innerText = "Energy: " + playerData.energy + "/" + data.maxEnergy

            //avatar
            let avatarDiv = div.getElementsByClassName("battle_player_avatar")[0]
            if (avatarDiv.children.length == 0) {
                avatarDiv.appendChild(CreateCharacterStone(playerData.avatar.Card.Attack, playerData.avatar.Card.Health, playerData.avatar.Card.Texture))
            } else {
                avatarDiv.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerText = playerData.avatar.Card.Health
            }

            //hand
            let handDiv = div.getElementsByClassName("battle_player_hand")[0]
            handDiv.innerHTML = "<img src=\"/images/EmptyCard.png\"> X " + playerData.handCount

            let fieldDiv = div.getElementsByClassName("battle_player_field")[0]
            for (let i = 0; i < playerData.field.length || i<fieldDiv.children.length; i++) {
                if (i<playerData.field.length && i>=fieldDiv.children.length) {
                    fieldDiv.appendChild(CreateCharacterStone(playerData.field[i].Card.Attack, playerData.field[i].Card.Health, playerData.field[i].Card.Texture, playerData.field[i].Card.Type));
                } else if (i<playerData.field.length && i < fieldDiv.children.length) {
                    UpdateStone(fieldDiv.children[i],playerData.field[i].Card.Attack, playerData.field[i].Card.Health, playerData.field[i].Card.Texture, playerData.field[i].Card.Type);
                } else {
                    fieldDiv.children[i].remove();
                    i--;
                }
            }
            
        } else if (playerData) {
            let p1Container = document.createElement("div")
            p1Container.classList.add("battle_container")
            let username = document.createElement("div")
            username.classList.add("battle_player_username")
            p1Container.appendChild(username)
            let energy = document.createElement("div")
            energy.classList.add("battle_player_energy")
            p1Container.appendChild(energy)
            let avatar = document.createElement("div")
            avatar.classList.add("battle_player_avatar")
            p1Container.appendChild(avatar)
            let hand = document.createElement("div")
            hand.classList.add("battle_player_hand")
            p1Container.appendChild(hand)
            let field = document.createElement("div")
            field.classList.add("battle_player_field")
            p1Container.appendChild(field)
            div.appendChild(p1Container)
        } else {
            div.innerHTML = ""
        }
    }

    function UpdateSelected(data) {
        let parent = document.getElementById("selectedDisplay")
        if (data.selected) {
            if (data.selected.type == "battle") {
                if (parent.getAttribute("selectedType") == "battle") {
                    //top
                    document.getElementById("battle_top_type").innerText = (data.selected.private) ? "Battle (private)" : "Battle"
                    document.getElementById("battle_top_code").innerText = data.selected.code
                    document.getElementById("battle_top_round").innerText = data.selected.round
                    document.getElementById("battle_top_timer").innerText = Math.floor(data.selected.turnTime/60) + ":" + String(data.selected.turnTime%60).padStart(2,"0")

                    //p1
                    let p1 = document.getElementById("battle_slot_p1")
                    if (data.selected.currentPlayer == "p1" && !p1.classList.contains("currentPlayer")) {
                        p1.classList.add("currentPlayer")
                    } else if (!(data.selected.currentPlayer == "p1") && p1.classList.contains("currentPlayer")) {
                        p1.classList.remove("currentPlayer")
                    }
                    updateGamePlayer(p1, data.selected, data.selected.p1)

                    //p2
                    let p2 = document.getElementById("battle_slot_p2")
                    if (data.selected.currentPlayer == "p2" && !p2.classList.contains("currentPlayer")) {
                        p2.classList.add("currentPlayer")
                    } else if (!(data.selected.currentPlayer == "p2") && p2.classList.contains("currentPlayer")) {
                        p2.classList.remove("currentPlayer")
                    }
                    updateGamePlayer(p2, data.selected, data.selected.p2)
                } else {
                    //create base
                    let top = document.createElement("div");
                    top.id = "battle_top"

                    let gameType = document.createElement("div");
                    gameType.id = "battle_top_type"
                    top.appendChild(gameType)
                    let code = document.createElement("div");
                    code.id = "battle_top_code"
                    top.appendChild(code)
                    let round = document.createElement("div");
                    round.id = "battle_top_round"
                    top.appendChild(round)
                    let roundTime = document.createElement("div");
                    roundTime.id = "battle_top_timer"
                    top.appendChild(roundTime)

                    parent.appendChild(top)

                    let p1Slot = document.createElement("div")
                    p1Slot.id = "battle_slot_p1"
                    parent.appendChild(p1Slot)
                    let p2Slot = document.createElement("div")
                    p2Slot.id = "battle_slot_p2"
                    parent.appendChild(p2Slot)

                    parent.setAttribute("selectedType", "battle")
                }
                return
            } else if (data.selected.type == "tournament") {
                if (parent.getAttribute("selectedType") == "tournament") {
                    //top
                    document.getElementById("tournament_top_type").innerText = "Tournament"
                    document.getElementById("tournament_top_code").innerText = data.selected.code
                    document.getElementById("tournament_top_active").innerText = data.selected.active ? "Active" : "Not started"
                    document.getElementById("tournament_top_countdown").innerText = data.selected.countdown

                    document.getElementById("tournament_playerCount").innerText = data.selected.users.length + " players"

                    let playerList = document.getElementById("tournament_playerList")
                    for (let i = 0; i < playerList.children.length || i < data.selected.users.length; i++) {
                        if (i < data.selected.users.length && i < playerList.children.length) {
                            playerList.children[i].children[0].innerText = data.selected.users[i].username
                            
                            if (data.selected.users[i].inGame) {
                                playerList.children[i].children[1].innerText = "In Game"
                            } else if (data.selected.users[i].out) {
                                playerList.children[i].children[1].innerText = "Out"
                            } else if (data.selected.users[i].ready) {
                                playerList.children[i].children[1].innerText = "Ready"
                            } else {
                                playerList.children[i].children[1].innerHTML = "&nbsp;"
                            }
                        } else if (i < data.selected.users.length && i >= playerList.children.length) {
                            let main = document.createElement("div")
                            main.appendChild(document.createElement("div"))
                            main.appendChild(document.createElement("div"))
                            playerList.appendChild(main)
                        } else {
                            playerList.children[i].remove();
                            i--;
                        }
                    }

                    let battleList = document.getElementById("tournament_battleList")
                    for (let i = 0; i < battleList.children.length || i < data.selected.battles.length; i++) {
                        if (i < data.selected.battles.length && i < battleList.children.length) {
                            battleList.children[i].innerText = data.selected.battles[i].p1 + " vs " + data.selected.battles[i].p2
                            battleList.children[i].onclick = () => socket.send(JSON.stringify({tournamentSpecific: {p1: data.selected.battles[i].p1, p2: data.selected.battles[i].p2}}))
                        } else if (i < data.selected.battles.length && i >= battleList.children.length) {
                            battleList.appendChild(document.createElement("div"))
                        } else {
                            battleList.children[i].remove();
                            i--;
                        }
                    }

                    let p1 = document.getElementById("tournament_battleDisplay_slot_p1")
                    let p2 = document.getElementById("tournament_battleDisplay_slot_p2")
                    if (data.specific) {
                        document.getElementById("tournament_battleDisplay_round").innerText = data.specific.round
                        document.getElementById("tournament_battleDisplay_timer").innerText = Math.floor(data.specific.turnTime/60) + ":" + String(data.specific.turnTime%60).padStart(2,"0")
                        
                        //p1
                        if (data.specific.currentPlayer == "p1" && !p1.classList.contains("currentPlayer")) {
                            p1.classList.add("currentPlayer")
                        } else if (!(data.specific.currentPlayer == "p1") && p1.classList.contains("currentPlayer")) {
                            p1.classList.remove("currentPlayer")
                        }
                        updateGamePlayer(p1, data.specific, data.specific.p1)

                        //p2
                        if (data.specific.currentPlayer == "p2" && !p2.classList.contains("currentPlayer")) {
                            p2.classList.add("currentPlayer")
                        } else if (!(data.specific.currentPlayer == "p2") && p2.classList.contains("currentPlayer")) {
                            p2.classList.remove("currentPlayer")
                        }
                        updateGamePlayer(p2, data.specific, data.specific.p2)
                    } else {
                        document.getElementById("tournament_battleDisplay_round").innerText = ""
                        document.getElementById("tournament_battleDisplay_timer").innerText = ""

                        p1.innerHTML = ""
                        if (p1.classList.contains("currentPlayer")) {
                            p1.classList.remove("currentPlayer")
                        }
                        p2.innerHTML = ""
                        if (p2.classList.contains("currentPlayer")) {
                            p2.classList.remove("currentPlayer")
                        }
                    }
                } else {
                    //create base
                    let top = document.createElement("div");
                    top.id = "tournament_top"

                    let gameType = document.createElement("div");
                    gameType.id = "tournament_top_type"
                    top.appendChild(gameType)
                    let code = document.createElement("div");
                    code.id = "tournament_top_code"
                    top.appendChild(code)
                    let active = document.createElement("div");
                    active.id = "tournament_top_active"
                    top.appendChild(active)
                    let countdown = document.createElement("div");
                    countdown.id = "tournament_top_countdown"
                    top.appendChild(countdown)

                    parent.appendChild(top)

                    let playerCount  = document.createElement("div");
                    playerCount.id = "tournament_playerCount"
                    parent.appendChild(playerCount)

                    let playerList  = document.createElement("div");
                    playerList.id = "tournament_playerList"
                    parent.appendChild(playerList)

                    let battleList  = document.createElement("div");
                    battleList.id = "tournament_battleList"
                    parent.appendChild(battleList)

                    let battleDisplay = document.createElement("div");
                    battleDisplay.id = "tournament_battleDisplay"

                    let battleRound = document.createElement("div");
                    battleRound.id = "tournament_battleDisplay_round"
                    battleDisplay.appendChild(battleRound)

                    let battleTimer = document.createElement("div");
                    battleTimer.id = "tournament_battleDisplay_timer"
                    battleDisplay.appendChild(battleTimer)

                    let battleSlotP1 = document.createElement("div");
                    battleSlotP1.id = "tournament_battleDisplay_slot_p1"
                    battleDisplay.appendChild(battleSlotP1)

                    let battleSlotP2 = document.createElement("div");
                    battleSlotP2.id = "tournament_battleDisplay_slot_p2"
                    battleDisplay.appendChild(battleSlotP2)

                    parent.appendChild(battleDisplay)

                    parent.setAttribute("selectedType", "tournament")
                }
                return
            }
        }

        parent.innerHTML = "";
        parent.setAttribute("selectedType", "")
    }

    function UpdateGameList(GameList) {
        var GameListElement = document.getElementById("GamesList");
        // Loop
        for (let i = 0; i < GameList.length || i < GameListElement.children.length; i++) {
            if (i<GameList.length && i>=GameListElement.children.length) { // create
                var NewElement = document.createElement("p");
                NewElement.style.cursor = "pointer";
                NewElement.innerHTML = GameList[i].code + "<br>p1: " + GameList[i].p1 + "<br>p2: " + GameList[i].p2;
                GameListElement.appendChild(NewElement);
                NewElement.onclick = () => socket.send(JSON.stringify({type: "battle", code: GameList[i].code}))
            } else if (i<GameList.length && i<GameListElement.children.length) { // Update
                GameListElement.children[i].innerHTML = GameList[i].code + "<br>&nbsp; p1: " + GameList[i].p1 + "<br>&nbsp; p2: " + GameList[i].p2;
                GameListElement.children[i].onclick = () => socket.send(JSON.stringify({type: "battle", code: GameList[i].code}))
            } else { // Remove
                GameListElement.children[i].remove();
            }
        }
    }
    function UpdateTournamentList(TournamentList) {
        var TournamentsListElement = document.getElementById("TournamentsList");
        // Loop
        for (let i = 0; i < TournamentList.length || i < TournamentsListElement.children.length; i++) {
            if (i<TournamentList.length && i>=TournamentsListElement.children.length) { // create
                var NewElement = document.createElement("p");
                NewElement.style.cursor = "pointer";
                NewElement.innerHTML = TournamentList[i].code;
                for (let j = 0; j < TournamentList[i].userList.length; j++) {
                    NewElement.innerHTML += "<br>&nbsp; " + TournamentList[i].userList[j]
                }
                TournamentsListElement.appendChild(NewElement);
                NewElement.onclick = () => socket.send(JSON.stringify({type: "tournament", code: TournamentList[i].code}))
            } else if (i<TournamentList.length && i<TournamentsListElement.children.length) { // Update
                TournamentsListElement.children[i].innerHTML = TournamentList[i].code;
                for (let j = 0; j < TournamentList[i].userList.length; j++) {
                    TournamentsListElement.children[i].innerHTML += "<br>&nbsp; " + TournamentList[i].userList[j]
                }
                TournamentsListElement.children[i].onclick = () => socket.send(JSON.stringify({type: "tournament", code: TournamentList[i].code}))
            } else { // Remove
                TournamentsListElement.children[i].remove();
            }
        }
    }
    
    function CreateCharacterStone(Attack, Health, Texture, Type = null) {
        //THE CharacterStone
        var CharacterStone = document.createElement("div");
        CharacterStone.classList.add("CharacterStone");
        if (Type != null && Type == "Tank") {
            CharacterStone.style.backgroundImage = "url('/images/Cards/"+Texture+".png'), url('/images/shield.png')";
        } else 
            CharacterStone.style.backgroundImage = "url('/images/Cards/"+Texture+".png')";

        //DMG
        var CharacterStoneDMG = document.createElement("div");
        CharacterStoneDMG.classList.add("CharacterStoneDMG");
        CharacterStone.appendChild(CharacterStoneDMG);

        //DMG Display
        var CharacterStoneDMGText = document.createElement("p");
        CharacterStoneDMGText.innerHTML = Attack;
        CharacterStoneDMG.appendChild(CharacterStoneDMGText);

        //CardHealth
        var CharacterStoneHealth = document.createElement("div");
        CharacterStoneHealth.classList.add("CharacterStoneHealth");
        CharacterStone.appendChild(CharacterStoneHealth);

        //Health Display
        var CharacterStoneHealthText = document.createElement("p");
        CharacterStoneHealthText.innerHTML = Health;
        CharacterStoneHealth.appendChild(CharacterStoneHealthText);

        return CharacterStone;
    }
    function UpdateStone(Stone,Attack,Health,Texture, Type = null) {
        Stone.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = Attack;
        Stone.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health;
        if (Type != null && Type == "Tank") {
            Stone.style.backgroundImage = "url('/images/Cards/"+Texture+".png'), url(images/shield.png)";
        } else 
            Stone.style.backgroundImage = "url('/images/Cards/"+Texture+".png')";
    }
</script>