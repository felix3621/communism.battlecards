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
    :global(#battle_slot_p1) {
        height: calc(95% - 5px);
        width: calc(50% - 5px);
        border-right: 5px solid black;
        float: left;
    }
    :global(#battle_slot_p2) {
        height: calc(95% - 5px);
        width: calc(50% - 5px);
        border-left: 5px solid black;
        float: left;
        direction: rtl;
    }
    :global(.battle_container) {
        height: 100%;
        width: 100%;
        overflow: auto;
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
    }
</style>
<img id="logo" src="images/BattlecardsLogo.png" on:click={()=>window.location.href="/"}>

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

<script>
    import { onMount } from "svelte";

    var socket;


    function createSocket() {
        socket = new WebSocket(`wss://${window.location.host}/gamesocket?admin=true`);

        socket.onopen = () => {
            console.log('Connected to server');
        }

        socket.onmessage = (event) => {
            var data = JSON.parse(event.data)
            console.log(data)
            Update(data)
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
            if (!ud.admin)
                window.location.href = '/';
        } else
            window.location.href = '/login';

        createSocket();
    })

    function Update(data) {
        UpdateSelected(data)
        if (data.battles)
            UpdateGameList(data.battles)
        if (data.tournaments)
            UpdateTournamentList(data.tournaments)
    }

    function updatePlayer(div, data, playerData) {
        if (div.children.length > 0) {
            //username
            div.getElementsByClassName("battle_player_username")[0].innerHTML = "<p>"+playerData.username+"</p>"

            //energy
            let energyDiv = div.getElementsByClassName("battle_player_energy")[0]
            if (energyDiv.children.length != data.selected.maxEnergy) {
                energyDiv.innerHTML = ""
                for (let i = 0; i < data.selected.maxEnergy; i++) {
                    let img = document.createElement("img")
                    img.setAttribute("src", "/images/EnergyIcon.png")
                    energyDiv.appendChild(img)
                }
            }
            for (let i = 0; i < data.selected.maxEnergy; i++) {
                if (playerData.energy < data.selected.maxEnergy-i) {
                    energyDiv.children[i].style.filter = "grayscale(1)"
                } else {
                    energyDiv.children[i].style.filter = ""
                }
            }

            //avatar
            let avatarDiv = div.getElementsByClassName("battle_player_avatar")[0]
            if (avatarDiv.children.length == 0) {
                avatarDiv.appendChild(CreateCharacterStone(playerData.avatar.Attack, playerData.avatar.Health, playerData.avatar.Texture))
            } else {
                avatarDiv.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerText = playerData.avatar.Health
            }

            //hand
            let handDiv = div.getElementsByClassName("battle_player_hand")[0]
            if (handDiv.children.length != playerData.handCount) {
                handDiv.innerHTML = ""
                for (let i = 0; i < playerData.handCount; i++) {
                    let img = document.createElement("img")
                    img.setAttribute("src", "/images/EmptyCard.png")
                    handDiv.appendChild(img)
                }
            }

            //TODO: fixme
            for (let i = 0; i < data.PlayerInfo.Field.length || i<PlayerOnField.length; i++) {
                if (i<data.PlayerInfo.Field.length && i>=PlayerOnField.length) {
                    PlayerOnField.push(new Stone(data.PlayerInfo.Field[i].Attack, data.PlayerInfo.Field[i].Health, data.PlayerInfo.Field[i].Texture, document.getElementById("PlayerOnField"),data.PlayerInfo.Field[i].Type));
                } else if (i<data.PlayerInfo.Field.length) {
                    PlayerOnField[i].UpdateVisuals(data.PlayerInfo.Field[i].Attack, data.PlayerInfo.Field[i].Health, data.PlayerInfo.Field[i].Texture, data.PlayerInfo.Field[i].attackCooldown, data.PlayerInfo.Field[i].Type);
                } else {
                    PlayerOnField[i].Remove();
                    PlayerOnField.splice(i,1);
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
                    updatePlayer(p1, data, data.selected.p1)

                    //p2
                    let p2 = document.getElementById("battle_slot_p2")
                    updatePlayer(p2, data, data.selected.p2)
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
            }
        }

        parent.innerHTML = "";
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

    //TODO: FIXME
    class Stone {
        constructor(Attack,Health,Texture, ParentNode, Type) {
            this.Health = Health;
            this.Attack = Attack;
            this.Texture = Texture;
            this.AttackCooldown = 1;
            this.Type = Type;

            this.Body = CreateCharacterStone(Attack,Health,Texture,"",Type);
            this.Body.classList.add("Selectable");
            this.Body.addEventListener("mousedown", ()=>this.SelectAttackingStone());
            ParentNode.appendChild(this.Body);
        }
        UpdateVisuals(Attack = this.Attack, Health = this.Health, Texture=this.Texture, AttackCooldown=this.AttackCooldown, WhatAmI = "", Type=null) {
            if (DraggableSelectTarget && DraggableSelectTarget.SelectedTarget == WhatAmI && WhatAmI!="") {
                this.Body.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = Attack;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health-DraggableSelectTarget.Class.Attack;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].style.color = "blue";
            } else {
                this.Body.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = Attack;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].style.color = "black";
            }
            if (Type != null && Type == "Tank") {
                this.Body.style.backgroundImage = "url('/images/Cards/"+Texture+".png'), url('/images/shield.png')";
            } else 
                this.Body.style.backgroundImage = "url('/images/Cards/"+Texture+".png')";
            this.AttackCooldown = AttackCooldown;

            this.Attack = Attack;
            this.Health = Health;
            this.Texture = Texture;
            if (this.AttackCooldown>0) {
                this.Body.classList.add("OnCooldown");
            } else {
                this.Body.classList.remove("OnCooldown");
            }
        }
        Remove() {
            this.Body.remove();
        }
    }
</script>