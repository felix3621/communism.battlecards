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
    #DisplayEnergy img {
        height: 100%;
    }
    #MidleLine {
        position: fixed;
        width: 100%;
        top: 50%;
        transform: translate(0,-50%);
        left:0
    }
    #EnemyAvatar {
        position: fixed;
        left:50%;
        top:55px;
        transform: translate(-50%,0);
        background-image: url("/images/Cards/BanditBOBCharacter.png");
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
        background-image: url("/images/Cards/BanditBOBCharacter.png");
        width: 150px;
        max-width: 30%;
        max-height: 30%;
        aspect-ratio: 1.66/2.14;
        background-size: contain;
    }
    :global(#EnemyHand) {
        position: fixed;
        left:25%;
        bottom:30%;
        top:50%;
        right:25%;
        padding: 5px;
        display: grid;
        grid-template-rows: repeat(1, minmax(100px, 100%));;
        grid-template-columns: repeat(5, minmax(100px, 100px));
        grid-gap: 5%;
        place-items: center;
    }
    :global(.CharacterStone) {
    }
    
</style>
<hr id="MidleLine">
<div id="EnemyAvatar"></div>
<div id="PlayerAvatar"></div>
<div id="EnemyHand"></div>
<div id="PlayerHand"></div>
<div id="DisplayEnergy">
    <img src="/images/EnergyIcon.png">
    <img src="/images/EnergyIcon.png">
</div>
<div id="TopBar"><h1 style="margin: 0; text-align:center; color:white">Battle!</h1></div>

<script>
    import { onMount } from "svelte";

    var EnemyAvatar;
    var PlayerAvatar;
    var EnemyHand = 0;
    var PlayerHand = new Array();
    var EnemyOnField = new Array();
    var PlayerOnField = new Array();

    var PlayerEnergy = 4;
    var PlayerMaxEnergy = 4;

    var Timer = "2:00";

    var FontSizeAdjusterArray = new Array();
    
    onMount(() => {
        var socket = new WebSocket(`wss://${window.location.host}/gamesocket`);

        // Event listener for when the connection is established
        socket.onopen = () => {
            console.log('Connected to server');
        };

        // Event listener for incoming messages from the server
        socket.onmessage = (event) => {
            console.log(event)
        };

        // Event listener for when the connection is closed
        socket.onclose = () => {
            console.log('Connection closed');
        };

        // Event listener for errors
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        for (let i = 0; i < 4; i++) {
            var Card = CreateCharacterStone(10,10,"MissingCharacter.png");
            document.getElementById("EnemyHand").appendChild(Card);
        }
        var Card = CreateCharacterStone(10,10,"MissingCharacter.png");
        document.getElementById("EnemyHand").appendChild(Card);

        SetAllFontSizeInArray(FontSizeAdjusterArray);
        window.addEventListener('resize', () => SetAllFontSizeInArray(FontSizeAdjusterArray));
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
</script>