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
    #gamePanel {
        position: fixed;
        left:10%;
        top:40%;
        right:60%;
        bottom: 35%;
        background-color: rgb(50, 50, 50);
        border-radius: 25px;
        outline: 5px black solid;
    }
    #Panel2 {
        position: fixed;
        right:-7px;
        top:25%;
        width: 100px;
        bottom: 5%;
    }
    .PanelTitle {
        position: fixed;
        transform: translate(0,-45px);
        margin: 0px;
        text-align: center;
    }
    #CardDeck, #Inventory {
        position: absolute;
        bottom: 10%;
        top:10%;
        left:10%;
        right:10%;
        padding: 5%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 0.3fr));
        grid-template-rows: auto auto auto auto;
        grid-gap:10%;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: rgb(50, 50, 50);
        border-radius: 25px;
        border: 5px rgb(25,25,25) solid;
        
    }
    #CardDeckPanel, #InvontoryPanel, #AvatarPanel {
        position: absolute;
        bottom: 0px;
        top:0px;
        left:0px;
        right:0px;
        background-color: rgba(0, 0, 0, 1);
    }
    #CardDeck::-webkit-scrollbar, #Inventory::-webkit-scrollbar {
        width: 10px;
    }

    #CardDeck::-webkit-scrollbar-thumb, #Inventory::-webkit-scrollbar-thumb {
        background-color: rgb(0, 0, 0);
        border-radius: 5px;
        border: 2px solid rgb(75, 75, 75);
    }

    #CardDeck::-webkit-scrollbar-track, #Inventory::-webkit-scrollbar-track {
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
    .btn {
        border: 2px solid black;
        background-color: #7f7f7f;
        color: white;
        cursor:pointer;
    }
    .btn:hover {
        background-color: #999999;
    }
    .btn:active {
        background-color: #b3b3b3;
    }
    #quickPlay {
        width: 95%;
        margin-left: 2.5%;
        margin-top: 2.5%;
        height: 30%;
        transform: translate(0,-37.5px);
        border-radius: 25px 25px 0 0;
        font-size: 200%;
        font-weight: bolder;
        padding: 0;
    }
    #privateGame {
        width: 95%;
        margin-left: 2.5%;
        margin-top: 1%;
        height: 30%;
        transform: translate(0,-37.5px);
        font-size: 200%;
        font-weight: bolder;
        padding: 0;
    }
    .joinByCode {
        width: 95%;
        margin-left: 2.5%;
        height: 30%;
        transform: translate(0,-37.5px);
        font-size: 200%;
        font-weight: bolder;
        padding: 0;
        overflow: hidden;
    }
    .joinByCode *{
        width: 45%;
        height: 100%;
        font-size: 125%;
    }
    .joinByCode input {
        padding: 0;
        border-radius: 0 0 0 25px;
    }
    .joinByCode button {
        position: fixed;
        margin-left: 10%;
        border-radius: 0 0 25px 0;
    }
    .Icon {
        aspect-ratio: 1/1;
        width:100px;
    }
    #DeckButton {
        background-image: url(images/DeckIcon.png);
        background-size: cover;
        cursor:pointer;
    }
    #AvatarButton {
        background-image: url(images/AvatarIcon.png);
        background-size: cover;
        cursor:pointer;
    }
    .Icon:hover {
        filter: opacity(0.95);
    }
    :global(#NewCard,#RemoveCard) {
        background-color: #414141;
        border: 4px black solid;
        border-radius: 15px;
        aspect-ratio: 2.73/3.93;
    }
    :global(#NewCard div) {
        background-image: url(images/plus.png);
        background-size: cover;
        aspect-ratio: 1/1;
        width: 50%;
        margin-top: 50%;
        margin-left: 50%;
        transform: translate(-50%,-5%);
        pointer-events: none;
        
    }
    :global(#RemoveCard div) {
        background-image: url(images/minus.png);
        background-size: cover;
        aspect-ratio: 1/1;
        width: 50%;
        margin-top: 50%;
        margin-left: 50%;
        transform: translate(-50%,-5%);
        pointer-events: none;
    }
    :global(#NewCard:hover) {
        filter: opacity(0.5);
        cursor: pointer;
    }
    :global(#RemoveCard:hover) {
        filter: opacity(0.5);
        cursor: pointer;
    }
    :global(.ClicableCard:hover) {
        filter: opacity(0.60);
        cursor: pointer;
    }
    #SelectedAvatar {
        position: fixed;
        top:50%;
        left:25%;
        transform: translate(-50%,-50%);
        width: 25%;
    }
    #DisplayAllAvatars {
        position: fixed;
        top:15%;
        right:5%;
        left:50%;
        bottom:5%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 0.3fr));
        grid-template-rows: auto auto auto auto;    
        grid-gap:10%;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #414141;
        outline: 5px rgb(77, 77, 77) solid;
        border-radius: 25px;
    }
    #tournamentPanel {
        position: fixed;
        left:60%;
        top:40%;
        right:10%;
        bottom: 35%;
        background-color: rgb(50, 50, 50);
        border-radius: 25px;
        outline: 5px black solid;
    }
    #createTournament {
        width: 95%;
        margin-left: 2.5%;
        margin-top: 2.5%;
        height: 30%;
        transform: translate(0,-37.5px);
        border-radius: 25px 25px 0 0;
        font-size: 200%;
        font-weight: bolder;
        padding: 0;
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
<!--Select Match-->
<div id="gamePanel">
    <h1 class="PanelTitle" style="position: relative"><b>Game</b></h1>
    <button id="quickPlay" class="btn" on:click={() => window.location.href = "/game"}>Quick Play</button>
    <button id="privateGame" class="btn" on:click={() => window.location.href = "/game?private=true"}>Private Game</button>
    <div class="joinByCode" id="gameCode">
        <input type="text" placeholder="Code">
        <button class="btn" on:click={() => window.location.href = "/game?code="+encodeURIComponent(document.getElementById("gameCode").children[0].value)}>Join</button>
    </div>
</div>
<!--Select tournament-->
<div id="tournamentPanel">
    <h1 class="PanelTitle" style="position: relative"><b>Tournament</b></h1>
    <button class="btn" id="createTournament" on:click={() => window.location.href = "/game?tournament=new"}>New tournament</button>
    <div class="joinByCode" style="position: absolute; bottom: -17.5%; " id="tournamentCode">
        <input type="text" placeholder="Code">
        <button class="btn" on:click={() => window.location.href = "/game?tournament="+encodeURIComponent(document.getElementById("tournamentCode").children[0].value)}>Join</button>
    </div>
</div>

<!--Select Deck and do other actions whit cards-->
<div id="Panel2">
    <div class="Icon" id="DeckButton" on:click={()=>{document.getElementById("CardDeckPanel").style.display="block"; ShowDeck();}}></div>
    <div class="Icon" id="AvatarButton" on:click={()=>{document.getElementById("AvatarPanel").style.display="block"; UpdateAvatarsPanel();}}></div>
</div>
<div id="AvatarPanel" style="display:none;">
    <button style="position: fixed;right:0;top:0;font-size:50px" class="btn" on:click={()=>document.getElementById("AvatarPanel").style.display="none"}>X</button>
    <div id="SelectedAvatar"></div>
    <div id="DisplayAllAvatars"></div>
</div>
<div id="CardDeckPanel" style="display:none;">
    <button style="position: fixed;right:0;top:0;font-size:50px" class="btn" on:click={()=>document.getElementById("CardDeckPanel").style.display="none"}>X</button>
    <div id="CardDeck"></div>
</div>
<div id="InventoryPanel" style="display:none;">
    <button style="position: fixed;right:0;top:0;font-size:50px" class="btn" on:click={()=>document.getElementById("InventoryPanel").style.display="none"}>X</button>
    <div id="Inventory"></div>
</div>


<script>
    import { onMount } from "svelte";
    var Level = 1;
    var Exp = 0;
    var FontSizeAdjusterArray = new Array();
    var SelectedAvatar;

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
        SetAllFontSizeInArray(FontSizeAdjusterArray);
        window.addEventListener('resize', () => SetAllFontSizeInArray(FontSizeAdjusterArray));
        SelectedAvatar = CreateCharacterStone(0,0,"MissingCharacter");
        document.getElementById("SelectedAvatar").appendChild(SelectedAvatar);
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

    async function ShowDeck() {
        const deck = await fetch(window.location.origin+'/api/cards/getDeck', {
            method: 'GET',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        var Deck = await deck.json();
        console.log(Deck);

        //Remove the add new card from the end if it exsist
        var newCardElementToRemove = document.getElementById("NewCard");
        if (newCardElementToRemove) 
            newCardElementToRemove.remove();
        
        var DeckParent = document.getElementById("CardDeck");
        for (let i = 0; i < Deck.length || i < DeckParent.children.length; i++) {
            var CurrentChild;
            if (i>= DeckParent.children.length && i < Deck.length) {
                CurrentChild = CreateCard(Deck[i].Name,Deck[i].Description,Deck[i].Cost,Deck[i].Attack,Deck[i].Health,Deck[i].Texture);
                CurrentChild.classList.add("ClicableCard");
                DeckParent.appendChild(CurrentChild);
                (function(index) {
                    CurrentChild.addEventListener("click", ()=> {
                        GetCardFromInventory(index);
                });
                })(i);
            } else if (i < Deck.length && i < DeckParent.children.length) {
                CurrentChild = DeckParent.children[i];
                CurrentChild.children[0].style.backgroundImage = "url('/images/Cards/"+Deck[i].Texture+".png')";
                CurrentChild.children[2].children[0].innerHTML = Deck[i].Attack;
                CurrentChild.children[3].children[0].innerHTML = Deck[i].Health;
                CurrentChild.children[4].children[0].innerHTML = Deck[i].Cost;
                CurrentChild.children[5].children[0].innerHTML = Deck[i].Name;
                CurrentChild.children[6].children[0].innerHTML = Deck[i].Description;
            }
            if (i>=Deck.length) {
                DeckParent.children[i].remove();
                i--;
            }
        }

        //Re add it if it suld exsist
        if (Deck.length<20) {
            console.log(document.getElementById("NewCard"));
            if (!document.getElementById("NewCard")){
                var AddNewCard = document.createElement("div");
                AddNewCard.id = "NewCard";
                DeckParent.appendChild(AddNewCard);
                var AddButton = document.createElement("div");
                AddNewCard.appendChild(AddButton);
                AddNewCard.addEventListener("click",()=> {GetCardFromInventory(-1)});
            }
        }
        SetAllFontSizeInArray(FontSizeAdjusterArray);
    }

    //GetFromInventory 
    async function GetCardFromInventory(WhatIndexToReplace) {
        var InventoryPanel = document.getElementById("InventoryPanel");
        InventoryPanel.style.display = "block";
        var InventoryParent = document.getElementById("Inventory");

        var inventory = await fetch(window.location.origin+'/api/cards/getInventory', {
            method: 'GET',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        inventory = await inventory.json();
        if (!document.getElementById("RemoveCard")){
             var RemoveCard = document.createElement("div");
             RemoveCard.id = "RemoveCard";
            InventoryParent.appendChild(RemoveCard);
            var RemoveButton = document.createElement("div");
            RemoveCard.appendChild(RemoveButton);
            
        }
        removeAllEventListeners(document.getElementById("RemoveCard"))
        document.getElementById("RemoveCard").addEventListener("click",()=> {AddToDeck(-1, WhatIndexToReplace);});
        for (let i = 0; i < inventory.length || i < (InventoryParent.children.length-1); i++) {
            var CurrentChild;
            if (i>= (InventoryParent.children.length-1) && i < inventory.length) {
                CurrentChild = CreateCard(inventory[i].card.Name,inventory[i].card.Description,inventory[i].card.Cost,inventory[i].card.Attack,inventory[i].card.Health,inventory[i].card.Texture);
                CurrentChild.classList.add("ClicableCard");
                InventoryParent.appendChild(CurrentChild);
                (function(index) {
                    CurrentChild.addEventListener("click", ()=> {
                    AddToDeck(index, WhatIndexToReplace);
                });
                })(i);
            } else if (i < (InventoryParent.children.length-1) && i < inventory.length) {
                CurrentChild = removeAllEventListeners(InventoryParent.children[i+1]);
                CurrentChild.children[0].style.backgroundImage = "url('/images/Cards/"+inventory[i].card.Texture+".png')";
                CurrentChild.children[2].children[0].innerHTML = inventory[i].card.Attack;
                CurrentChild.children[3].children[0].innerHTML = inventory[i].card.Health;
                CurrentChild.children[4].children[0].innerHTML = inventory[i].card.Cost;
                CurrentChild.children[5].children[0].innerHTML = inventory[i].card.Name;
                CurrentChild.children[6].children[0].innerHTML = inventory[i].card.Description;
                (function(index) {
                    CurrentChild.addEventListener("click", ()=> {
                    AddToDeck(index, WhatIndexToReplace);
                });
                })(i);
            }
            if (i>=inventory.length) {
                InventoryParent.children[i+1].remove();
                i--;
            }
        }
        SetAllFontSizeInArray(FontSizeAdjusterArray);
    }

    async function AddToDeck(index, WhatIndexToReplace) {
        await fetch(window.location.origin+'/api/cards/addToDeck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                WhatItemIndex:index,
                WhatIndexToReplace: WhatIndexToReplace
            })
        });
        document.getElementById("InventoryPanel").style.display = "none";
        ShowDeck();
    }
    // Remove all event listeners from an element
    function removeAllEventListeners(element) {
        // Clone the element to remove all its events
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        return newElement;
    }

    async function UpdateAvatarsPanel() {
        var Avatars = await fetch(window.location.origin+'/api/avatar/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        Avatars = await Avatars.json()
        console.log(Avatars);
        UpdateStone(SelectedAvatar,Avatars.selected.Attack,Avatars.selected.Health,Avatars.selected.Texture);
        var DisplayAllAvatarsParent = document.getElementById("DisplayAllAvatars");

        for (let i = 0; i < Avatars.avatars.length || i < DisplayAllAvatarsParent.children.length; i++) {
            if (i>= DisplayAllAvatarsParent.children.length && i < Avatars.avatars.length) {
                var NewAvatar = CreateCharacterStone(Avatars.avatars[i].Attack,Avatars.avatars[i].Health,Avatars.avatars[i].Texture);
                DisplayAllAvatarsParent.appendChild(NewAvatar);
                (function(index) {
                    NewAvatar.addEventListener("click",()=>SetAvatar(index));
                })(i);
            } else if (i < Avatars.avatars.length) {
                UpdateStone(DisplayAllAvatarsParent.children[i], Avatars.avatars[i].Attack,Avatars.avatars[i].Health,Avatars.avatars[i].Texture)
            } else {
                DisplayAllAvatarsParent.children[i].remove();
                i--;
            }
        }
    }
    async function SetAvatar(index) {
        console.log("SetAvatar",index);
        await fetch(window.location.origin+'/api/avatar/select', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newCard:index
            })
        });
        UpdateAvatarsPanel();
    }

    function UpdateStone(Stone,Attack,Health,Texture) {
        Stone.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = Attack;
        Stone.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health;
        Stone.style.backgroundImage = "url('/images/Cards/"+Texture+".png')";
    }
</script>