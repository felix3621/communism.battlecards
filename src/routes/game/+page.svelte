<style>
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
    }
    :global(#DisplayEnergy img) {
        height: 100%;
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
    :global(.CharacterStone) {
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
    #TimeDispaly {
        position: fixed;
        right:0px;
        top:50%;
        transform: translate(-20px,-70px)
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
<button id="EndTurn">EndTurn</button>
<h1 id="TimeDisplay">2:00</h1>
<div id="TopBar"><h1 style="margin: 0; text-align:center; color:white">Battle!</h1></div>

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

    var DisplayTitles = new Array();

    var FontSizeAdjusterArray = new Array();
    
    onMount(() => {
        var socket = new WebSocket(`wss://${window.location.host}/gamesocket`);

        // Event listener for when the connection is established
        socket.onopen = () => {
            console.log('Connected to server');
        };

        // Event listener for incoming messages from the server
        socket.onmessage = (event) => {
            /*
            if (event.PlayerInfo) {
                PlayerDisplayName = event.PlayerInfo.DisplayName;
                PlayerAvatar = event.PlayerInfo.Avatar;
                PlayerEnergy = event.PlayerInfo.Energy;
                if (event.PlayerInfo.title!= "")
                    DisplayTitles.push({Title:event.PlayerInfo.title,LifeTime:1});
                //TODO: Needs to change this
                PlayerOnField = event.PlayerInfo.Field;
                PlayerHand = event.PlayerInfo.Hand;
            }
            if (event.EnemyInfo) {
                EnemyDisplayName = event.EnemyInfo.DisplayName;
                EnemyAvatar = event.EnemyInfo.Avatar;
                EnemyHand = event.EnemyInfo.Hand;
                //TODO: Needs to change this
                EnemyOnField = event.EnemyInfo.Field;
                
            }
            if (event.TurnTime) {
                document.getElementById("TimeDisplay").innerHTML = event.TurnTime;
            }*/
            console.log(event);
        };

        // Event listener for when the connection is closed
        socket.onclose = () => {
            console.log('Connection closed');
        };

        // Event listener for errors
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        //Testing
        /*
        for (let i = 0; i < 3; i++) {
            PlayerOnField.push(new Stone(2,2,"MissingCharacter.png",document.getElementById("PlayerOnField")));
            PlayerOnField.push(new Stone(2,2,"MissingCharacter.png",document.getElementById("EnemyOnField")));
        }
        for (let i = 0; i < 10; i++) { // Give the player some cards!
            PlayerHand.push(new Card("Name","Description",4,2,5,"Bandit.png"));
            EnemyHand.push(new EnemyCard());
        }
        PlayerAvatar = new Stone(2,2,"BOB.png",document.getElementById("PlayerAvatar"));
        EnemyAvatar = new Stone(2,2,"Felix.png",document.getElementById("EnemyAvatar"));

        SetEnergyLevel(10);*/

        //Actual Commands
        SetAllFontSizeInArray(FontSizeAdjusterArray);
        window.addEventListener('resize', () => SetAllFontSizeInArray(FontSizeAdjusterArray));

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

    function CreateCharacterStone(Attack, Health, Texture) {
        //THE CharacterStone
        var CharacterStone = document.createElement("div");
        CharacterStone.classList.add("CharacterStone");
        CharacterStone.style.backgroundImage = "url('/images/Cards/"+Texture+"')";

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

    function SetEnergyLevel(Amount) {
        var EnergyHolder = document.getElementById("DisplayEnergy");
        for (let i = 0; i < EnergyHolder.children.length || i < Amount; i++) {
            if (i>= EnergyHolder.children.length && i < Amount) { // Create Child
                var EnergyCrystal = document.createElement("img");
                EnergyCrystal.src = "/images/EnergyIcon.png";
                document.getElementById("DisplayEnergy").appendChild(EnergyCrystal);
            } else if (i >= Amount) { // Remove Object
                EnergyHolder.children[i].remove();
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
        CardImage.style.backgroundImage = "url('/images/Cards/"+Texture+"')";
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
        constructor(Name,Description,Cost,Attack,Health,Texture) {
            this.Cost = Cost;
            this.Health = Health;
            this.Attack = Attack;
            this.Texture = Texture;
            this.Name = Name;
            this.Description = Description;

            this.Body = CreateEmptyCard();
            document.body.appendChild(this.Body);
            this.Body.classList.add("CardAnimation");
            this.Body.addEventListener('animationend', () => {
                // Add your code here to run when the animation is complete
                this.Body.remove();
                this.Body = CreateCard(Name,Description,Cost,Attack,Health,Texture);
                document.getElementById("PlayerHand").appendChild(this.Body);
                this.Body.classList.add("Selectable");

                setTimeout(function() {SetAllFontSizeInArray(FontSizeAdjusterArray)}, 100);
            });
        }
        UpdateInfo(Name,Description,Cost,Attack,Health,Texture) {
            this.Cost = Cost;
            this.Health = Health;
            this.Attack = Attack;
            this.Texture = Texture;
            this.Name = Name;
            this.Description = Description;
            if (this.Body.classList.includes("Card")) {
                this.Body.children[0].style.backgroundImage = "url('/images/Cards/"+Texture+"')";
                this.Body.children[2].children[0].innerHTML = Attack;
                this.Body.children[3].children[0].innerHTML = Health;
                this.Body.children[4].children[0].innerHTML = Cost;
                this.Body.children[5].children[0].innerHTML = Name;
                this.Body.children[6].children[0].innerHTML = Description;
                SetAllFontSizeInArray(FontSizeAdjusterArray);
            }
        }
        Remove() {
            this.Body.remove();
        }
    } 
    class Stone {
        constructor(Attack,Health,Texture, ParentNode, ) {
            this.Health = Health;
            this.Attack = Attack;
            this.Texture = Texture;

            this.Body = CreateCharacterStone(Attack,Health,Texture);
            this.Body.classList.add("Selectable");
            ParentNode.appendChild(this.Body);

            //this.UpdateVisuals(0,0);
        }
        UpdateVisuals(Attack = this.Health, Health = this.Health, Texture=this.Texture) {
            this.Body.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = Attack;
            this.Body.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health;
            this.Body.style.backgroundImage = "url('/images/Cards/"+Texture+"')";
        }
        Remove() {
            this.Body.remove();
        }
    }
    class EnemyCard {
        constructor() {
            this.Body = CreateEmptyCard();
            document.getElementById("EnemyHand").appendChild(this.Body);
            this.Body.classList.add("EnemyCardAnimation");
        }
    }
</script>