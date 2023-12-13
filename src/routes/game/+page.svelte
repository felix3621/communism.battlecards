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
</style>
<hr id="MidleLine">
<div id="EnemyAvatar"></div>
<div id="PlayerAvatar"></div>
<div id="EnemyHand"></div>
<div id="PlayerHand"></div>
<div id="EnemyOnField"></div>
<div id="PlayerOnField"></div>
<div id="DisplayEnergy">
    <img src="/images/EnergyIcon.png">
    <img src="/images/EnergyIcon.png">
</div>
<button id="EndTurn" on:click={endTurn}>EndTurn</button>
<h1 id="TimeDisplay">2:00</h1>
<div id="DraggableParent" style="position: fixed;"></div>
<div id="TopBar"><h1 style="margin: 0; text-align:center; color:white">Battle!</h1></div>
<h1 id="DisplayTitle"></h1>

<script>
    import { onMount } from "svelte";

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

    var socket;

    var FakeDisplay;
    
    onMount(() => {
        EnemyAvatar = new Avatar(0,0,"MissingCharacter",document.getElementById("EnemyAvatar"),"")
        PlayerAvatar = new Avatar(0,0,"MissingCharacter",document.getElementById("PlayerAvatar"),"")
        socket = new WebSocket(`wss://${window.location.host}/gamesocket`);

        // Event listener for when the connection is established
        socket.onopen = () => {
            console.log('Connected to server');
        };

        // Event listener for incoming messages from the server
        socket.onmessage = (event) => {
            var data = event.data;
            if (data) {
                data = JSON.parse(data);
                if (data.TurnTime) {
                    let newTime = Math.trunc(data.TurnTime/60) + ":" + String(data.TurnTime%60).padStart(2,"0");
                    document.getElementById("TimeDisplay").innerHTML = newTime;
                }
                yourTurn = data.yourTurn;
                if (data.PlayerInfo) {
                    PlayerDisplayName = data.PlayerInfo.DisplayName;
                    PlayerAvatar.UpdateVisuals(data.PlayerInfo.Avatar.Attack,data.PlayerInfo.Avatar.Health,data.PlayerInfo.Avatar.Texture,data.PlayerInfo.DisplayName, data.PlayerInfo.Avatar.attackCooldown);
                    PlayerEnergy = data.PlayerInfo.Energy;
                    PlayerMaxEnergy = data.MaxEnergy;
                    UpdateEnergy();
                    displayTitle = data.PlayerInfo.Title
                    for (let i = 0; i < data.PlayerInfo.Field.length || i<PlayerOnField.length; i++) {
                        if (i<data.PlayerInfo.Field.length && i>=PlayerOnField.length) {
                            PlayerOnField.push(new Stone(data.PlayerInfo.Field[i].attackDMG, data.PlayerInfo.Field[i].health, data.PlayerInfo.Field[i].texture, document.getElementById("PlayerOnField")));
                        } else if (i<data.PlayerInfo.Field.length) {
                            PlayerOnField[i].UpdateVisuals(data.PlayerInfo.Field[i].attackDMG, data.PlayerInfo.Field[i].health, data.PlayerInfo.Field[i].texture);
                        } else {
                            console.log(data.PlayerInfo.Field);
                            PlayerOnField[i].Remove();
                            PlayerOnField.splice(i,1);
                        }
                    }
                    var SpawnAmount =0;
                    for (let i = 0; i < data.PlayerInfo.Hand.length || i<PlayerHand.length; i++) {
                        if (i<data.PlayerInfo.Hand.length && i>=PlayerHand.length) {
                            PlayerHand.push(new Card(data.PlayerInfo.Hand[i].Name, data.PlayerInfo.Hand[i].Description, data.PlayerInfo.Hand[i].Cost, data.PlayerInfo.Hand[i].Attack, data.PlayerInfo.Hand[i].Health, data.PlayerInfo.Hand[i].Texture, SpawnAmount));
                            SpawnAmount++;
                        } else if (i<data.PlayerInfo.Hand.length) {
                            PlayerHand[i].UpdateVisuals(data.PlayerInfo.Hand[i].Name, data.PlayerInfo.Hand[i].Description, data.PlayerInfo.Hand[i].Cost, data.PlayerInfo.Hand[i].Attack, data.PlayerInfo.Hand[i].Health, data.PlayerInfo.Hand[i].Texture);
                        } else {
                            PlayerHand[i].Remove();
                            PlayerHand.splice(i,1);
                        }
                    }
                }
                if (data.EnemyInfo) {
                    EnemyDisplayName = data.EnemyInfo.DisplayName;
                    EnemyAvatar.UpdateVisuals(data.EnemyInfo.Avatar.Attack, data.EnemyInfo.Avatar.Health, data.EnemyInfo.Avatar.Texture, data.EnemyInfo.DisplayName);
                
                    for (let i = 0; i < data.EnemyInfo.Field.length || i<EnemyOnField.length; i++) {
                        if (i<data.EnemyInfo.Field.length && i>= EnemyOnField.length) {
                            EnemyOnField.push(new Stone(data.EnemyInfo.Field[i].attackDMG, data.EnemyInfo.Field[i].health, data.EnemyInfo.Field[i].texture, document.getElementById("EnemyOnField")));
                        } else if (i<data.EnemyInfo.Field.length) {
                            EnemyOnField[i].UpdateVisuals(data.EnemyInfo.Field[i].attackDMG, data.EnemyInfo.Field[i].health, data.EnemyInfo.Field[i].texture);
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
            }
            document.getElementById("DisplayTitle").innerHTML = displayTitle;

            // Add a listener for the mousemove event
            document.addEventListener('mousemove', handleMouseMove);
        };

        // Event listener for when the connection is closed
        socket.onclose = () => {
            console.log('Connection closed');
        };

        // Event listener for errors
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

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
        socket.send(JSON.stringify({function:"EndTurn"}));
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
            } else {
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
                        DraggableCard.Stone = CreateCharacterStone(DraggableCard.Class.Attack,DraggableCard.Class.Health,DraggableCard.Class.Texture);
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
                    const element = EnemyOnField[i];
                    if (element.Body == event.target)
                        TargetClass = element
                }
                if (!TargetClass && EnemyAvatar.Body == event.target) {
                    TargetClass = EnemyAvatar;
                }
            }
        }
    }
    //Place the stone by the position of the Draggable
    function PlaceStone() {
        if (!yourTurn) {return;}
        console.log("Place Stone!")
        var PlayerField = document.getElementById("PlayerOnField");
        var LeftSide = PlayerField.getBoundingClientRect().left;
        var whereInDiv = (MouseX-LeftSide)/PlayerField.offsetWidth;
        var WhatToSend = Math.floor(whereInDiv*(PlayerOnField.length+1));
        socket.send(JSON.stringify({function:"PlaceCard",SelectedIndex:WhatToSend,SelectedCardIndex:PlayerHand.indexOf(DraggableCard.Class)}));
        DropDraggable();
    }

    //Select the object to drag and start drag
    function SelectDraggable(Element,Class=null) {
        if (DraggableCard) {
            DropDraggable();
        }
        if (!yourTurn) {return;}
        DraggableCard = {Card:Element,Draggable:Element.cloneNode(true),Stone:null,Class:Class};
        Element.style.display = "none";
        DraggableCard.Draggable.classList.add("Draggable");
        document.getElementById("DraggableParent").appendChild(DraggableCard.Draggable);
        DraggableCard.Draggable.style.left = MouseX+"px";
        DraggableCard.Draggable.style.top = MouseY+"px";
    }
    function SelectAttackingStone(Class) {
        if (DraggableSelectTarget) {
            DropDraggable();
        }
        if (!yourTurn) {return;}
        var TargetIndicator = document.createElement("img");
        TargetIndicator.classList.add("TargetIndicator");
        TargetIndicator.src = "/images/target.png";
        DraggableSelectTarget = {Class:Class,TargetIndicator:TargetIndicator}
        DraggableSelectTarget.Class.Body.classList.add("Glow");
        document.getElementById("DraggableParent").appendChild(TargetIndicator);
        DraggableSelectTarget.TargetIndicator.style.left = MouseX+"px";
        DraggableSelectTarget.TargetIndicator.style.top = MouseY+"px";
        console.log(DraggableSelectTarget);
    }
    function DropDraggable() {
        if (DraggableCard) {
            DraggableCard.Card.style.display = "block";
            DraggableCard.Draggable.remove();
            if (DraggableCard.Stone) {
                DraggableCard.Stone.remove();
            }
            DraggableCard = null;
        }
        if (DraggableSelectTarget) {
            DraggableSelectTarget.TargetIndicator.remove();
        }
        
        document.querySelectorAll('.Glow').forEach(function(element) {
                element.classList.remove('Glow');
            });
        DraggableSelectTarget = null;
    }

    function CreateCharacterStone(Attack, Health, Texture) {
        //THE CharacterStone
        var CharacterStone = document.createElement("div");
        CharacterStone.classList.add("CharacterStone");
        CharacterStone.style.backgroundImage = "url('/images/Cards/"+Texture+".png')";

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

            var scaleFactor = (containerHeight-5) / textHeight;

            let fs = Number(Element.style.fontSize.slice(0, -3));

            var fontSize = (fs > 0) ? fs : 1;
            
            fontSize = fontSize * (scaleFactor * 0.575);
            Element.style.fontSize = `${fontSize}rem`;
        }
    }

    class Card {
        constructor(Name,Description,Cost,Attack,Health,Texture,SpawnDelay=0) {
            this.Cost = Cost;
            this.Health = Health;
            this.Attack = Attack;
            this.Texture = Texture;
            this.Name = Name;
            this.Description = Description;

            setTimeout(() => {
                this.CreateBody();
                }, SpawnDelay*500);
        }
        UpdateVisuals(Name,Description,Cost,Attack,Health,Texture) {
            this.Cost = Cost;
            this.Health = Health;
            this.Attack = Attack;
            this.Texture = Texture;
            this.Name = Name;
            this.Description = Description;
            if (this.Body && this.Body.classList.contains("Card")) {
                this.Body.children[0].style.backgroundImage = "url('/images/Cards/"+Texture+".png')";
                this.Body.children[2].children[0].innerHTML = Attack;
                this.Body.children[3].children[0].innerHTML = Health;
                this.Body.children[4].children[0].innerHTML = Cost;
                this.Body.children[5].children[0].innerHTML = Name;
                this.Body.children[6].children[0].innerHTML = Description;
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
        constructor(Attack,Health,Texture, ParentNode) {
            this.Health = Health;
            this.Attack = Attack;
            this.Texture = Texture;
            this.AttackCooldown = 1;

            this.Body = CreateCharacterStone(Attack,Health,Texture);
            this.Body.classList.add("Selectable");
            this.Body.addEventListener("mousedown", ()=>SelectAttackingStone(this));
            ParentNode.appendChild(this.Body);
        }
        UpdateVisuals(Attack = this.Health, Health = this.Health, Texture=this.Texture, AttackCooldown=this.AttackCooldown) {
            if (FakeDisplay && FakeDisplay.Class == this) {
                this.Body.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = Attack-FakeDisplay.AttackReduction;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health-FakeDisplay.HealthReduction;
            } else {
                this.Body.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = Attack;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health;
            }
            
            this.Body.style.backgroundImage = "url('/images/Cards/"+Texture+".png')";
            this.AttackCooldown = AttackCooldown;
        }
        Remove() {
            this.Body.remove();
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
    class Avatar {
        constructor(Attack,Health,Texture, ParentNode, DisplayName) {
            this.Health = Health;
            this.Attack = Attack;
            this.Texture = Texture;
            this.DisplayName = DisplayName;
            this.AttackCooldown = 0

            this.Body = CreateCharacterStone(Attack,Health,Texture);
            this.Body.classList.add("Selectable");
            this.Body.addEventListener("mousedown", ()=>SelectAttackingStone(this));
            ParentNode.appendChild(this.Body);
        }
        UpdateVisuals(Attack = this.Attack, Health = this.Health, Texture=this.Texture, DisplayName = PlayerDisplayName, AttackCooldown = this.AttackCooldown) {
            if (FakeDisplay && FakeDisplay.Class == this) {
                this.Body.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = Attack-FakeDisplay.AttackReduction;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health-FakeDisplay.HealthReduction;
            } else {
                this.Body.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = Attack;
                this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health;
            }
            this.Body.style.backgroundImage = "url('/images/Cards/"+Texture+".png')";
            this.DisplayName = DisplayName;
            this.AttackCooldown = AttackCooldown;
        }
        Remove() {
            this.Body.remove();
        }
    }
</script>