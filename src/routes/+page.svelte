<style>
    .Title {
        position: fixed;
        left:50%;
        transform: translate(-50%,0);
        background-color: rgb(50, 50, 50);
        color: white;
        top:-25px;
        padding:35px 15px 15px 15px;
        border-radius: 25px;
        outline: 5px black solid;
        -webkit-text-stroke-width: 0.75px;
        -webkit-text-stroke-color: black;
    }
    .EXP_Bar{
        position: fixed;
        left:50%;
        transform: translate(-50%,0);
        background-color: rgb(50, 50, 50);
        color: white;
        top:68px;
        height:15px;
        width:325px;
        outline: 2px black solid;
        border-radius: 25px;
    }
    .EXP_FilLevel {
        position: fixed;
        width:0%;
        float:left;
        height: 100%;
        border-radius: 25px;
        background-color: rgb(50,150,255);
        transition: 2s;
    }
    #Panel2 {
        position: fixed;
        right:-25px;
        top:25%;
        left:50%;
        bottom: 5%;
        background-color: rgb(50, 50, 50);
        border-radius: 25px;
        outline: 5px black solid;
    }
    .PanelTitle {
        position: fixed;
        transform: translate(0,-45px);
        margin: 0px;
        text-align: center;
    }
    #TabItems {
        display: grid;
        grid-template-rows: auto auto auto;
        background-color: rgb(50, 50, 50);
        outline: 5px black solid;
        margin-right: 25px;
        width: 50px;
        height: 100%;
        float: right;
    }
    #TabItems div {
        width: 100%;
        background-color: black;
        aspect-ratio: 1/1;
    }
    #TabItems div:hover {
        filter: opacity(0.5);
    }
    #TabHolder {
        position: fixed;
        right:50px;
        top:25%;
        left:50%;
        bottom: 5%;
    }
    :global(.Card) {
        position: relative;
        aspect-ratio: 2.73/3.93;
    }
    :global(.Card p) {
        position: relative;
        margin: 0;
        color: black;
        text-align: center;
        left:50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: fit-content;
        height: fit-content;
        -webkit-text-stroke-width: 0.5px;
        -webkit-text-stroke-color: black;
        user-select: none;
        overflow: hidden;
        white-space: nowrap;
    }
    :global(.Card .CardImage) {
        position: absolute;
        background-image: url(/images/Cards/BanditBOBCharacter.png);
        width: 59%;
        aspect-ratio: 1.66/2.14;
        background-size: cover;
        left:50%;
        top:8%;
        transform: translate(-50%,0);
    }
    :global(.Card .CardFrame) {
        position: absolute;
        width: 100%;
        background-image: url("/images/CardFrame.png");
        height: 100%;
        background-size: cover;
    }
    :global(.Card .CardDMG) {
        position: absolute;
        background-image: url("/images/DMGIcon.png");
        width: 40%;
        aspect-ratio: 1/1;
        background-size: cover;
        bottom: 0px;
        transform: translate(-40%,20%);

    }
    :global(.Card .CardHealth) {
        position: absolute;
        background-image: url("/images/HealthIcon.png");
        width: 40%;
        aspect-ratio: 1/1;
        background-size: cover;
        bottom: 0px;
        right:0px;
        transform: translate(40%,20%);
    }
    :global(.Card .CardCost) {
        position: absolute;
        background-image: url("/images/EnergyIcon.png");
        width: 40%;
        aspect-ratio: 1/1;
        background-size: cover;
        transform: translate(-40%,-20%);
    }
    :global(.Card .CardName) {
        position: absolute;
        top:52%;
        left:21%;
        right:21%;
        bottom: 39%;
    }
    :global(.Card .CardDescription) {
        position: absolute;
        top:70%;
        left:21%;
        right:21%;
        bottom: 5%;
    }
    :global(.Card p1) {
        position: absolute;
        color: white;
        text-align: center;
        left:0px;
        right: 0px;
        top: 0px;
        bottom:  0px;
        user-select: none;
    }
    #CardDeck {
        position: absolute;
        bottom: 0px;
        top:0px;
        left:0px;
        right:0px;
        padding: 15px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        grid-template-rows: auto auto auto auto;
        grid-gap: 5%;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
<h1 class="Title" style="margin: 0px;">Welcome to BattleCards!</h1>
<div class="EXP_Bar">
    <div class="EXP_FilLevel"></div>
</div>

<div id="DisplayPlayer">
    <div class="PlayerProfileImage"></div>
    <div class="PlayerName"><p></p></div>
</div>
<!--Select Match and Player Avatar-->
<div id="Panel1">
</div>

<!--Select Deck and do other actions whit cards-->
<div id="Panel2">
    <h1 class="PanelTitle"><b>Card Deck</b></h1>
    <div id="TabItems">
        <div></div>
    </div>
    <div id="TabHolder">
        <div id="CardDeck">
        </div>
    </div>
</div>


<script>
    import { onMount } from "svelte";
    var Level = 1;
    var Exp = 0;

    onMount(async() => {
        const user = await fetch(window.location.origin+'/api/account/login', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	},
            body: JSON.stringify({
	    		username: "testuser1",
                password: "test",
	    	}),
        });
        if (user.ok) {
            console.log(await user.json());
        } else {
            console.warn("invalid credentials");
        }
        SetExpFilLevel(100);
        for (let i = 0; i < 20; i++) {
            var Card = CreateCard("","",0,0,0,"MissingCharacter.png");
            document.getElementById("CardDeck").appendChild(Card);
        }
        
    })

    function SetExpFilLevel(Level) {
        var Bar = document.getElementsByClassName("EXP_FilLevel");
        for (let i = 0; i < Bar.length; i++) {
            Bar[i].style.width = Level+"%";
        }
    }

    function CreateCard(Name, Description, Cost, Attack, Health, Texture) {
        //THE Card
        var Card = document.createElement("div");
        Card.classList.add("Card");

        //Character In the midle
        var CardImage = document.createElement("div");
        CardImage.classList.add("CardImage");
        CardImage.style.backgroundImage = "url(/images/Cards/"+Texture+");";
        Card.appendChild(CardImage);

        //Card Frame
        var CardFrame = document.createElement("div");
        CardFrame.classList.add("CardFrame");
        Card.appendChild(CardFrame);

        //CardDMG
        var CardDMG = document.createElement("div");
        CardDMG.classList.add("CardDMG");
        Card.appendChild(CardDMG);

        //Name Display
        var CardDMGText = document.createElement("p");
        CardDMGText.innerHTML = Attack;
        CardDMG.appendChild(CardDMGText);
        window.addEventListener('resize', () => SetFontSize(CardDMGText));

        //CardHealth
        var CardHealth = document.createElement("div");
        CardHealth.classList.add("CardHealth");
        Card.appendChild(CardHealth);

        //Name Display
        var CardHealthText = document.createElement("p");
        CardHealthText.innerHTML = Health;
        CardHealth.appendChild(CardHealthText);
        window.addEventListener('resize', () => SetFontSize(CardHealthText));

        //CardCost
        var CardCost = document.createElement("div");
        CardCost.classList.add("CardCost");
        Card.appendChild(CardCost);

        //Name Display
        var CardCostText = document.createElement("p");
        CardCostText.innerHTML = Cost;
        CardCost.appendChild(CardCostText);
        window.addEventListener('resize', () => SetFontSize(CardCostText));

        //CardName
        var CardName = document.createElement("div");
        CardName.classList.add("CardName");
        Card.appendChild(CardName);

        //Name Display
        var CardNameText = document.createElement("p1");
        CardNameText.innerHTML = Name;
        CardName.appendChild(CardNameText);
        window.addEventListener('resize', () => SetFontSize(CardNameText));

        //CardDescription
        var CardDescription = document.createElement("div");
        CardDescription.classList.add("CardDescription");
        Card.appendChild(CardDescription);

        //Name Display
        var CardDescriptionText = document.createElement("p1");
        CardDescriptionText.innerHTML = Description;
        CardDescriptionText.style.fontSize = "80%";
        CardDescription.appendChild(CardDescriptionText);
        window.addEventListener('resize', () => SetFontSize(CardDescriptionText));

        return Card;
    }
    function SetFontSize(Element) {
        var containerWidth = Element.parentNode.clientHeight;
        var textWidth = Element.scrollHeight;

        var fontSize = containerWidth / textWidth;
        Element.style.fontSize = `${fontSize}rem`;
    }
</script>