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
        height: 30%;
        max-width: 30%;
        max-height: 20%;
        aspect-ratio: 1.66/2.14;
        background-size: contain;
    }
    #PlayerAvatar {
        position: fixed;
        left:50%;
        bottom:55px;
        transform: translate(-50%,0);
        max-width: 30%;
        max-height: 25%;
        height: 30%;
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
    :global(.TextBoble) {
        position: fixed;
        color: white;
        background-color: black;
        padding: 5px;
        outline: 5px gray solid;
    }
    :global(#Objectives) {
        position:fixed;
        top:45px;
        bottom: 50%;
        right:0;
        left:75%;
        display: grid;
        grid-template-rows: repeat(auto,100%);
        color: white;
        pointer-events: none;
    }
    :global(#Objectives h1, #Objectives p) {
        margin: 0;
    }
    :global(.Prompt) {
        position: fixed;
        right: 0;
        left: 0;
        top:0; 
        bottom: 0;
        background-color: rgba(0,0,0,0.25);
    }
    :global(.Prompt div) {
        color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        background-color: rgb(50, 50, 50);
        border-radius: 25px;
        outline: 2px gray solid;
        padding: 5px;
        width: fit-content;
        height: fit-content;
        transform: translate(-50%,-50%);
    }
    :global(.NewStone) {
        animation: 0.5s PlaceMent linear;
    }
    :global(.DestroyStone) {
        animation: 0.5s Destroy linear;
    } 
    @keyframes Destroy {
        0% {
            transform: scale(1,1);
            filter: opacity(1);
        }
        25% {
            transform: scale(1.5,1.5);
            filter: opacity(1);
        }
        100% {
            transform: scale(0,0);
            filter: opacity(0);
        }
    }
    @keyframes PlaceMent {
        0% {
            transform: translate(0,50%) scale(1.5,1.5);
            filter: opacity(0) drop-shadow(0 -6mm 4mm rgba(0, 0, 0,0));
        }
        25% {
            filter: opacity(1) drop-shadow(0 -6mm 4mm rgba(0, 0, 0,0.5));
        }
        100% {
            transform: translate(0,0) scale(1,1);
            filter: opacity(1) drop-shadow(0 0mm 0mm rgba(0, 0, 0,0));
        }
    }
    .isDraggingCard {
        background-color: rgba(255,255,255,0.25);
        border-radius: 25px;
    }
</style>
<hr id="MidleLine">
<div id="EnemyAvatar"><h1 id="EnemyName">Runar</h1></div>

<div id="PlayerAvatar"><h1 id="PlayerName">You</h1></div>
<div id="EnemyHand"></div>
<div id="PlayerHand"></div>
<div id="EnemyOnField"></div>
<div id="PlayerOnField" class="{isDraggingCard?'isDraggingCard':''}"></div>
<div id="DisplayEnergy"></div>
<button id="EndTurn" on:click={endTurn}>EndTurn</button>
<h1 id="TimeDisplay">2:00</h1>
<div id="DraggableParent" style="position: fixed;"></div>
<div id="TopBar"><h1 style="margin: 0; text-align:center; color:white">Battle!</h1></div>
<h1 id="DisplayTitle"></h1>
<h1 id="code" style="cursor: pointer" on:click={() => {navigator.clipboard.writeText(document.getElementById("code").innerText)}}></h1>
<div id="Objectives"></div>
<script>
    import { onMount } from "svelte";
    import { page } from '$app/stores';

    // Tutorial Values
    var Tutorial = {
        Stage:0,
        Stages: []
    }
    var Objectives = new Array();
    var TextBobles = new Array();
    var EnemyAi = true;

    //Game Memory;
    var EnemyAvatar;
    var PlayerAvatar;
    var EnemyHand = new Array();
    var PlayerHand = new Array();
    var EnemyOnField = new Array();
    var PlayerOnField = new Array();
    var EnemyEnergy = 4;
    var PlayerEnergy = 4;
    var EnemyDeck = new Array();
    var PlayerDeck = new Array();
    var DraggableCard;
    var DraggableSelectTarget;
    var MouseX;
    var MouseY;
    var yourTurn=true;
    var FontSizeAdjusterArray = new Array();
    var TurnTime = 30;
    var GameStarted = false;
    var DeckImported = false;
    var Round = 0;

    //GameSettings
    var CanEndTurn = true;
    var TimedPlay = true;
    var MaxEnergy = 4;
    var GiveCardsAuto = true;
    var GiveCardAmount = 2;
    var Pause = true;
    var RoundTime = 30;
    var GetPlayerDeck = true;
    var UseAttackCooldown = true;

    // extra
    var isDraggingCard = false;

    //Update Loop
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
        // Objectives
        var ObjectivesParent = document.getElementById("Objectives");
        for (let i = 0; i < Objectives.length || i < ObjectivesParent.children.length; i++) {
            if (i < Objectives.length && i >= ObjectivesParent.children.length) { // Create New Element
                var Div = document.createElement("div");
                //Title
                var Title = document.createElement("h1");
                Title.innerHTML = Objectives[i].Title;
                Div.appendChild(Title);
                //Description
                var Description = document.createElement("p");
                Description.innerHTML = Objectives[i].Description;
                Div.appendChild(Description);
                //Append to Parent
                ObjectivesParent.appendChild(Div);
            } else if (i < Objectives.length && i < ObjectivesParent.children.length) { // Update Element
                ObjectivesParent.children[i].children[0].innerHTML = Objectives[i].Title;
                ObjectivesParent.children[i].children[1].innerHTML = Objectives[i].Description;
                try {
                    if (eval(Objectives[i].CompletionTrigger)) {
                        Tutorial.Stage++;
                        Objectives.splice(i,1);
                    }
                } catch (error) {
                    console.error('Error executing code:', error);
                }
            } else { // Remove Extra Element
                ObjectivesParent.children[i].remove();
            }
        }

        // Tutorial
        if(Tutorial != null && Tutorial.Stage<Tutorial.Stages.length && Tutorial.Stages.length>0) {
            // Text Boble + Objective
            if (!Tutorial.Stages[Tutorial.Stage].Started) {
                if (Tutorial.Stages[Tutorial.Stage].Text) {
                    let X = Tutorial.Stages[Tutorial.Stage].Sender == "Opponent" ? document.getElementById("EnemyAvatar").getBoundingClientRect().right : (Tutorial.Stages[Tutorial.Stage].Sender == "You" ? document.getElementById("PlayerAvatar").getBoundingClientRect().right : 10);
                    let Y = Tutorial.Stages[Tutorial.Stage].Sender == "Opponent" ? document.getElementById("EnemyAvatar").getBoundingClientRect().bottom : (Tutorial.Stages[Tutorial.Stage].Sender == "You" ? document.getElementById("PlayerAvatar").getBoundingClientRect().top : 10);
                    CreateTextBoble(X,Y,Tutorial.Stages[Tutorial.Stage].Text,Tutorial.Stages[Tutorial.Stage].Duration);
                }
                if (Tutorial.Stages[Tutorial.Stage].PlayerDeck != null) {
                    PlayerDeck = Tutorial.Stages[Tutorial.Stage].PlayerDeck;
                    GetPlayerDeck = false;
                }
                if (Tutorial.Stages[Tutorial.Stage].EnemyDeck != null) {
                    EnemyDeck = Tutorial.Stages[Tutorial.Stage].EnemyDeck;
                }
                if (Tutorial.Stages[Tutorial.Stage].GamePause != null) {
                    Pause = Tutorial.Stages[Tutorial.Stage].GamePause;
                }
                if (Tutorial.Stages[Tutorial.Stage].EnemyAi != null) {
                    EnemyAi = Tutorial.Stages[Tutorial.Stage].EnemyAi;
                }
                if (Tutorial.Stages[Tutorial.Stage].CanEndTurn != null) {
                    CanEndTurn = Tutorial.Stages[Tutorial.Stage].CanEndTurn;
                }
                if (Tutorial.Stages[Tutorial.Stage].TimedPlay != null) {
                    TimedPlay = Tutorial.Stages[Tutorial.Stage].TimedPlay;
                }
                if (Tutorial.Stages[Tutorial.Stage].UseAttackCooldown != null) {
                    UseAttackCooldown = Tutorial.Stages[Tutorial.Stage].UseAttackCooldown;
                }
                if (Tutorial.Stages[Tutorial.Stage].Function != null) {
                    try {
                        eval(Tutorial.Stages[Tutorial.Stage].Function.Function+"("+Tutorial.Stages[Tutorial.Stage].Function.Value!=null?Tutorial.Stages[Tutorial.Stage].Function.Value:""+")");
                    } catch (error) {
                        console.error('Error executing code:', error);
                    }
                }
                if (Tutorial.Stages[Tutorial.Stage].Invoke != null) {
                    try {
                        eval(Tutorial.Stages[Tutorial.Stage].Invoke);
                    } catch (error) {
                        console.error('Error executing code:', error);
                    }
                }
                if (Tutorial.Stages[Tutorial.Stage].Objective != null) {
                    Objectives.push(Tutorial.Stages[Tutorial.Stage].Objective);
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
        if (!GameStarted && DeckImported && Tutorial.Stage ==-1) {
            StartGame();
            GameStarted = true;
        }
        
        //Update Visuals
        if (EnemyAvatar != null && PlayerAvatar != null) {
            EnemyAvatar.UpdateVisuals();
            PlayerAvatar.UpdateVisuals();
            if(!UseAttackCooldown) {
                PlayerAvatar.AttackCooldown = 0;
            }
        }
        
        for (let i = 0; i < EnemyOnField.length; i++) {
            EnemyOnField[i].UpdateVisuals();
            if (EnemyOnField[i].DeathAnimation==null) {
                EnemyOnField[i].DeathAnimation = 0.85;
            }
            if (EnemyOnField[i].Card.Health<=0 && EnemyOnField[i].DeathAnimation>0) {
                EnemyOnField[i].DeathAnimation -= deltaTime;
            }
            if (EnemyOnField[i].Card.Health<=0 && EnemyOnField[i].DeathAnimation<=0) {
                EnemyOnField[i].Remove();
                EnemyOnField.splice(i,1);
                i--;
            }
        }
        for (let i = 0; i < PlayerOnField.length; i++) {
            PlayerOnField[i].UpdateVisuals();
            if (!UseAttackCooldown) {
                PlayerOnField[i].AttackCooldown = 0;
            }
            if (PlayerOnField[i].DeathAnimation==null) {
                PlayerOnField[i].DeathAnimation = 0.85;
            }
            if (PlayerOnField[i].Card.Health<=0 && PlayerOnField[i].DeathAnimation>0) {
                PlayerOnField[i].DeathAnimation -= deltaTime;
            }
            if (PlayerOnField[i].Card.Health<=0 && PlayerOnField[i].DeathAnimation<=0) {
                PlayerOnField[i].Remove();
                PlayerOnField.splice(i,1);
                i--;
            }
        }
        // Game Logic
        if (yourTurn) {
            UpdateEnergy();
        } else {
            var ActionsLeftPosable = 0;
            var ImagenEnergy = EnemyEnergy+0;
            if (EnemyAi && EnemyOnField.length<6) {
                for (let i = 0; i < EnemyHand.length; i++) {
                    if (EnemyHand[i].Card.Cost<=ImagenEnergy && EnemyOnField.length<6) {
                        ActionsLeftPosable++;
                        ImagenEnergy-=EnemyHand[i].Card.Cost;
                    }
                    if (EnemyHand[i].AnimationDone&&EnemyHand[i].Card.Cost<=EnemyEnergy&& EnemyOnField.length<6) {
                        EnemyOnField.push(new Stone(EnemyHand[i].Card,document.getElementById("EnemyOnField")));
                        
                        EnemyEnergy -= EnemyHand[i].Card.Cost;
                        EnemyHand[i].Remove();
                        EnemyHand.splice(i,1);
                    }
                }
            }
            if (EnemyAi) {
                for (let i = 0; i < EnemyOnField.length; i++) {
                    if (EnemyOnField[i].AttackCooldown<=0) {
                        var TargetStone = PlayerAvatar;
                        if (PlayerOnField.length>0) {
                            TargetStone = PlayerOnField[Math.floor(Math.random()*PlayerOnField.length)];
                        }
                        TargetStone.Card.Health -= TargetStone==PlayerAvatar||TargetStone.Card.Type == "Tank"?EnemyOnField[i].Card.Attack/2:EnemyOnField[i].Card.Attack;
                        EnemyOnField[i].AttackCooldown++;
                        EnemyOnField[i].ShowAttackAnimationAtEnemy(TargetStone != PlayerAvatar?PlayerOnField.indexOf(TargetStone):"Avatar",true);
                    }
                }
                if (EnemyAvatar.AttackCooldown<=0 && EnemyAvatar.Card.Attack>0) {
                    var TargetStone = PlayerAvatar;
                    if (PlayerOnField.length>0) {
                        TargetStone = PlayerOnField[Math.floor(Math.random()*PlayerOnField.length)];
                    }
                    TargetStone.Card.Health -= TargetStone==PlayerAvatar||TargetStone.Card.Type == "Tank"?EnemyAvatar.Card.Attack/2:EnemyAvatar.Card.Attack;
                    EnemyAvatar.ShowAttackAnimationAtEnemy(TargetStone != PlayerAvatar?PlayerOnField.indexOf(TargetStone):"Avatar",true);
                    EnemyAvatar.AttackCooldown++;
                }
                if (ActionsLeftPosable==0) {
                    endTurn(true);
                }
            }
        }
        //Time 
        document.getElementById("TimeDisplay").innerHTML = Math.trunc(Math.floor(TurnTime)/60) + ":" + String(Math.floor(TurnTime)%60).padStart(2,"0");
        if (!Pause && TimedPlay) {TurnTime -= deltaTime;}
        if (TurnTime<=0) {
            endTurn(true);
        }
        if (TimedPlay) {
            document.getElementById("TimeDisplay").style.opacity = 1;
        } else {
            document.getElementById("TimeDisplay").style.opacity = 0;
        }
        // CanEndTurn 
        if (CanEndTurn) {
            document.getElementById("EndTurn").style.opacity = 1;
        } else {
            document.getElementById("EndTurn").style.opacity = 0;
        }
        requestAnimationFrame(Update);
    }


    
    onMount(async() => {
        let search = $page.url.searchParams;
        if (search.has("tutorial")) {
            let data = await fetch(window.location.origin+'/api/tutorials/get/'+search.get("tutorial"), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (data.ok) {
                Tutorial.Stages = await data.json()
            } else {
                window.location.href = "/";
            }
        } else {
            Tutorial.Stage = -1;
        }


        EnemyAvatar = new Stone({Attack:0,Health:5,Texture:"Runar"},document.getElementById("EnemyAvatar"),"Avatar","Tank");
        PlayerAvatar = new Stone({Attack:5,Health:15,Texture:"BOB"},document.getElementById("PlayerAvatar"),"","Tank");

        GetDeck();

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
        // Add a listener for the mousemove event
        document.addEventListener('mousemove', handleMouseMove);
    })
    function StartGame() {
        Pause = false;
        TurnTime = RoundTime;
        if (GiveCardsAuto) {
            if (yourTurn) {
                GiveRandomCard(PlayerDeck,MaxEnergy,GiveCardAmount);
                UpdateEnergy();
            } else {
                GiveRandomCard(EnemyDeck,MaxEnergy,GiveCardAmount,true);
            }
        }
    }
    function endTurn(Teacher=false) {
        if (Teacher==true||yourTurn){
            TurnTime = RoundTime;
            yourTurn = !yourTurn;
            if (yourTurn) {
                Round++;
                if (MaxEnergy<10) 
                    MaxEnergy++;
                PlayerEnergy = MaxEnergy;
                UpdateEnergy();
                if (Round >0) {
                    PlayerAvatar.AttackCooldown-=PlayerAvatar.AttackCooldown>0?1:0;
                    for (let i = 0; i < PlayerOnField.length; i++) {
                        PlayerOnField[i].AttackCooldown-=PlayerOnField[i].AttackCooldown>0?1:0;
                    }
                }
            } else {
                PlayerEnergy = 0;
                UpdateEnergy();
                EnemyEnergy = MaxEnergy;
                if (Round >0) {
                    EnemyAvatar.AttackCooldown-=EnemyAvatar.AttackCooldown>0?1:0;
                    for (let i = 0; i < EnemyOnField.length; i++) {
                        EnemyOnField[i].AttackCooldown-=EnemyOnField[i].AttackCooldown>0?1:0;
                    }
                }
            }

            if (GiveCardsAuto) {
                if (yourTurn) {
                    GiveRandomCard(PlayerDeck,MaxEnergy,GiveCardAmount);
                } else {
                    GiveRandomCard(EnemyDeck,MaxEnergy,GiveCardAmount,true);
                }
            }
        }
    }
    // Give Random Card Function
    function GiveRandomCard(Deck,MaxEnergy,Amount,Enemy=false) {
        var Hand = PlayerHand;
        if (Enemy) {
            Hand = EnemyHand;
        }
        var FilteredDeck = new Array();
        for (let i = 0; i < Deck.length; i++) {
            if (Deck[i].Cost<=MaxEnergy) {
                FilteredDeck.push(Deck[i]);
            }
        }
        if (FilteredDeck.length==0) {
            FilteredDeck = Deck;
            if (Deck.length==0) {
                FilteredDeck = [{Name:"None",Description:"None",Cost:1,Attack:1,Health:1,Texture:"MissingCharacter"}]
            }
        }
        for (let i = 0; i < Amount; i++) {
            let SelectedCard = FilteredDeck[Math.floor(Math.random() * FilteredDeck.length)];
            Hand.push(new Card({...SelectedCard},i/2,Enemy));
        }
    }
    // Give Random Card Function
    function GiveCard(Hand, SelectedCard) {
        Hand.push(new Card({...SelectedCard},0));
    }
    //Place the stone by the position of the Draggable
    function PlaceStone() {
        if (!yourTurn || PlayerOnField.length>=6 || DraggableCard.Class.Card.Cost>PlayerEnergy) {return;}
        var PlayerField = document.getElementById("PlayerOnField");
        var LeftSide = PlayerField.getBoundingClientRect().left;
        var whereInDiv = (MouseX-LeftSide)/PlayerField.offsetWidth;
        var WhatToSend = Math.floor(whereInDiv*(PlayerOnField.length+1));
        var SelectedCardIndex = PlayerHand.indexOf(DraggableCard.Class);

        PlayerOnField = [
            ...PlayerOnField.slice(0, WhatToSend),
            new Stone({...PlayerHand[SelectedCardIndex].Card,New:true},PlayerField,""),
            ...PlayerOnField.slice(WhatToSend) 
        ];
        PlayerEnergy -= PlayerHand[SelectedCardIndex].Card.Cost;
        PlayerHand[SelectedCardIndex].Remove();
        PlayerHand.splice(SelectedCardIndex,1);
        DropDraggable();
        UpdateEnergy();
        
    }
    //Place the stone by the position of the Draggable
    function PlaceStoneOnFiled(FieldArray,FieldElement,WhereToPlaceInField,StoneInfo) {
        FieldArray = [
            ...FieldArray.slice(0, WhereToPlaceInField),
            new Stone({...StoneInfo,New:true},FieldElement,WhereToPlaceInField),
            ...FieldArray.slice(WhereToPlaceInField) 
        ]
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

            } else if (DraggableCard.Class.Card.Type == "Projectile") { // Projectile

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
                        DraggableCard.Stone = CreateCharacterStone(DraggableCard.Class.Card.Attack,DraggableCard.Class.Card.Health,DraggableCard.Class.Card.Texture,"",DraggableCard.Class.Card.Type);
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
                if (TargetClass && TargetClass.Card.Health-DraggableSelectTarget.Class.Card.Attack<=0) {
                    DraggableSelectTarget.TargetIndicator.style.backgroundImage = "url('/images/kill.png');";
                } else {
                    DraggableSelectTarget.TargetIndicator.style.backgroundImage = "url('/images/target.png');";
                }
            } else {
                DraggableSelectTarget.SelectedTarget = "";
                DraggableSelectTarget.TargetIndicator.style.backgroundImage = "url('/images/target.png');";
            }
        }
    }
    

    //Select the object to drag and start drag
    function SelectDraggable(Element,Class=null) {
        if (DraggableCard) {
            DropDraggable();
        }
        if (!yourTurn) {return;}
        if (Class.Card.Type == "Projectile") {
            let Draggable = document.createElement("img");
            Draggable.style = "width:100px:height:100px;background-image:url('/images/Projectile/"+Class.Card.Texture+".png')";
            DraggableCard = {Card:Element,Draggable:Draggable,Class:Class};
            DraggableCard.Draggable.style.left = 50+"%";
            DraggableCard.Draggable.style.top = 75+"%";

            //Target Select!
            var TargetIndicator = document.createElement("img");
            TargetIndicator.classList.add("TargetIndicator");
            TargetIndicator.src = "/images/target.png";
            DraggableSelectTarget = {Class:Class,TargetIndicator:TargetIndicator,SelectedTarget:""};
            document.getElementById("DraggableParent").appendChild(TargetIndicator);
            DraggableSelectTarget.TargetIndicator.style.left = MouseX+"px";
            DraggableSelectTarget.TargetIndicator.style.top = MouseY+"px";
        } else {
            DraggableCard = {Card:Element,Draggable:Element.cloneNode(true),Stone:null,Class:Class};
            DraggableCard.Draggable.classList.add("Draggable");
            document.getElementById("DraggableParent").appendChild(DraggableCard.Draggable);
            DraggableCard.Draggable.style.left = MouseX+"px";
            DraggableCard.Draggable.style.top = MouseY+"px";
            isDraggingCard = true;
        }
        Element.style.display = "none";
    }

    function DropDraggable() {
        if (DraggableSelectTarget) {
            if (DraggableSelectTarget.SelectedTarget!="") {
                var AttackingStone = DraggableSelectTarget.Class;
                var Target = null;
                if (DraggableSelectTarget.SelectedTarget && DraggableSelectTarget.SelectedTarget != "" && DraggableSelectTarget.SelectedTarget != "Avatar") {
                    Target = EnemyOnField[Number(DraggableSelectTarget.SelectedTarget)];
                } else {
                    Target = EnemyAvatar;
                }
                // if player is using a card Projectile to select target
                if (DraggableCard && DraggableCard.Class.Card.Type == "Projectile") {
                    Target.Card.Health -= DraggableSelectTarget.SelectedTarget == "Avatar"||Target.Card.Type == "Tank"?AttackingStone.Card.Attack/2:AttackingStone.Card.Attack;
                    // Projctile Visual
                    var Projectile = document.createElement("img");
                    Projectile.classList.add("Projectile");
                    document.body.appendChild(Projectile);
                    Projectile.style.top = "75%";
                    Projectile.style.left = "50%";
                    Projectile.style.top = (AttackingStone.Body.getBoundingClientRect().top+(AttackingStone.Body.getBoundingClientRect().height/2))+"px";
                    Projectile.style.left = (AttackingStone.Body.getBoundingClientRect().left+(AttackingStone.Body.getBoundingClientRect().width/2))+"px";
                    setTimeout(() => {Projectile.remove();},1500);
                    // Apply
                    AttackingStone.Remove();
                    PlayerHand.splice(PlayerHand.indexOf(AttackingStone),1);
                } else { // if player is using a stone to select target
                    Target.Card.Health -= DraggableSelectTarget.SelectedTarget == "Avatar"||Target.Card.Type == "Tank"?AttackingStone.Card.Attack/2:AttackingStone.Card.Attack;
                    if (UseAttackCooldown) {AttackingStone.AttackCooldown++;}

                    // Burst DMG
                    if (AttackingStone.Card.AttackType && AttackingStone.Card.AttackType == "Burst" && DraggableSelectTarget.SelectedTarget != "Avatar") {
                        let SelectedAttackIndex = EnemyOnField.indexOf(Target);
                        if (SelectedAttackIndex<EnemyOnField.length-1) {
                            EnemyOnField[SelectedAttackIndex+1].Card.Health -= Target.Card.Type == "Tank"?AttackingStone.Attack/2:AttackingStone.Card.Attack;
                        }
                        if (SelectedAttackIndex>0) {
                            EnemyOnField[SelectedAttackIndex-1].Card.Health -= Target.Card.Type == "Tank"?AttackingStone.Attack/2:AttackingStone.Card.Attack;
                        }
                    }
                    AttackingStone.ShowAttackAnimationAtEnemy(DraggableSelectTarget.SelectedTarget!="Avatar"?EnemyOnField.indexOf(Target):"Avatar",false);
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
        isDraggingCard = false;
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

        //CardDMG
        var CardDMG = document.createElement("div");
        CardDMG.classList.add("CharacterStoneDMG");
        CharacterStone.appendChild(CardDMG);
        if (Attack== null || Attack == 0) {
            CardDMG.style.filter = "opacity(0)"
        }
        //DMG Display
        var CardDMGText = document.createElement("p");
        CardDMGText.innerHTML = Attack;
        CardDMG.appendChild(CardDMGText);
        FontSizeAdjusterArray.push({Element:CardDMGText,ScaleFactor:0.5});

        //CardHealth
        var CharacterStoneHealth = document.createElement("div");
        CharacterStoneHealth.classList.add("CharacterStoneHealth");
        CharacterStone.appendChild(CharacterStoneHealth);

        //Health Display
        var CharacterStoneHealthText = document.createElement("p");
        CharacterStoneHealthText.innerHTML = Health;
        CharacterStoneHealth.appendChild(CharacterStoneHealthText);
        FontSizeAdjusterArray.push({Element:CharacterStoneHealthText,ScaleFactor:0.5});

        return CharacterStone;
    }

    function UpdateEnergy() {
        if (DraggableCard && DraggableCard.InArea) {
            SetEnergyLevel(PlayerEnergy-DraggableCard.Class.Card.Cost);
        } else if (DraggableSelectTarget && DraggableSelectTarget.SelectedTarget != "" && DraggableCard && DraggableCard.Class) {
            SetEnergyLevel(PlayerEnergy-DraggableCard.Class.Card.Cost);
        } else {
            SetEnergyLevel();
        }
    }

    function SetEnergyLevel(FakeAmount=null) {
        var EnergyHolder = document.getElementById("DisplayEnergy");
        for (let i = 0; i < EnergyHolder.children.length || i < MaxEnergy; i++) {
            if (i>= EnergyHolder.children.length && i < MaxEnergy) { // Create Child
                var EnergyCrystal = document.createElement("img");
                EnergyCrystal.src = "/images/EnergyIcon.png";
                document.getElementById("DisplayEnergy").appendChild(EnergyCrystal);
            } else if (i< EnergyHolder.children.length && i >= PlayerEnergy) {
                EnergyHolder.children[i].style.filter = "grayscale(1)";
            } else if (i >= MaxEnergy) { // Remove Object
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

        
        if (Attack != null && Attack != 0) {
            //CardDMG
            var CardDMG = document.createElement("div");
            CardDMG.classList.add("CardDMG");
            Card.appendChild(CardDMG);
            //DMG Display
            var CardDMGText = document.createElement("p");
            CardDMGText.innerHTML = Attack;
            CardDMG.appendChild(CardDMGText);
            FontSizeAdjusterArray.push({Element:CardDMGText, ScaleFactor:0.5});
        }
        
        if (Health != null) {
            //CardHealth
            var CardHealth = document.createElement("div");
            CardHealth.classList.add("CardHealth");
            Card.appendChild(CardHealth);

            //Health Display
            var CardHealthText = document.createElement("p");
            CardHealthText.innerHTML = Health;
            CardHealth.appendChild(CardHealthText);
            FontSizeAdjusterArray.push({Element:CardHealthText,ScaleFactor:0.5});
        }
        

        //CardCost
        var CardCost = document.createElement("div");
        CardCost.classList.add("CardCost");
        Card.appendChild(CardCost);

        //Cost Display
        var CardCostText = document.createElement("p");
        CardCostText.innerHTML = Cost;
        CardCost.appendChild(CardCostText);
        FontSizeAdjusterArray.push({Element:CardCostText,ScaleFactor:0.5});

        //CardName
        var CardName = document.createElement("div");
        CardName.classList.add("CardName");
        Card.appendChild(CardName);

        //Name Display
        var CardNameText = document.createElement("p1");
        CardNameText.innerHTML = Name;
        CardName.appendChild(CardNameText);
        FontSizeAdjusterArray.push({Element:CardNameText});

        //CardDescription
        var CardDescription = document.createElement("div");
        CardDescription.classList.add("CardDescription");
        Card.appendChild(CardDescription);

        //Description Display
        var CardDescriptionText = document.createElement("p1");
        CardDescriptionText.innerHTML = Description;
        CardDescriptionText.style.fontSize = "80%";
        CardDescription.appendChild(CardDescriptionText);
        FontSizeAdjusterArray.push({Element:CardDescriptionText});

        return Card;
    }
    function SetAllFontSizeInArray(Array) {
        for (var i = 0; i < Array.length; i++) {
            const Element = Array[i].Element;
            if (Element!= null) {
                let i1 = 1 // let's start with 12px
                let overflow = false
                const maxSize = 200 // very huge text size
                var ScaleFactor = (Array[i] != null && Array[i].ScaleFactor != null) ? Array[i].ScaleFactor : 1;
                while (!overflow && i1 < maxSize) {
                    Element.style.fontSize = `${i1}px`;
                    overflow = isOverflown(Element.parentNode);
                    if (!overflow) i1++
                }

                // revert to last state where no overflow happened:
                Element.style.fontSize = `${i1*ScaleFactor - 1}px`;
            }
        }
    }
    function isOverflown(element) {
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }

    // Get Player Current Deck
    async function GetDeck() {
        const deck = await fetch(window.location.origin+'/api/cards/getDeck', {
            method: 'GET',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        if (GetPlayerDeck) {
            PlayerDeck = await deck.json();
            DeckImported = true;
        }
    }
    function CreateUseCardPrompt(Title,Class) {
        if (PlayerEnergy<Class.Card.Cost) {return;}
        if (Class.Card.Type == "Consumable") {
            var Prompt = document.createElement("div");
            Prompt.classList.add("Prompt");

            var PromptBox = document.createElement("div");
            Prompt.appendChild(PromptBox);

            var h1 = document.createElement("h1");
            h1.innerHTML = Title;
            PromptBox.appendChild(h1);
            var Yes = document.createElement("button");
            Yes.innerHTML = "Yes";
            Yes.addEventListener("click",()=>{
                if (Class.Card.Type && Class.Card.Type == "Consumable" && Class.Card.Value) {
                    GiveRandomCard(PlayerDeck, MaxEnergy, Class.Card.Value);
                    Class.Body.remove();
                    PlayerHand.splice(PlayerHand.indexOf(Class),1);
                }
                Prompt.remove();
            });
            PromptBox.appendChild(Yes);
            var No = document.createElement("button");
            No.innerHTML = "No";
            No.addEventListener("click",()=>{
                Prompt.remove();
            });
            PromptBox.appendChild(No);

            document.body.appendChild(Prompt);
        }
    }
    // Remove all event listeners from an element
    function removeAllEventListeners(element) {
        // Clone the element to remove all its events
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        return newElement;
    }

    class Card {
        constructor(_Card,SpawnDelay=0,EnemyCard=false) {
            this.Card = _Card;
            this.BodyCreated = false;
            this.EnemyCard = EnemyCard;

            setTimeout(() => {
                this.CreateBody();
                }, SpawnDelay*500);
        }
        UpdateVisuals() {
            if ((DraggableCard == null && this.Body && this.Body.classList.contains("Card") && this.Body.style.display == "none") || (DraggableCard && DraggableCard.Class != this && this.Body && this.Body.classList.contains("Card") && this.Body.style.display == "none")) {
                this.Body.style.display = "block";
            }
            if (this.Body && this.Body.classList.contains("Card")) {
                this.Body.children[0].style.backgroundImage = "url('/images/Cards/"+this.Card.Texture+".png')";
                this.Body.children[2].children[0].innerHTML = this.Card.Attack;
                this.Body.children[3].children[0].innerHTML = this.Card.Health;
                this.Body.children[4].children[0].innerHTML = this.Card.Cost;
                this.Body.children[5].children[0].innerHTML = this.Card.Name;
                this.Body.children[6].children[0].innerHTML = this.Card.Description;
                if (this.Card.Type=="Projectile") {
                    this.Body.children[3].style.display = "none";
                } else {
                    this.Body.children[3].style.display = "block";
                }
            }
        }
        Remove() {
            if (this.Body)
                this.Body.remove();
        }
        CreateBody() {
            this.Body = CreateEmptyCard();
            document.body.appendChild(this.Body);
            if (this.EnemyCard) {
                this.Body.classList.add("EnemyCardAnimation");
            } else
                this.Body.classList.add("CardAnimation");
            this.Body.addEventListener('animationend', () => {
                // Add your code here to run when the animation is complete
                this.Body.remove();
                if (this.EnemyCard) {
                    this.Body = CreateEmptyCard();
                    document.getElementById("EnemyHand").appendChild(this.Body);
                    this.AnimationDone = true;
                }else {
                    this.Body = CreateCard(this.Card.Name,this.Card.Description,this.Card.Cost,this.Card.Attack,this.Card.Health,this.Card.Texture);
                    document.getElementById("PlayerHand").appendChild(this.Body);
                    this.Body.classList.add("Selectable");
                    if (this.Card.Type != "Consumable") {
                        this.Body.addEventListener('mousedown', ()=>SelectDraggable(this.Body,this));
                    } else {
                        this.Body.addEventListener('click', ()=>CreateUseCardPrompt("Do You Want To Use "+this.Card.Name,this));
                        this.Body.addEventListener('mousedown', ()=>CreateUseCardPrompt("Do You Want To Use "+this.Card.Name,this));
                    }
                }
                
                this.BodyCreated = true;

                setTimeout(function() {SetAllFontSizeInArray(FontSizeAdjusterArray)}, 100);
            });
        }
    } 
    class Stone {
        constructor(Card, ParentNode, WhatAmI) {
            this.Card = Card;
            this.AttackCooldown = 1;
            this.WhatAmI = WhatAmI

            this.Body = CreateCharacterStone(Card.Attack,Card.Health,Card.Texture,"",Card.Type);
            this.Body.classList.add("Selectable");
            this.Body.addEventListener("mousedown", ()=>this.SelectAttackingStone());

            ParentNode.appendChild(this.Body);
        }
        UpdateVisuals() {
            if (PlayerOnField.indexOf(this) >=0 && this.Body != null) {
                var BodyIndex = PlayerOnField.indexOf(this);
                if (this.Body != document.getElementById("PlayerOnField").children[BodyIndex]) {
                    this.Body = document.getElementById("PlayerOnField").children[BodyIndex];
                    this.Body = removeAllEventListeners(this.Body);
                    this.Body.addEventListener("mousedown", ()=>this.SelectAttackingStone());
                }
            }
            if (this.Card.New==true) {
                this.Body.classList.add("NewStone");
                let Body = this.Body;
                this.Body.addEventListener('animationend', () => {
                    Body.classList.remove("NewStone");
                    this.Card.New=false;
                });
            } else if (this.Card.Death==true) {
                this.Body.classList.add("DestroyStone");
                this.Body.addEventListener('animationend', () => {
                    if (!this.Removing) {
                        this.Body.classList.remove("DestroyStone");
                        this.Card.Death = false;
                    }
                });
            }
            if (!this.Card.Death != true) {

            } else if (DraggableSelectTarget && DraggableSelectTarget.SelectedTarget == this.WhatAmI && this.WhatAmI!="") {
                this.Body.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = this.Card.Attack;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = this.Card.Health-(this.Card.Type=="Tank"?DraggableSelectTarget.Class.Card.Attack/2:DraggableSelectTarget.Class.Card.Attack);
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].style.color = "blue";
            } else if (DraggableSelectTarget && DraggableSelectTarget.Class && DraggableSelectTarget.Class.Card.AttackType == "Burst" &&  this.WhatAmI!="" && typeof(Number(this.WhatAmI)) == "number" && DraggableSelectTarget.SelectedTarget != "" && (Number(DraggableSelectTarget.SelectedTarget) == Number(this.WhatAmI)-1 || Number(DraggableSelectTarget.SelectedTarget) == Number(this.WhatAmI)+1)) {
                this.Body.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = this.Card.Attack;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = this.Card.Health-(this.Card.Type=="Tank"?DraggableSelectTarget.Class.Card.Attack/2:DraggableSelectTarget.Class.Card.Attack);
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].style.color = "rgb(0,0,100)";
            } else {
                this.Body.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = this.Card.Attack;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = this.Card.Health;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].style.color = "black";
            }
            if (this.Card.Type != null && this.Card.Type == "Tank") {
                this.Body.style.backgroundImage = "url('/images/Cards/"+this.Card.Texture+".png'), url('/images/shield.png')";
            } else 
                this.Body.style.backgroundImage = "url('/images/Cards/"+this.Card.Texture+".png')";

            if (this.AttackCooldown>0) {
                this.Body.classList.add("OnCooldown");
            } else {
                this.Body.classList.remove("OnCooldown");
            }
        }
        Remove() {
            if (this.Body) {
                if (this.Card.Death!=true) {
                    this.Body.classList.add("DestroyStone");
                }
                
                this.Removing = true;
                let Body = this.Body;
                setTimeout(function() {
                    Body.remove();
                }, 500);
            }
        }
        SelectAttackingStone() {
            if (DraggableSelectTarget) {
                DropDraggable();
            }
            if (!yourTurn || this.AttackCooldown > 0 || Pause) {return;}
            var TargetIndicator = document.createElement("img");
            TargetIndicator.classList.add("TargetIndicator");
            TargetIndicator.src = "/images/target.png";
            DraggableSelectTarget = {Class:this,TargetIndicator:TargetIndicator,SelectedTarget:""}
            DraggableSelectTarget.Class.Body.classList.add("Glow");
            document.getElementById("DraggableParent").appendChild(TargetIndicator);
            DraggableSelectTarget.TargetIndicator.style.left = MouseX+"px";
            DraggableSelectTarget.TargetIndicator.style.top = MouseY+"px";
        }
        ShowAttackAnimationAtEnemy(TargetIndex, ThisEnemy = false) {
            var FakeStone = this.Body.cloneNode(true);
            FakeStone.classList.remove("NewStone")
            FakeStone.style.height = this.Body.parentNode.clientHeight+"px";
            FakeStone.style.position = "fixed";
            FakeStone.style.top = this.Body.getBoundingClientRect().top + (this.Body.offsetHeight/2) + "px";
            FakeStone.style.left = this.Body.getBoundingClientRect().left + (this.Body.offsetWidth/2) + "px";
            FakeStone.style.transform = "translate(-50%,-50%)";
            document.body.appendChild(FakeStone);
            this.Body.style.filter = "opacity(0)";
            // Get Target
            var TargetEnemy = ThisEnemy ? PlayerAvatar.Body : EnemyAvatar.Body;
            var TargetField = ThisEnemy ? PlayerOnField : EnemyOnField;
            if (TargetIndex != null && typeof TargetIndex == "number" && TargetField.length>TargetIndex && TargetField.length >=0) {
                TargetEnemy = TargetField[TargetIndex].Body;
            }
            let top = TargetEnemy.getBoundingClientRect().top + (TargetEnemy.offsetHeight/2);
            let left = TargetEnemy.getBoundingClientRect().left + (TargetEnemy.offsetWidth/2);
            top -= ThisEnemy ? (TargetEnemy.offsetHeight/2) : -(TargetEnemy.offsetHeight/2);
            setTimeout(()=>{
                FakeStone.style.transition = "0.75s ease-in";
                FakeStone.style.top = top+"px";
                FakeStone.style.left = left+"px";
            },100);
            

            setTimeout(()=>{
                FakeStone.style.top = this.Body.getBoundingClientRect().top + "px";
                FakeStone.style.left = this.Body.getBoundingClientRect().left + "px";
                FakeStone.style.transform = "";
            },1000);
            setTimeout(()=>{
                this.Body.style.filter = "";
                FakeStone.remove();
            },1750);
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