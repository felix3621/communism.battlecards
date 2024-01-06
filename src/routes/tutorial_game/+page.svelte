<style>
    :global(*) {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }
    :global(img) {
        pointer-events: none;
    }
    #TopBar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 40px;
        background-color: rgb(50, 50, 50);
    }

    #DisplayEnergy {
        position: fixed;
        right:0px;
        bottom: 0px;
        height: 50px;
        width: fit-content;
        background-color: rgb(50, 50, 50);
        grid-template-rows: auto;
        outline: 3px black solid;
        pointer-events: none;
    }
    :global(#DisplayEnergy img) {
        height: 100%;
        pointer-events: none;
    }
    #MidleLine {
        position: fixed;
        width: 100%;
        top: 50%;
        transform: translate(0,-50%);
        left:0;
        margin: 0;
    }
    #EnemyAvatar {
        position: fixed;
        left:50%;
        top:55px;
        transform: translate(-50%,0);
        width: 150px;
        max-width: 30%;
        max-height: 30%;
        aspect-ratio: 1.66/2.14;
        background-size: contain;
    }
    #PlayerAvatar {
        position: fixed;
        left:50%;
        bottom:55px;
        transform: translate(-50%,0);
        width: 150px;
        max-width: 30%;
        max-height: 30%;
        aspect-ratio: 1.66/2.14;
        background-size: contain;
    }
    #EnemyOnField {
        position: fixed;
        left:25%;
        bottom:50%;
        top:35%;
        right:25%;
        padding: 5px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        grid-template-rows: auto;
        transform: translate(0,-10px);
        grid-gap: 1%;
        place-items: center;
    }
    #PlayerOnField {
        position: fixed;
        left:25%;
        bottom:35%;
        top:50%;
        right:25%;
        padding: 5px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        grid-gap: 1%;
        place-items: center;
    }
    :global(.CharacterStone:not(.Draggable)) {
        height: 100%;
        max-width: 100%;
        aspect-ratio: 1.66/2.14;
    }
    #EnemyHand {
        position: fixed;
        left:0%;
        bottom:50%;
        top:45px;
        right:75%;
        padding: 1%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 0.5fr));
        grid-template-rows: auto auto auto auto;
        grid-gap: 5%;
        overflow: hidden;
    }
    #PlayerHand {
        position: fixed;
        left:0%;
        bottom:0%;
        top:50%;
        right:75%;
        padding: 1%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(75px, 0.5fr));
        grid-template-rows: auto auto auto auto;
        grid-gap: 5%;
        overflow-y: auto;
        overflow-x: hidden;

    }
    #PlayerHand::-webkit-scrollbar {
        width: 10px;
    }

    #PlayerHand::-webkit-scrollbar-thumb {
        background-color: rgb(0, 0, 0);
        border-radius: 5px;
        border: 2px solid rgb(75, 75, 75);
    }

    #PlayerHand::-webkit-scrollbar-track {
        background-color: rgb(50, 50, 50);
        border-radius: 5px;
        border: 2px solid rgb(127,127,127);
    }
    :global(.Selected) {
        filter: opacity(0.75);
    }



    #EndTurn {
        position: fixed;
        right:0px;
        top:50%;
        transform: translate(-25%,-50%) scale(1.5,1.5);
        background-color: rgb(50, 50, 50);
        color: white;
    }
    #TimeDisplay {
        position: fixed;
        right:0px;
        top:50%;
        transform: translate(-20px,-70px);
        color: white;
    }
    :global(.CardAnimation) {
        animation: MoveToPlayerHand 3s;
        height: 100px;
    }
    :global(.EnemyCardAnimation) {
        animation: MoveToEnemyHand 3s;
        height: 100px;
    }
    @keyframes MoveToPlayerHand {
        0% {
            position: fixed;
            right:0;
            bottom:50px;
            transform: translate(100%);
        }
        100% {
            position: fixed;
            right:100%;
            bottom:50px;
            transform: translate(100%);
        }
    }
    @keyframes MoveToEnemyHand {
        0% {
            position: fixed;
            right:0;
            transform: translate(100%);
        }
        100% {
            position: fixed;
            right:100%;
            transform: translate(100%);
        }
    }
    :global(body) {
        background-color: black;
    }
    #DisplayTitle {
        position: fixed;
        top: 0%;
        right: 5px;
        font-size: 100%;
        color: white;
    }
    :global(.Draggable) {
        position: fixed;
        width:100px;
        transform: translate(-50%,-50%);
    }
    :global(.Glow) {
        animation: glow 2s infinite;
    }
    @keyframes glow {
      0% {
        box-shadow: 0 0 10px rgba(248, 248, 165, 0.7);
      }
      50% {
        box-shadow: 0 0 20px rgba(248, 248, 165, 0.7);
      }
      100% {
        box-shadow: 0 0 10px rgba(248, 248, 165, 0.7);
      }
    }
    :global(.TargetIndicator) {
        position: fixed;
        width:100px;
        transform: translate(-50%,-50%);
    }
    #code {
        margin: 0;
        color: white;
        position: fixed;
        font-size: 125%;
        right: 25%;
        transform: translate(50%,0);
    }
    #EnemyName {
        position: absolute;
        left:50%;
        bottom: -10px;
        transform: translate(-50%,100%);
        color:white;
        width: 100%;
        text-align: center;
        font-size: 100%;
        z-index: 111;
        text-shadow: 1px 0 #000000;
        letter-spacing:1px;
        font-weight:bold;
    }
    #PlayerName {
        position: absolute;
        left:50%;
        bottom: -10px;
        transform: translate(-50%,100%);
        color:white;
        width: 100%;
        text-align: center;
        font-size: 100%;
        z-index: 111;
        text-shadow: 1px 0 #000000;
        letter-spacing:1px;
        font-weight:bold;
    }
    :global(.OnCooldown) {
        filter: opacity(0.5);
    }
    #Tournament{
        position: fixed;
        left:0;
        top:40px;
        right:0;
        bottom:0;
        background-color: black;
        transition-duration: 1s;
        filter: opacity(0);
        pointer-events: none;
    }
    #TournamentPlayerList{
        position: fixed;
        left:5%;
        top:10%;
        bottom: 5%;
        width: 35%;
        background-color: rgb(50, 50, 50);
        border-radius: 25px;
        outline: 3px rgb(127,127,127) solid;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: repeat(auto-fit, 50px);
        overflow-y: auto;
        overflow-x: hidden;
        color: white;
        padding: 15px;
    }
    #TournamentPlayerList h1 {
        margin: 0;
    }
    #TournamentReadyButton {
        position: fixed;
        color:white;
        background-color: black;
        top:0;
        right:0;
    }
    #TournamentGameList {
        position: fixed;
        right:5%;
        top:10%;
        bottom: 5%;
        width: 45%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: repeat(auto-fit, 150px);
        overflow-y: auto;
        overflow-x: hidden;
        color: white;
        padding: 15px;
    }
    :global(#TournamentGameList .Container) {
        display: grid;
        grid-template-columns: auto auto auto;
    }
    :global(#TournamentGameList h1) {
        margin:0;
        height: 100%;
        font-size: 10vw;
        text-align: center;
    }
    :global(.Projectile) {
        aspect-ratio: 1/1;
        width:100px;
        transition-duration: 0.9s;
        position:fixed;
        transition-timing-function: ease-in;
        animation: Explode 1.1s forwards;
        animation-delay: 0.8s;
        transform: translate(-50%,-50%);
    }
    @keyframes Explode {
        0% {
            transform: translate(-50%,-50%) scale(1,1);
            filter: opacity(1);
        }
        25% {
            transform: translate(-50%,-50%) scale(1.5,1.5);
            filter: opacity(1);
        }
        100% {
            transform: translate(-50%,-50%) scale(0,0);
            filter: opacity(0);
        }
    }
    :global(.CharacterName) {
        position: relative;
        margin: 0;
        color: white;
        text-align: center;
        left:50%;
        top: 100%;
        transform: translate(-50%,-50%);
        width: fit-content;
        height: fit-content;
        -webkit-text-stroke-width: 0.5px;
        -webkit-text-stroke-color: black;
        user-select: none;
        overflow: hidden;
        white-space: nowrap;
        pointer-events: none
    }
    :global(.ToolTip) {
        position: fixed;
        z-index: 100;
        width: fit-content;
        max-width: 400px;
        background-color: black;
        outline: 2px gray solid;
        color: white;
        padding: 0 8px 5px 0;
        border-radius: 10px;
        display: flex;
    }
    :global(.ToolTip div) {
        flex: 1;
    }
    :global(.ToolTip h1, .ToolTip p) {
        margin: 0;
        margin-left: 8px;
    }
    :global(.ToolTip h1) {
        white-space: nowrap;
    }
    :global(.ToolTip img) {
        width: 40px;
        background-color: rgb(50,50,50);
        border: 2px black solid;
        border-radius: 5px;
        float: left;
    }
    :global(.TextBoble) {
        position: fixed;
        color: white;
        background-color: black;
        padding: 5px;
        outline: 5px gray solid;
    }
</style>
<hr id="MidleLine">
<div id="EnemyAvatar"><h1 id="EnemyName">Runar</h1></div>

<div id="PlayerAvatar"><h1 id="PlayerName">You</h1></div>
<div id="EnemyHand"></div>
<div id="PlayerHand"></div>
<div id="EnemyOnField"></div>
<div id="PlayerOnField"></div>
<div id="DisplayEnergy"></div>
<button id="EndTurn" on:click={endTurn}>EndTurn</button>
<h1 id="TimeDisplay">2:00</h1>
<div id="DraggableParent" style="position: fixed;"></div>
<div id="TopBar"><h1 style="margin: 0; text-align:center; color:white">Battle!</h1></div>
<h1 id="DisplayTitle"></h1>
<h1 id="code" style="cursor: pointer" on:click={() => {navigator.clipboard.writeText(document.getElementById("code").innerText)}}></h1>
<div id="Tournament">
    <button id="TournamentReadyButton" on:click={() => {socket.send(JSON.stringify({tournamentReady:true}));}}>Ready?</button>
    <div id="TournamentPlayerList">
        <h1 style="text-align: center;">Player List (0/16)</h1>
    </div>
    <div id="TournamentGameList"></div>
</div>
<script>
    import { onMount } from "svelte";

    // Tutorial Values
    var Tutorial = {
        Stage:0,
        Stages: [
            {
                Text:"Oh Hello There!",
                Sender:"Runar",
                GamePause: true,
                Duration:5
            },
            {
                Text:"Welcome To Battle Cards.<br>Let Me Show You Haw To Play.<br>Let Me Just End My Turn.",
                Sender:"Runar",
                GamePause: true,
                Duration:5
            },
            {
                Text:"There You Go",
                Sender:"Runar",
                GamePause: true,
                Duration:5,
                Function:{Function:"StartGame"}
            },
            {
                Text:"Place Out A Card",
                Sender:"Runar",
                GamePause: false,
                Duration:5,
                Objective:{Title:"Place Card", Description:"Drag Your Card Out To You Play Field", CompletionTrigger:"PlayerOnField.length>0"}
            },
            {
                Text:"Dide You See That It Used Up Some Energy When You Placed It Down (right Corner)",
                Sender:"Runar",
                GamePause: true,
                Duration:5,
                Function:{Function:"ShowEnergy",Value:5}
            },
            {
                Text:"Now Attack My Minion",
                Sender:"Runar",
                GamePause: false,
                Duration:5,
                Invoke:"EnemyOnField.push(new Stone(1,1,'Goblin',document.getElementById('EnemyOnField'))",
                Objective:{Title:"Attack", Description:"Hold Down On Your Placed Stone And Move The Target Indicator To The Goblin And Let Go.",CompletionTrigger:"EnemyOnField.length==0"}
            },
            {
                Text:"Now Attack Me Using Your Avatar And Minion.<br>Ps Here Are Some Energy And Cards",
                Sender:"Runar",
                GamePause: false,
                Duration:5,
                EnemyAi:true,
                Invoke:"MaxEnergy = 10;PlayerEnergy = 10; GiveCards('p1',5)",
                AttackCooldown: 0,
                Objective:{Title:"Kill Runar", Description:"Use Your Cards And Destroy Runar ",CompletionTrigger:"EnemyAvatar.Health<=0"}
            },
            {
                Text:"Congratulations Tutorial Done",
                Sender:"Runar",
                GamePause: true,
                Duration:5,
                EnemyAi:false,
                Invoke:"window.location.href='/'"
            }
        ]
    }
    var Objectives = new Array();
    var TextBobles = new Array();

    // Game Variables
    var Pause = false;
    var EnemyAvatar;
    var PlayerAvatar;
    var EnemyHand = new Array();
    var PlayerHand = new Array();
    var EnemyOnField = new Array();
    var PlayerOnField = new Array();
    var EnemyDisplayName;
    var PlayerDisplayName;

    var PlayerEnergy = 4;
    var PlayerMaxEnergy = 4;

    var displayTitle = "";

    var FontSizeAdjusterArray = new Array();

    var DraggableCard;
    var DraggableSelectTarget;

    var MouseX;
    var MouseY;

    var yourTurn;

    let lastFrameTime = performance.now();
    function Update() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastFrameTime)/1000;
        lastFrameTime = currentTime;

        // Text Bobles
        for (let i = 0; i < TextBobles.length; i++) {
            TextBobles[i].LifeTime -= deltaTime;
            if (TextBobles[i].LifeTime<=0) {
                TextBobles[i].Element.remove();
                TextBobles.splice(i,1);
                i--;
            }
        }
        // Quests

        // Tutorial
        if(Tutorial != null && Tutorial.Stage<Tutorial.Stages.length) {
            // Text Boble + Objective
            if (!Tutorial.Stages[Tutorial.Stage].Started) {
                if (Tutorial.Stages[Tutorial.Stage].Text) { // Text Boble
                    console.log("Create Boble")
                    let X = Tutorial.Stages[Tutorial.Stage].Sender == "Runar" ? document.getElementById("EnemyAvatar").getBoundingClientRect().right : (Tutorial.Stages[Tutorial.Stage].Sender == "You" ? document.getElementById("PlayerAvatar").getBoundingClientRect().right : 10);
                    let Y = Tutorial.Stages[Tutorial.Stage].Sender == "Runar" ? document.getElementById("EnemyAvatar").getBoundingClientRect().bottom : (Tutorial.Stages[Tutorial.Stage].Sender == "You" ? document.getElementById("PlayerAvatar").getBoundingClientRect().top : 10);
                    CreateTextBoble(X,Y,Tutorial.Stages[Tutorial.Stage].Text,Tutorial.Stages[Tutorial.Stage].Duration);
                }
                Tutorial.Stages[Tutorial.Stage].Started = true;
            }


            // Duration
            if (Tutorial.Stages[Tutorial.Stage].Duration>0) {
                Tutorial.Stages[Tutorial.Stage].Duration-=deltaTime;
            } else if (Tutorial.Stages[Tutorial.Stage].Duration<=0 && !Tutorial.Stages[Tutorial.Stage].Objective){
                Tutorial.Stage++;
            }
        }



        // Game Logic

        requestAnimationFrame(Update);
    }

    /*function createSocket() {
        let query
        let search = new URLSearchParams(window.location.search);
        let privateSearch = search.get("private")
        if (privateSearch == "true")
            query = "private=true"
        else {
            let codeSearch = search.get("code")
            if (codeSearch)
                query = "code="+codeSearch
            else {
                let tournamentSearch = search.get("tournament")
                if (tournamentSearch)
                query = "tournament="+tournamentSearch
            }
        }

        socket = new WebSocket(`wss://${window.location.host}/gamesocket?${query}`);

        // Event listener for when the connection is established
        socket.onopen = () => {
            console.log('Connected to server');
        };

        // Event listener for incoming messages from the server
        socket.onmessage = (event) => {
            var data = event.data;
            if (data) {
                data = JSON.parse(data);
                if (data.yourTurn) {
                    yourTurn = data.yourTurn;
                }
                //Display Projectiles
                if (data.Projectiles) {
                    for (let i = 0; i < data.Projectiles.length; i++) {
                        data.Projectiles[i].Element = document.createElement("img");
                        data.Projectiles[i].Element.classList.add("Projectile");
                        document.body.appendChild(data.Projectiles[i].Element);
                        if (yourTurn) {
                            console.log("My Turn")
                            data.Projectiles[i].Element.style.top = "75%";
                            data.Projectiles[i].Element.style.left = "50%";
                            var Enemy;
                            if (data.Projectiles[i].EnemyType == "Avatar") {
                                Enemy = EnemyAvatar.Body;
                            } else if (EnemyOnField[data.Projectiles[i].SelectedTargetIndex]) {
                                Enemy = EnemyOnField[data.Projectiles[i].SelectedTargetIndex].Body;
                            } 
                            if (Enemy) {
                                data.Projectiles[i].Element.style.top = (Enemy.getBoundingClientRect().top+(Enemy.getBoundingClientRect().height/2))+"px";
                                data.Projectiles[i].Element.style.left = (Enemy.getBoundingClientRect().left+(Enemy.getBoundingClientRect().width/2))+"px";
                                setTimeout(() => {data.Projectiles[i].Element.remove();},1500);
                            }
                        } else {
                            console.log("Not My Turn")
                            data.Projectiles[i].Element.style.top = "25%";
                            data.Projectiles[i].Element.style.left = "50%";
                            var Target;
                            if (data.Projectiles[i].EnemyType == "Avatar") {
                                Target = PlayerAvatar.Body;
                            } else if (PlayerOnField[data.Projectiles[i].SelectedTargetIndex]) {
                                Target = PlayerOnField[data.Projectiles[i].SelectedTargetIndex].Body;

                            }
                            if (Target) {
                                data.Projectiles[i].Element.style.top = (Target.getBoundingClientRect().top+(Target.getBoundingClientRect().height/2))+"px";
                                data.Projectiles[i].Element.style.left = (Target.getBoundingClientRect().left+(Target.getBoundingClientRect().width/2))+"px";
                                setTimeout(() => {data.Projectiles[i].Element.remove();},1500);
                            }
                        }
                        data.Projectiles[i].Element.src = "images/Projectiles/"+data.Projectiles[i].Texture+".png";
                    }
                }
                //Tournament Screen
                if (data.TournamentScreen) {
                    displayTitle = data.TournamentCountDown;
                    document.getElementById("Tournament").style.filter = "opacity(1)";
                    document.getElementById("Tournament").style.pointerEvents = "auto";
                    if (data.TournamentPlayers) {
                        var TournamentPlayerList = document.getElementById("TournamentPlayerList");
                        for (let i = 0; i < data.TournamentPlayers.length || i < TournamentPlayerList.children.length-1; i++) {
                            if (i < data.TournamentPlayers.length && i >= TournamentPlayerList.children.length-1) { // Create
                                var Temp = document.createElement("h2");
                                TournamentPlayerList.appendChild(Temp);
                                Temp.innerHTML = data.TournamentPlayers[i].displayName;
                                Temp.style.color = data.TournamentPlayers[i].ready ? "rgb(0,255,0)" : "red";
                                Temp.style.color = data.TournamentPlayers[i].out ? "rgb(150,150,150)" : Temp.style.color;
                            } else if (i < data.TournamentPlayers.length) { // Update
                                TournamentPlayerList.children[i+1].innerHTML = data.TournamentPlayers[i].displayName;
                                TournamentPlayerList.children[i+1].style.color = data.TournamentPlayers[i].ready ? "rgb(0,255,0)" : "red";
                                TournamentPlayerList.children[i+1].style.color = data.TournamentPlayers[i].out ? "rgb(150,150,150)" : TournamentPlayerList.children[i+1].style.color;
                            } else { // Remove
                                TournamentPlayerList.children[i+1].remove();
                            }
                        }
                        TournamentPlayerList.children[0].innerHTML = "Player List ("+data.TournamentPlayers.length+")";
                    }
                    //Show all games in Tournament
                    if (data.TournamentGames) {
                        var tournamentGameList = document.getElementById("TournamentGameList");
                        for (let i = 0; i < data.TournamentGames.length || i < tournamentGameList.children.length; i++) {
                            if (i < data.TournamentGames.length && i >= tournamentGameList.children.length && data.TournamentGames[i].p1 != null && data.TournamentGames[i].p2  != null) { // Create
                               console.log("Container");
                                // Create Game Container
                                var Container = document.createElement("div");
                                Container.classList.add("Container");

                                // player 1 Avatar
                                var p1 = CreateCharacterStone(data.TournamentGames[i].p1.Attack,data.TournamentGames[i].p1.Health,data.TournamentGames[i].p1.Texture, data.TournamentGames[i].p1Name, "Tank");
                                p1.classList.add("P1");
                                console.log(p1);
                                Container.appendChild(p1);
                                // Text in midle that says VS
                                var VSText = document.createElement("h1");
                                VSText.innerHTML = "VS";
                                Container.appendChild(VSText);
                                // player 1 Avatar
                                var p2 = CreateCharacterStone(data.TournamentGames[i].p2.Attack,data.TournamentGames[i].p2.Health,data.TournamentGames[i].p2.Texture, data.TournamentGames[i].p2Name, "Tank");
                                p2.classList.add("P2");
                                Container.appendChild(p2);
                                tournamentGameList.appendChild(Container);
                            } else if (i < tournamentGameList.children.length && i < data.TournamentGames.length && data.TournamentGames[i].p1  != null && data.TournamentGames[i].p2  != null) { // Update
                                // P1 Update
                                tournamentGameList.children[i].children[0].getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = data.TournamentGames[i].p1.Attack;
                                tournamentGameList.children[i].children[0].getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = data.TournamentGames[i].p1.Health;
                                tournamentGameList.children[i].children[0].style.backgroundImage = "url('/images/Cards/"+data.TournamentGames[i].p1.Texture+".png'), url('/images/shield.png')";

                                // P2 Update
                                tournamentGameList.children[i].children[2].getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = data.TournamentGames[i].p2.Attack;
                                tournamentGameList.children[i].children[2].getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = data.TournamentGames[i].p2.Health;
                                tournamentGameList.children[i].children[2].style.backgroundImage = "url('/images/Cards/"+data.TournamentGames[i].p2.Texture+".png'), url('/images/shield.png')";
                            } else if (i >= data.TournamentGames.length){ // Remove
                                console.log("Remove");
                                tournamentGameList.children[i].remove();
                            }
                        }
                    }
                } else {
                    document.getElementById("Tournament").style.filter = "opacity(0)";
                    document.getElementById("Tournament").style.pointerEvents = "none";
                }

                // Normal game logic
                if (data.TurnTime) {
                    let newTime = Math.trunc(data.TurnTime/60) + ":" + String(data.TurnTime%60).padStart(2,"0");
                    document.getElementById("TimeDisplay").innerHTML = newTime;
                }
                if (data.PlayerInfo) {
                    PlayerDisplayName = data.PlayerInfo.DisplayName;
                    document.getElementById("PlayerName").innerText = PlayerDisplayName;
                    PlayerAvatar.UpdateVisuals(data.PlayerInfo.Avatar.Attack,data.PlayerInfo.Avatar.Health,data.PlayerInfo.Avatar.Texture, data.PlayerInfo.Avatar.attackCooldown,"","Tank");
                    PlayerEnergy = data.PlayerInfo.Energy;
                    PlayerMaxEnergy = data.MaxEnergy;
                    UpdateEnergy();
                    displayTitle = data.PlayerInfo.Title
                    for (let i = 0; i < data.PlayerInfo.Field.length || i<PlayerOnField.length; i++) {
                        if (i<data.PlayerInfo.Field.length && i>=PlayerOnField.length) {
                            PlayerOnField.push(new Stone(data.PlayerInfo.Field[i].Attack, data.PlayerInfo.Field[i].Health, data.PlayerInfo.Field[i].Texture, document.getElementById("PlayerOnField"), data.PlayerInfo.Field[i].Type));
                        } else if (i<data.PlayerInfo.Field.length) {
                            PlayerOnField[i].UpdateVisuals(data.PlayerInfo.Field[i].Attack, data.PlayerInfo.Field[i].Health, data.PlayerInfo.Field[i].Texture, data.PlayerInfo.Field[i].attackCooldown, "", data.PlayerInfo.Field[i].Type);
                        } else {
                            PlayerOnField[i].Remove();
                            PlayerOnField.splice(i,1);
                        }
                    }
                    var SpawnAmount =0;
                    for (let i = 0; i < data.PlayerInfo.Hand.length || i<PlayerHand.length; i++) {
                        if (i<data.PlayerInfo.Hand.length && i>=PlayerHand.length) {
                            PlayerHand.push(new Card(data.PlayerInfo.Hand[i].Name, data.PlayerInfo.Hand[i].Description, data.PlayerInfo.Hand[i].Cost, data.PlayerInfo.Hand[i].Attack, data.PlayerInfo.Hand[i].Health, data.PlayerInfo.Hand[i].Texture, data.PlayerInfo.Hand[i].Type, SpawnAmount));
                            SpawnAmount++;
                        } else if (i<data.PlayerInfo.Hand.length) {
                            PlayerHand[i].UpdateVisuals(data.PlayerInfo.Hand[i].Name, data.PlayerInfo.Hand[i].Description, data.PlayerInfo.Hand[i].Cost, data.PlayerInfo.Hand[i].Attack, data.PlayerInfo.Hand[i].Health, data.PlayerInfo.Hand[i].Texture, data.PlayerInfo.Hand[i].Type);
                        } else {
                            PlayerHand[i].Remove();
                            PlayerHand.splice(i,1);
                        }
                    }
                }
                if (data.EnemyInfo) {
                    EnemyDisplayName = data.EnemyInfo.DisplayName;
                    document.getElementById("EnemyName").innerText = EnemyDisplayName;
                    EnemyAvatar.UpdateVisuals(data.EnemyInfo.Avatar.Attack, data.EnemyInfo.Avatar.Health, data.EnemyInfo.Avatar.Texture, data.EnemyInfo.Avatar.attackCooldown, "Avatar", "Tank");
                
                    for (let i = 0; i < data.EnemyInfo.Field.length || i<EnemyOnField.length; i++) {
                        if (i<data.EnemyInfo.Field.length && i>= EnemyOnField.length) {
                            EnemyOnField.push(new Stone(data.EnemyInfo.Field[i].Attack, data.EnemyInfo.Field[i].Health, data.EnemyInfo.Field[i].Texture, document.getElementById("EnemyOnField"), data.EnemyInfo.Field[i].Type));
                        } else if (i<data.EnemyInfo.Field.length) {
                            EnemyOnField[i].UpdateVisuals(data.EnemyInfo.Field[i].Attack, data.EnemyInfo.Field[i].Health, data.EnemyInfo.Field[i].Texture, data.EnemyInfo.Field[i].attackCooldown, i.toString(), data.EnemyInfo.Field[i].Type);
                        } else {
                            EnemyOnField[i].Remove();
                            EnemyOnField.splice(i,1);
                        }
                    }
                    var SpawnAmount = 0;
                    for (let i = 0; i < data.EnemyInfo.Hand || i < EnemyHand.length; i++) {
                        if (i<data.EnemyInfo.Hand && i>=EnemyHand.length) {
                            EnemyHand.push(new EnemyCard(SpawnAmount));
                            SpawnAmount++;
                        } else if (i>=data.EnemyInfo.Hand) {
                            EnemyHand[i].Remove();
                            EnemyHand.splice(i,1);
                        }
                    }
                }
                if (data.code) {
                    document.getElementById("code").innerText = data.code;
                    if (data.TournamentScreen) {
                        let currentParams = new URLSearchParams(window.location.search);
                        let currentRequest = decodeURIComponent(currentParams.get('tournament'))
                        // Check if the new parameters are different from the current ones
                        if (currentRequest != data.code) {
                            let newParams = { tournament: data.code};
                            let newQueryString = new URLSearchParams(newParams).toString();
                        
                            let newUrl = window.location.pathname + '?' + newQueryString;
                        
                            history.pushState(newParams, '', newUrl);
                        }
                    }
                } else {
                    document.getElementById("code").innerText = "";
                }
            }
            document.getElementById("DisplayTitle").innerText = displayTitle;

            // Add a listener for the mousemove event
            document.addEventListener('mousemove', handleMouseMove);
        };

        // Event listener for when the connection is closed
        socket.onclose = (event) => {
            console.log('Connection closed', event);
            if (event.code == 1008) {
                setTimeout(() => {window.location.href = "/"},1000)
            } else {
                setTimeout(createSocket, 1000)
            }
        };

        // Event listener for errors
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }*/
    
    onMount(() => {
        EnemyAvatar = new Stone(0,5,"Runar",document.getElementById("EnemyAvatar"),"Avatar","Tank");
        PlayerAvatar = new Stone(5,15,"BOB",document.getElementById("PlayerAvatar"),"","Tank");

        //createSocket()

        Update();
        //Actual Commands
        SetAllFontSizeInArray(FontSizeAdjusterArray);
        window.addEventListener('resize', () => SetAllFontSizeInArray(FontSizeAdjusterArray));
        window.addEventListener('mouseup', DropDraggable);

        document.addEventListener('mousemove', function(event) {
            // Get the element under the mouse cursor
            const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);

            // Remove the 'Selected' class from all elements
            document.querySelectorAll('.Selected').forEach(function(element) {
                element.classList.remove('Selected');
            });
            // Add the 'hovered' class to the currently hovered element
            if (hoveredElement && hoveredElement.classList.contains('Selectable')) {
                hoveredElement.classList.add('Selected');
            }
        });
    })

    function endTurn() {
        //socket.send(JSON.stringify({function:"EndTurn"}));
    }

    // Function to handle mousemove events
    function handleMouseMove(event) {
        // Get the mouse coordinates from the event object
        MouseX = event.clientX;
        MouseY = event.clientY;

        if (DraggableCard) {
            if (!yourTurn) {DropDraggable(); return;}
            if (!DraggableCard.Class) {
                DropDraggable();

            } else if (DraggableCard.Class.Type == "Projectile") { // Projectile

            } else { // Stone
                DraggableCard.Draggable.style.left = MouseX+"px";
                DraggableCard.Draggable.style.top = MouseY+"px";

                var PlayerField = document.getElementById("PlayerOnField");
                var LeftSide = PlayerField.getBoundingClientRect().left;
                var TopSide = PlayerField.getBoundingClientRect().top;
                if (MouseX>=LeftSide&&MouseX<=(LeftSide+PlayerField.offsetWidth)&&MouseY>=TopSide&&MouseY<=(TopSide+PlayerField.offsetHeight)) {
                    DraggableCard.Draggable.style.display="none";
                    DraggableCard.InArea = true;
                    if (!DraggableCard.Stone) {
                        console.log("Create Stone")
                        DraggableCard.Stone = CreateCharacterStone(DraggableCard.Class.Attack,DraggableCard.Class.Health,DraggableCard.Class.Texture,"",DraggableCard.Class.Type);
                        DraggableCard.Stone.classList.add("Draggable");
                        document.getElementById("DraggableParent").appendChild(DraggableCard.Stone);
                        DraggableCard.Stone.addEventListener('mouseup', ()=>PlaceStone());
                    }   
                    DraggableCard.Stone.style.display = "block";
                    DraggableCard.Stone.style.left = MouseX+"px";
                    DraggableCard.Stone.style.top = MouseY+"px";
                    SetEnergyLevel(PlayerEnergy-DraggableCard.Class.Cost);
                } else if (DraggableCard.Stone) {
                    DraggableCard.Stone.style.display = "none";
                    DraggableCard.Draggable.style.display = "block";
                    SetEnergyLevel(PlayerEnergy);
                    DraggableCard.InArea = false;
                }
            }
            
        }
        if (DraggableSelectTarget) {
            if (!yourTurn) {DropDraggable(); return;}
            DraggableSelectTarget.TargetIndicator.style.left = MouseX+"px";
            DraggableSelectTarget.TargetIndicator.style.top = MouseY+"px";

            if (event.target && event.target.classList && event.target.classList.contains("CharacterStone")) {
                var TargetClass
                for (let i = 0; i < EnemyOnField.length; i++) {
                    if (EnemyOnField[i].Body == event.target){
                        TargetClass = EnemyOnField[i]
                        DraggableSelectTarget.SelectedTarget = i.toString();
                    }
                }
                if (!TargetClass && EnemyAvatar.Body == event.target) {
                    TargetClass = EnemyAvatar;
                    DraggableSelectTarget.SelectedTarget = "Avatar";
                } 
                if (!TargetClass) {
                    DraggableSelectTarget.SelectedTarget = "";
                }
                if (TargetClass && TargetClass.Health-DraggableSelectTarget.Class.Attack<=0) {
                    DraggableSelectTarget.TargetIndicator.style.backgroundImage = "url('images/kill.png');";
                } else {
                    DraggableSelectTarget.TargetIndicator.style.backgroundImage = "url('images/target.png');";
                }
            } else {
                DraggableSelectTarget.SelectedTarget = "";
                DraggableSelectTarget.TargetIndicator.style.backgroundImage = "url('images/target.png');";
            }
        }
    }
    //Place the stone by the position of the Draggable
    function PlaceStone() {
        if (!yourTurn) {return;}
        var PlayerField = document.getElementById("PlayerOnField");
        var LeftSide = PlayerField.getBoundingClientRect().left;
        var whereInDiv = (MouseX-LeftSide)/PlayerField.offsetWidth;
        var WhatToSend = Math.floor(whereInDiv*(PlayerOnField.length+1));
        //TODO: FIX THIS
        //socket.send(JSON.stringify({function:"PlaceCard",SelectedIndex:WhatToSend,SelectedCardIndex:PlayerHand.indexOf(DraggableCard.Class)}));
        DropDraggable();
    }

    //Select the object to drag and start drag
    function SelectDraggable(Element,Class=null) {
        if (DraggableCard) {
            DropDraggable();
        }
        if (!yourTurn) {return;}
        if (Class.Type == "Projectile") {
            let Draggable = document.createElement("img");
            Draggable.style = "width:100px:height:100px;background-image:url('images/Projectile/"+Class.Texture+".png')";
            DraggableCard = {Card:Element,Draggable:Draggable,Class:Class}
            DraggableCard.Draggable.style.left = 50+"%";
            DraggableCard.Draggable.style.top = 75+"%";

            //Target Select!
            var TargetIndicator = document.createElement("img");
            TargetIndicator.classList.add("TargetIndicator");
            TargetIndicator.src = "/images/target.png";
            DraggableSelectTarget = {Class:Class,TargetIndicator:TargetIndicator,SelectedTarget:""}
            document.getElementById("DraggableParent").appendChild(TargetIndicator);
            DraggableSelectTarget.TargetIndicator.style.left = MouseX+"px";
            DraggableSelectTarget.TargetIndicator.style.top = MouseY+"px";
        } else {
            DraggableCard = {Card:Element,Draggable:Element.cloneNode(true),Stone:null,Class:Class}
            DraggableCard.Draggable.classList.add("Draggable");
            document.getElementById("DraggableParent").appendChild(DraggableCard.Draggable);
            DraggableCard.Draggable.style.left = MouseX+"px";
            DraggableCard.Draggable.style.top = MouseY+"px";
        }
        Element.style.display = "none";
        
    }

    function DropDraggable() {
        if (DraggableSelectTarget) {
            if (DraggableSelectTarget.SelectedTarget!="") {
                var IndexOfStone = PlayerOnField.indexOf(DraggableSelectTarget.Class);
                var AttackIndex = -1;
                if (DraggableSelectTarget.SelectedTarget && DraggableSelectTarget.SelectedTarget != "" && DraggableSelectTarget.SelectedTarget != "Avatar") {
                    AttackIndex = Number(DraggableSelectTarget.SelectedTarget);
                }
                var Type = "";
                if (DraggableSelectTarget.Class == PlayerAvatar) {
                    Type = "Avatar";
                }
                // if player is using a card Projectile to select target
                if (DraggableCard && DraggableCard.Class.Type == "Projectile") {
                    //TODO: Use Card ON CLIENT
                    /*socket.send(JSON.stringify( 
                        { 
                            function:"UseCard",
                            SelectedTargetIndex:AttackIndex,
                            SelectedCardIndex:PlayerHand.indexOf(DraggableCard.Class),
                            EnemyType:DraggableSelectTarget.SelectedTarget
                        }
                    ));*/
                } else { // if player is using a stone to select target
                    //TODO:
                    /*socket.send(JSON.stringify(
                        {
                            function:"SelectStoneTarget",
                            SelectedAttackIndex:AttackIndex,
                            SelectedStoneIndex:IndexOfStone,
                            Type:Type,
                            EnemyType:DraggableSelectTarget.SelectedTarget
                        }
                    ));*/
                }
            }
            
            DraggableSelectTarget.TargetIndicator.remove();
        }
        if (DraggableCard) {
            if (DraggableCard && DraggableCard.Class.Type == "Projectile") {

            }
            DraggableCard.Card.style.display = "block";
            DraggableCard.Draggable.remove();
            if (DraggableCard.Stone) {
                DraggableCard.Stone.remove();
            }
            DraggableCard = null;
        }
        document.querySelectorAll('.Glow').forEach(function(element) {
                element.classList.remove('Glow');
            });
        DraggableSelectTarget = null;
    }

    function CreateCharacterStone(Attack, Health, Texture, Name = null, Type = null) {
        //THE CharacterStone
        var CharacterStone = document.createElement("div");
        CharacterStone.classList.add("CharacterStone");
        if (Type != null && Type == "Tank") {
            CharacterStone.style.backgroundImage = "url('/images/Cards/"+Texture+".png'), url('/images/shield.png')";
        } else 
            CharacterStone.style.backgroundImage = "url('/images/Cards/"+Texture+".png')";
        if (Name != null && Name != "") {
            var CharacterName = document.createElement("h1");
            CharacterName.classList.add("StoneName");
            CharacterName.innerHTML = Name;
            CharacterStone.appendChild(CharacterName);
        }

        //DMG
        var CharacterStoneDMG = document.createElement("div");
        CharacterStoneDMG.classList.add("CharacterStoneDMG");
        CharacterStone.appendChild(CharacterStoneDMG);

        //DMG Display
        var CharacterStoneDMGText = document.createElement("p");
        CharacterStoneDMGText.innerHTML = Attack;
        CharacterStoneDMG.appendChild(CharacterStoneDMGText);
        FontSizeAdjusterArray.push(CharacterStoneDMGText);

        //CardHealth
        var CharacterStoneHealth = document.createElement("div");
        CharacterStoneHealth.classList.add("CharacterStoneHealth");
        CharacterStone.appendChild(CharacterStoneHealth);

        //Health Display
        var CharacterStoneHealthText = document.createElement("p");
        CharacterStoneHealthText.innerHTML = Health;
        CharacterStoneHealth.appendChild(CharacterStoneHealthText);
        FontSizeAdjusterArray.push(CharacterStoneHealthText);

        return CharacterStone;
    }

    function UpdateEnergy() {
        if (DraggableCard && DraggableCard.InArea) {
            SetEnergyLevel(PlayerEnergy-DraggableCard.Class.Cost);
        } else {
            SetEnergyLevel();
        }
    }

    function SetEnergyLevel(FakeAmount=null) {
        var EnergyHolder = document.getElementById("DisplayEnergy");
        for (let i = 0; i < EnergyHolder.children.length || i < PlayerMaxEnergy; i++) {
            if (i>= EnergyHolder.children.length && i < PlayerMaxEnergy) { // Create Child
                var EnergyCrystal = document.createElement("img");
                EnergyCrystal.src = "/images/EnergyIcon.png";
                document.getElementById("DisplayEnergy").appendChild(EnergyCrystal);
            } else if (i< EnergyHolder.children.length && i >= PlayerEnergy) {
                EnergyHolder.children[i].style.filter = "grayscale(1)";
            } else if (i >= PlayerMaxEnergy) { // Remove Object
                EnergyHolder.children[i].remove();
            } else if (FakeAmount && i>=FakeAmount) {
                EnergyHolder.children[i].style.filter = "brightness(80%) saturate(200%) grayscale(0) hue-rotate(100deg)";
            }
             else {
                EnergyHolder.children[i].style.filter = "";
            }
        }
    }

    //Create Empty card 
    function CreateEmptyCard() {
        //THE Card
        var EmptyCard = document.createElement("div");
        EmptyCard.classList.add("EmptyCard");
        return EmptyCard;
    }
    //Create Card
    function CreateCard(Name, Description, Cost, Attack, Health, Texture) {
        //THE Card
        var Card = document.createElement("div");
        Card.classList.add("Card");

        //Character In the midle
        var CardImage = document.createElement("div");
        CardImage.classList.add("CardImage");
        CardImage.style.backgroundImage = "url('/images/Cards/"+Texture+".png')";
        Card.appendChild(CardImage);

        //Card Frame
        var CardFrame = document.createElement("div");
        CardFrame.classList.add("CardFrame");
        Card.appendChild(CardFrame);

        //CardDMG
        var CardDMG = document.createElement("div");
        CardDMG.classList.add("CardDMG");
        Card.appendChild(CardDMG);

        //DMG Display
        var CardDMGText = document.createElement("p");
        CardDMGText.innerHTML = Attack;
        CardDMG.appendChild(CardDMGText);
        FontSizeAdjusterArray.push(CardDMGText);

        //CardHealth
        var CardHealth = document.createElement("div");
        CardHealth.classList.add("CardHealth");
        Card.appendChild(CardHealth);

        //Health Display
        var CardHealthText = document.createElement("p");
        CardHealthText.innerHTML = Health;
        CardHealth.appendChild(CardHealthText);
        FontSizeAdjusterArray.push(CardHealthText);

        //CardCost
        var CardCost = document.createElement("div");
        CardCost.classList.add("CardCost");
        Card.appendChild(CardCost);

        //Cost Display
        var CardCostText = document.createElement("p");
        CardCostText.innerHTML = Cost;
        CardCost.appendChild(CardCostText);
        FontSizeAdjusterArray.push(CardCostText);

        //CardName
        var CardName = document.createElement("div");
        CardName.classList.add("CardName");
        Card.appendChild(CardName);

        //Name Display
        var CardNameText = document.createElement("p1");
        CardNameText.innerHTML = Name;
        CardName.appendChild(CardNameText);
        FontSizeAdjusterArray.push(CardNameText);

        //CardDescription
        var CardDescription = document.createElement("div");
        CardDescription.classList.add("CardDescription");
        Card.appendChild(CardDescription);

        //Description Display
        var CardDescriptionText = document.createElement("p1");
        CardDescriptionText.innerHTML = Description;
        CardDescriptionText.style.fontSize = "80%";
        CardDescription.appendChild(CardDescriptionText);
        FontSizeAdjusterArray.push(CardDescriptionText);

        return Card;
    }
    function SetAllFontSizeInArray(Array) {
        for (var i = 0; i < Array.length; i++) {
            const Element = Array[i];
            
            var containerHeight = Element.parentNode.clientHeight;
            var textHeight = Element.scrollHeight;

            //if Number(Element.style.fontSize) > 0 then use else 1, then multiply with fontSize

            var scaleFactor = (containerHeight*0.50) / textHeight;

            let fontSize = Number(Element.style.fontSize.slice(0, -3));
            
            fontSize = (fontSize>0)?fontSize * (scaleFactor):scaleFactor;
            Element.style.fontSize = `${fontSize}rem`;
        }
    }

    class Card {
        constructor(Name,Description,Cost,Attack,Health,Texture,Type,SpawnDelay=0) {
            this.Cost = Cost;
            this.Health = Health;
            this.Attack = Attack;
            this.Texture = Texture;
            this.Name = Name;
            this.Description = Description;
            this.Type = Type;

            setTimeout(() => {
                this.CreateBody();
                }, SpawnDelay*500);
        }
        UpdateVisuals(Name,Description,Cost,Attack,Health,Texture,Type) {
            this.Cost = Cost;
            this.Health = Health;
            this.Attack = Attack;
            this.Texture = Texture;
            this.Name = Name;
            this.Description = Description;
            this.Type = Type;
            if (this.Body && this.Body.classList.contains("Card")) {
                this.Body.children[0].style.backgroundImage = "url('/images/Cards/"+Texture+".png')";
                this.Body.children[2].children[0].innerHTML = Attack;
                this.Body.children[3].children[0].innerHTML = Health;
                this.Body.children[4].children[0].innerHTML = Cost;
                this.Body.children[5].children[0].innerHTML = Name;
                this.Body.children[6].children[0].innerHTML = Description;
                if (Type=="Projectile") {
                    this.Body.children[3].style.display = "none";
                } else {
                    this.Body.children[3].style.display = "block";
                }
                //SetAllFontSizeInArray(FontSizeAdjusterArray);
            }
        }
        Remove() {
            if (this.Body)
                this.Body.remove();
        }
        CreateBody() {
            this.Body = CreateEmptyCard();
            document.body.appendChild(this.Body);
            this.Body.classList.add("CardAnimation");
            this.Body.addEventListener('animationend', () => {
                // Add your code here to run when the animation is complete
                this.Body.remove();
                this.Body = CreateCard(this.Name,this.Description,this.Cost,this.Attack,this.Health,this.Texture);
                document.getElementById("PlayerHand").appendChild(this.Body);
                this.Body.classList.add("Selectable");

                setTimeout(function() {SetAllFontSizeInArray(FontSizeAdjusterArray)}, 100);
                this.Body.addEventListener('mousedown', ()=>SelectDraggable(this.Body,this));
            });
        }
    } 
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
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health-(Type=="Tank"?DraggableSelectTarget.Class.Attack/2:DraggableSelectTarget.Class.Attack);
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
        SelectAttackingStone() {
            console.log(this);
            if (DraggableSelectTarget) {
            DropDraggable();
        }
            if (!yourTurn && this.AttackCooldown > 0) {return;}
            var TargetIndicator = document.createElement("img");
            TargetIndicator.classList.add("TargetIndicator");
            TargetIndicator.src = "/images/target.png";
            DraggableSelectTarget = {Class:this,TargetIndicator:TargetIndicator,SelectedTarget:""}
            DraggableSelectTarget.Class.Body.classList.add("Glow");
            document.getElementById("DraggableParent").appendChild(TargetIndicator);
            DraggableSelectTarget.TargetIndicator.style.left = MouseX+"px";
            DraggableSelectTarget.TargetIndicator.style.top = MouseY+"px";
        }
    }
    class EnemyCard {
        constructor(SpawnDelay) {
            setTimeout(() => {
                this.CreateBody();
                }, SpawnDelay*500);
            
        }
        Remove() {
            if (this.Body)
                this.Body.remove();
        }
        CreateBody() {
            this.Body = CreateEmptyCard();
            document.getElementById("EnemyHand").appendChild(this.Body);
            this.Body.classList.add("EnemyCardAnimation");
        }
    }
    // Text Boble 
    function CreateTextBoble(X,Y, Text, LifeTime) {
        var Boble = document.createElement("div");
        Boble.classList.add("TextBoble");
        Boble.innerHTML = Text;
        Boble.style.left = X + "px";
        Boble.style.top = Y + "px";

        TextBobles.push({Element:Boble,Text:Text,LifeTime:LifeTime});
        document.body.appendChild(Boble);
    }
    // Show ToolTip
    function ToolTip(Element, Title, Text, DisplayImagePath = null) {
        CloseAllToolTips();
        var ToolTip = document.createElement("div");
        ToolTip.classList.add("ToolTip");

        if (DisplayImagePath!=null) {
            // Flex Container
            var FlexContainerImage = document.createElement("div");
            FlexContainerImage.style.order = 1;
            FlexContainerImage.style.width = "40px";
            ToolTip.appendChild(FlexContainerImage);
            var Image = document.createElement("img");
            Image.style.width = "40px";
            Image.src = DisplayImagePath;
            FlexContainerImage.appendChild(Image);
        }
        // Flex Container
        var FlexContainer = document.createElement("div");
        FlexContainer.style.order = 2;
        ToolTip.appendChild(FlexContainer);

        // Title
        var TitleElement = document.createElement("h1");
        TitleElement.innerHTML = Title;
        FlexContainer.appendChild(TitleElement);
        //Text
        var TextElement = document.createElement("p");
        TextElement.innerHTML = Text;
        FlexContainer.appendChild(TextElement);

        document.body.appendChild(ToolTip);

        // Set Pos
        let BoundRec = Element.getBoundingClientRect();
        if (BoundRec.top<ToolTip.offsetHeight) { // Down
            ToolTip.style.top = BoundRec.bottom + "px";
        } else { // Place Above
            ToolTip.style.top = BoundRec.top-ToolTip.offsetHeight-8 + "px";
        }
        if (BoundRec.right>document.body.offsetWidth) { // Move right 0
            ToolTip.style.left = document.body.offsetWidth - ToolTip.offsetWidth +"px";
        } else if (BoundRec.left+(BoundRec.right-BoundRec.left)/2<ToolTip.offsetWidth) { // Move Left 0
            ToolTip.style.left = "0px";
        } else { // Center Left
            ToolTip.style.left = BoundRec.left+(BoundRec.right-BoundRec.left)/2 - ToolTip.offsetWidth/2 + "px";
        }
    }
    // Remove All ToolTips
    function CloseAllToolTips() {
        var ToolTips = document.getElementsByClassName("ToolTip");
        for (let i = 0; i < ToolTips.length; i++) {
            ToolTips[i].remove();
        }
    }
    // Add Tooltip Event To Element
    function CreateTooltipEvent(Element, Title, Text, DisplayImagePath = null) {
        Element.addEventListener("mouseover",()=> {ToolTip(Element,Title,Text, DisplayImagePath);});
        Element.addEventListener("mouseout",()=> {CloseAllToolTips();});
    }
</script>