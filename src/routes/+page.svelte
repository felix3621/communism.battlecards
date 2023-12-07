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
    #CardDeck {
        position: absolute;
        bottom: 0px;
        top:0px;
        left:0px;
        right:0px;
        padding: 5%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        grid-template-rows: auto auto auto auto;
        grid-gap:10%;
        overflow-y: auto;
        overflow-x: hidden;
    }
        #CardDeck::-webkit-scrollbar {
        width: 10px;
    }

    #CardDeck::-webkit-scrollbar-thumb {
        background-color: rgb(0, 0, 0);
        border-radius: 5px;
        border: 2px solid rgb(75, 75, 75);
    }

    #CardDeck::-webkit-scrollbar-track {
        background-color: rgb(50, 50, 50);
        border-radius: 5px;
        border: 2px solid rgb(127,127,127);
    }
    #SettingsMenu {
        position: fixed;
        right: 0px;
        top:0px;
    }
    #SettingsMenu div:not(#SettingsCog) {
        position: absolute;
        top: 0px;
        right:0px;
        background-color: rgb(50, 50, 50);
        outline: 2px gray solid;
        padding: 5px;
        padding-top: 68px;
    }
    #SettingsCog {
        position: fixed;
        right:  -15px;
        top:    -20px;
        width: 50px;
        height:50px;
        background-color: rgb(50, 50, 50);
        padding: 5px 5px 5px 5px;
        border: 2 gray solid;
        margin-top: 5px;
        background-color: rgb(50, 50, 50);
        border-radius: 50%;
        border: 5px solid black;
        background-image: url("/images/settings.png");
        background-size: contain;
    }
    #SettingsCog:hover {
        filter: opacity(0.5);
    }

    #SettingsMenu a {
        color: white;
        cursor: pointer;
        text-decoration: none;
    }
    #SettingsMenu a:hover {
        color: rgb(150, 150, 150);
    }
    #SettingsMenu a:active {
        color: rgb(175, 175, 175);
    }
</style>
<h1 class="Title" style="margin: 0px;">Welcome to BattleCards!</h1>
<div class="EXP_Bar">
    <div class="EXP_FilLevel"></div>
</div>
<div id="SettingsMenu">
    <div id="SettingsDropDown" style="display: none;">
        <a href="/settings">Settings</a>
        <a on:click={() => logOut()}>Logout</a>
    </div>
    <div id="SettingsCog" on:click={() => {
        if(document.getElementById("SettingsDropDown").style.display=="none"){
            document.getElementById("SettingsDropDown").style.display="block";
        } else{
            document.getElementById("SettingsDropDown").style.display="none";
        }
    }}></div>
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
    var FontSizeAdjusterArray = new Array();

    onMount(async() => {
        const user = await fetch(window.location.origin+'/api/account/login', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        if (user.ok) {
            console.log(await user.json());
        } else {
            window.location.href = '/login';
        }
        SetExpFilLevel(100);
        for (let i = 0; i < 20; i++) {
            var Card = CreateCard("test","testtttttttttttttttt",10,10,10,"MissingCharacter.png");
            document.getElementById("CardDeck").appendChild(Card);
        }
        SetAllFontSizeInArray(FontSizeAdjusterArray);
        window.addEventListener('resize', () => SetAllFontSizeInArray(FontSizeAdjusterArray));
    })
    
    async function logOut() {
        console.log("Hi")
        let test = await fetch(window.location.origin+'/api/account/logout', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        window.location.href = '/login';
    }

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