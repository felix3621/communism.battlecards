<style>
    #logo {
        position: fixed;
        top:0;
        left:0;
        background-color: rgb(50, 50, 50);
        border-radius: 0 0 25px 0;
        outline: 5px black solid;
        width: 350px;
        padding: 0 10px 7.5px 0;
    }
    #EXP_Bar{
        background-color: rgb(100, 100, 100);
        color: white;
        height:15px;
        width:150px;
        outline: 2px black solid;
        border-radius: 5px;
        float: left;
    }
    #EXP_FilLevel {
        position: relative;
        width:0%;
        float:left;
        height: 100%;
        border-radius: 5px;
        background-color: rgb(50,150,255);
        transition: 2s;
    }
    #gamePanel {
        position: fixed;
        left:10%;
        top:35%;
        right:60%;
        bottom: 45%;
    }
    
    #tournamentPanel {
        position: fixed;
        left:60%;
        top:35%;
        right:10%;
        bottom: 45%;
    }
    .panel {
        background-color: rgb(50, 50, 50);
        border-radius: 25px;
        outline: 5px black solid;
        width: 100%;
        height: 100%;
    }
    .content {
        width: 100%;
        height: 100%;
        top: -0;
    }
    #Panel2 {
        position: fixed;
        right:-7px;
        top:25%;
        width: 100px;
        bottom: 5%;
    }
    .PanelTitle {
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

    
    :global(.adminButton) {
        color: red;
        text-decoration: none;
    }
    :global(.adminButton:hover) {
        color: rgba(255,0,0,0.5);
    }

    :global(#SettingsMenu a:not(.adminButton)) {
        color: white;
        cursor: pointer;
        text-decoration: none;
    }
    :global(#SettingsMenu a:not(.adminButton):hover) {
        color: rgb(150, 150, 150);
    }
    :global(#SettingsMenu a:active) {
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
        width: 100%;
        height: 100%;
        border-radius: 25px 25px 0 0;
        font-size: 200%;
        font-weight: bolder;
        padding: 0;
    }
    #privateGame {
        width: 100%;
        height: 100%;
        font-size: 200%;
        font-weight: bolder;
        padding: 0;
    }
    #gameCode, #tournamentCode {
        width: 100%;
        height: 100%;
        font-size: 200%;
        font-weight: bolder;
        padding: 0;
        border-radius: 0 0 0 25px;
    }
    #JoinByCodeBtn, #JoinTournamentCodeBtn {
        width: 100%;
        height: 100%;
        font-size: 200%;
        font-weight: bolder;
        padding: 0;
        border-radius: 0 0 25px 0;
    }
    #createTournament {
        width: 100%;
        height: 100%;
        border-radius: 25px 25px 0 0;
        font-size: 200%;
        font-weight: bolder;
        padding: 0;
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
    #AvatarAbility {
        position: fixed;
        top:90%;
        left:25%;
        transform: translate(-50%,-50%);
        width: 10%;
        aspect-ratio: 1/1;
        background-color: #1f1e1e;
        border-radius: 50%;
        outline: 3px gray solid;
        background-size: cover;
    }
    #AvatarAbility div {
        position: absolute;
        top:0;
        right:0;
        aspect-ratio: 1/1;
        background-image: url('/images/EnergyIcon.png');
        transform: translate(30%,-50%);
        width: 50%;
        background-size: cover;
    }
    #AvatarAbility p {
        position: relative;
        width: fit-content;
        height: fit-content;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        margin: 0;
        color: black;
        text-align: center;
    }
    #DisplayAllAvatars {
        position: fixed;
        top:15%;
        right:5%;
        left:50%;
        bottom:5%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 0.3fr));
        grid-template-rows: repeat(auto-fit, minmax(100px, 0.3fr));   
        grid-gap:10px;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #414141;
        outline: 5px rgb(77, 77, 77) solid;
        border-radius: 25px;
    }
    :global(#SettingsDropDown) {
        display: grid;
        grid-template-columns: repeat(auto, 100%);
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
    #profile {
        background-color: rgb(50,50,50);
        position: fixed;
        top: 115px;
        left: 0;
        width: fit-content;
        height: fit-content;
        border: 5px solid black;
        padding: 10px 10px 10px 1px;
        border-radius: 0 10px 10px 0;
        color: white;
    }
    #profile p {
        margin: 0;
    }
    #pfp {
        height: 100%;
        aspect-ratio: 1/1;
        background-size: calc(100%);
        background-repeat: no-repeat;
        background-position: 0;
        border-radius: 50%;
        border: 5px solid black;
    }
    #level_display {
        float: left;
        margin-right: 10px;
    }
    #ResultPage {
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        left:0;
        top:0;
        right:0;
        bottom: 0;
    }
    #ResultTitle {
        position: fixed;
        transform: translate(-50%,-50%);
        top: 0;
        left: 50%;
        color: white;
        font-size: 500%;
    }
    #RewardCrate {
        position: fixed;
        transform: translate(-50%,-50%);
        top: 35%;
        left: 50%;
        background-image: url("/images/loot_crate.png");
        aspect-ratio: 1/1;
        width: 200px;
        background-size: contain;
        background-repeat: no-repeat;
    }
    :global(.CrateShake) {
        animation: 2s CrateBreak linear;
    }
    #RewardDisplay {
        position: fixed;
        top: 50%;
        transform: translate(-50%,-50%);
        left: 50%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px,200px));
        grid-column-gap: 10%;
        width: 50%;
    }
    :global(#RewardDisplay > div) {
        filter: drop-shadow(0 0 0.5rem crimson);
        min-height: 100px;
        min-width: 100px;
    }
    #ResultPage button {
        position: fixed;
        transform: translate(-50%,-50%);
        bottom: 25%;
        left: 50%;
        font-size: 200%;
    }
    :global(.XpDisplay) {
        background-color: #252525;
        border-radius: 15px;
        outline: 5px black solid;
    }
    :global(.XpDisplay h1) {
        position: absolute;
        left: 50%;
        top:50%;
        margin: 0;
        width: fit-content;
        transform: translate(-50%,-50%);
        text-align: center;
        color: rgb(0, 255, 0);
        filter: drop-shadow(0.5rem 0.5rem 4rem rgb(0,100,0));
    }
    @keyframes CrateBreak {
        0% {
            transform: translate(0%,0%) scale(1,1) rotate(0deg);
        }
        10% {
            transform: translate(30%,0%) scale(1.1,1) rotate(25deg);
        }
        30% {
            transform: translate(0%,30%) scale(1,1.1) rotate(-25deg);
        }
        40% {
            transform: translate(-10%,20%) scale(1.1,1.1) rotate(45deg);
        }
        60% {
            transform: translate(-20%,15%) scale(1,1.1) rotate(15deg);
        }
        70% {
            transform: translate(0%,15%) scale(1,1) rotate(0deg);
            filter: opacity(1);
        }
        97% {
            transform: translate(0%,0%) scale(3,3) rotate(0deg);
        }
        100% {
            transform: translate(0%,0%) scale(2,2) rotate(0deg);
            filter: opacity(0);
        }
    }
    #Chat {
        position: fixed;
        left: 0;
        bottom: 0px;
        width: 40%;
        height: 20%;
    }
    #Chat input{
        position: absolute;
        left: 0;
        bottom: 0;
        width: calc(100%);
        height: 20px;
        background-color: #1f1e1e;
        outline: 2px rgb(192, 192, 192) solid;
        color: white;
    }
    #MessagesDisplay{
        position: absolute;
        left: 0;
        bottom: 20px;
        width: 100%;
        top: 0;
        display: flex;
        flex-direction: column-reverse;
        overflow-x: hidden;
        overflow-y: scroll;
        background-color: #1f1e1e;
        outline: 5px black solid;
        border-radius: 0px 25px 0px 0px;
        color: white;
        padding-bottom: 5px;
    }
    :global(#MessagesDisplay p) {
        margin: 0;
        width: max-content;
        float: left;
        max-width: 100%;
    }
</style>
<img id="logo" src="images/BattlecardsLogo.png">
<div id="profile">
    <table>
        <tr>
            <td rowspan=2 style="aspect-ratio: 1/1;" id="pfp_row">
                <div id="pfp">

                </div>
            </td>
            <td>
                <p id="display_displayName" style="text-decoration: underline; font-weight: bold; font-size: 20px;"></p>
                <p id="display_userName" style="color:rgb(175,175,175)"></p>
            </td>
        </tr>
        <tr>
            <td>
                <div id="level_display"></div>
                <div id="EXP_Bar">
                    <div id="EXP_FilLevel"></div>
                </div>
            </td>
        </tr>
    </table>
</div>
<div id="SettingsMenu">
    <div id="SettingsDropDown" style="display: none;">
        <a on:click={() => logOut()}>Logout</a>
    </div>
    <div id="SettingsCog" on:click={() => {
        if(document.getElementById("SettingsDropDown").style.display=="none"){
            document.getElementById("SettingsDropDown").style.display="grid";
        } else{
            document.getElementById("SettingsDropDown").style.display="none";
        }
    }}></div>
</div>

<!--Select Match-->
<div id="gamePanel">
    <h1 class="PanelTitle" style="position: relative"><b>Game</b></h1>
    <div class="panel">
        <table class="content">
            <tr>
                <td colspan="2">
                    <button id="quickPlay" class="btn" on:click={() => window.location.href = "/game"}>Quick Play</button>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button id="privateGame" class="btn" on:click={() => window.location.href = "/game?private=true"}>Private Game</button>
                </td>
            </tr>
            <tr>
                <td style="width: 50%;">
                    <input type="text" placeholder="code" id="gameCode">
                </td>
                <td style="width: 50%;">
                    <button id="JoinByCodeBtn" class="btn" on:click={() => window.location.href = "/game?code="+encodeURIComponent(document.getElementById("gameCode").value)}>Join</button>
                </td>
            </tr>
        </table>
    </div>
</div>
<!--Select tournament-->
<div id="tournamentPanel">
    <h1 class="PanelTitle" style="position: relative"><b>Tournament</b></h1>
    <div class="panel">
        <table class="content">
            <tr>
                <td colspan="2">
                    <button class="btn" id="createTournament" on:click={() => window.location.href = "/game?tournament=new"}>New tournament</button>
                </td>
            </tr>
            <tr>
                <td style="width: 50%;">
                    <input type="text" placeholder="code" id="tournamentCode">
                </td>
                <td style="width: 50%;">
                    <button id="JoinTournamentCodeBtn" class="btn" on:click={() => window.location.href = "/game?tournament="+encodeURIComponent(document.getElementById("tournamentCode").value)}>Join</button>
                </td>
            </tr>
        </table>
    </div>
</div>

<!--Select Deck and do other actions whit cards-->
<div id="Panel2">
    <div class="Icon" id="DeckButton" on:click={()=>{document.getElementById("CardDeckPanel").style.display="block"; ShowDeck();}}></div>
    <div class="Icon" id="AvatarButton" on:click={()=>{document.getElementById("AvatarPanel").style.display="block"; UpdateAvatarsPanel();}}></div>
</div>
<div id="Chat">
    <div id="MessagesDisplay"></div>
    <input type="text" id="ChatInputFiled" on:keydown={MessagesSendOnEnter} placeholder="Type to text...">
</div>
<div id="AvatarPanel" style="display:none;">
    <button style="position: fixed;right:0;top:0;font-size:50px" class="btn" on:click={()=>document.getElementById("AvatarPanel").style.display="none"}>Back</button>
    <div id="SelectedAvatar"></div>
    <div id="AvatarAbility"><div><p>0</p></div></div>
    <div id="DisplayAllAvatars"></div>
</div>
<div id="CardDeckPanel" style="display:none;">
    <button style="position: fixed;right:0;top:0;font-size:50px" class="btn" on:click={()=>document.getElementById("CardDeckPanel").style.display="none"}>Back</button>
    <div id="CardDeck"></div>
</div>
<div id="InventoryPanel" style="display:none;">
    <button style="position: fixed;right:0;top:0;font-size:50px" class="btn" on:click={()=>document.getElementById("InventoryPanel").style.display="none"}>Back</button>
    <div id="Inventory"></div>
</div>
<div id="ResultPage" style="display: none;">
    <h1 id="ResultTitle">Title</h1>
    <div id="RewardCrate" style="display: none;"></div>
    <div id="RewardDisplay"></div>
    <button on:click={()=>{document.getElementById("ResultPage").style.display="none";fetch(window.location.origin+'/api/account/clearRewards', {method: 'POST',headers: {'Content-Type': 'application/json'}});}}>Okay</button>
</div>


<script>
    import { onMount } from "svelte";
    var Level = 1;
    var Exp = 0;
    var FontSizeAdjusterArray = new Array();
    var SelectedAvatar;
    var socket;
    var MessagesStored = new Array();

    async function updateProfilePicture() {
        var avatar_data = await (await fetch(window.location.origin+'/api/avatar/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })).json();
        document.getElementById("pfp_row").width = document.getElementById("pfp_row").offsetHeight+"px";
        document.getElementById("pfp").style.backgroundImage = 'url("/images/Cards/'+avatar_data.selected.Texture+'.png")';
    }
    function OppenRewardCrate(Rewards) {
        document.getElementById("ResultPage").style.display = "block";
        document.getElementById("ResultTitle").innerHTML = Rewards.won?"You Won!": "You Lost!";
        document.getElementById("RewardDisplay").innerHTML = "";
        
        //Create Animation + Reward Display
        document.getElementById("RewardCrate").style.display = "block";
        document.getElementById("RewardCrate").classList.add("CrateShake");
        document.getElementById("RewardCrate").addEventListener("animationend",()=>{
            document.getElementById("RewardCrate").classList.remove("CrateShake");
            document.getElementById("RewardCrate").style.display = "none";
            // Display Rewards
            var RewardDisplay = document.getElementById("RewardDisplay");
            var XpDisplay = document.createElement("div");
            XpDisplay.classList.add("XpDisplay");
            var XpText = document.createElement("h1");
            XpText.innerHTML = Rewards.xp + " XP";
            XpDisplay.appendChild(XpText);
            RewardDisplay.appendChild(XpDisplay);
            for (let i = 0; i < Rewards.cards.length; i++) {
                RewardDisplay.appendChild(CreateCard(Rewards.cards[i].Name,Rewards.cards[i].Description,Rewards.cards[i].Cost,Rewards.cards[i].Attack,Rewards.cards[i].Health,Rewards.cards[i].Texture));
            }
        });
    }
    function MessagesSendOnEnter(event) {
        if (event.key === 'Enter' && socket != null) {
            // Handle the Enter key press here
            socket.send(JSON.stringify({Text:document.getElementById("ChatInputFiled").value}))
            document.getElementById("ChatInputFiled").value = ""
        }

    };
    function CreateSocketConnection() {
        socket = new WebSocket(`wss://${window.location.host}/chatsocket`);

        // Event listener for when the connection is established
        socket.onopen = () => {
            console.log('Connected to server');
            document.getElementById("MessagesDisplay").addEventListener("keypress", MessagesSendOnEnter);
        };

        // Event listener for incoming messages from the server
        socket.onmessage = (event) => {
            var data = event.data;
            if (data) {
                data = JSON.parse(data);
                MessagesStored.push(data.PlayerMessage);
                while (MessagesStored.length>=100) {
                    MessagesStored.splice(0,1);
                }
                var MessageParent = document.getElementById("MessagesDisplay");
                for (let i = 0; i < MessagesStored.length || i < MessageParent.children.length; i++) {
                    if (i < MessagesStored.length && i >= MessageParent.children.length) {
                        let Text = document.createElement("p");
                        Text.innerHTML = MessagesStored[MessagesStored.length-1-i];
                        MessageParent.appendChild(Text);
                    } else if (i < MessagesStored.length && i < MessageParent.children.length) {
                        MessageParent.children[i].innerHTML = MessagesStored[MessagesStored.length-1-i];
                    } else {
                        MessageParent.children[i].remove();
                    }
                }
            }
        };

        // Event listener for when the connection is closed
        socket.onclose = (event) => {
            console.log('Connection closed', event);
        };

        // Event listener for errors
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    onMount(async() => {
        const user = await fetch(window.location.origin+'/api/account/login', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        if (user.ok) {
            let ud = await user.json()
            CreateSocketConnection();
            if (ud.rewards) {
                OppenRewardCrate(ud.rewards);
            }
            if (ud.admin) {
                let adminLink = document.createElement("a");
                adminLink.setAttribute("href","admin");
                adminLink.innerText = "Admin";
                adminLink.classList.add("adminButton");
                document.getElementById("SettingsDropDown").appendChild(adminLink);
            }
            if (ud.view) {
                let viewLink = document.createElement("a");
                viewLink.setAttribute("href","view");
                viewLink.innerText = "View";
                document.getElementById("SettingsDropDown").appendChild(viewLink);
            }
            if (ud.getAllCards) {
                let gac = document.createElement("a");
                gac.onclick = () => {
                    fetch(window.location.origin+'/api/cards/getAllCards', {
                        method: 'GET'
                    });
                }
                gac.innerText = "CARDS"
                document.getElementById("SettingsDropDown").appendChild(gac);
            }
            if (ud.getXp) {
                let gXp = document.createElement("a");
                gXp.onclick = async () => {
                    await fetch(window.location.origin+'/api/cards/getXp', {
                        method: 'GET'
                    });
                    window.location.reload();
                }
                gXp.innerText = "XP";
                document.getElementById("SettingsDropDown").appendChild(gXp);
            }
            document.getElementById("display_displayName").innerText = ud.display_name;
            document.getElementById("display_userName").innerText = ud.username;
            updateProfilePicture()
            SetExpFilLevel((ud.xp.xp/ud.xp.requiredXp)*100);
            document.getElementById("level_display").innerText = ud.xp.level
            CreateTooltipEvent(document.getElementById("EXP_Bar").parentNode, "Level: "+ud.xp.level, (ud.xp.requiredXp-ud.xp.xp)+" xp remaining for next level<br>Total xp: "+ud.xp.totalXp)
        } else {
            window.location.href = '/login';
        }
        
        SetAllFontSizeInArray(FontSizeAdjusterArray);
        window.addEventListener('resize', () => SetAllFontSizeInArray(FontSizeAdjusterArray));
        SelectedAvatar = CreateCharacterStone(0,0,"MissingCharacter");
        document.getElementById("SelectedAvatar").appendChild(SelectedAvatar);

        // Set ToolTips
        CreateTooltipEvent(document.getElementById("DeckButton"),"Set Deck", "Create Your Battle Ready Deck");
        CreateTooltipEvent(document.getElementById("AvatarButton"),"Select Avatar", "Select Avatar to Use");
        CreateTooltipEvent(document.getElementById("quickPlay"),"Quick Play", "Play Against Random People");
        CreateTooltipEvent(document.getElementById("privateGame"),"Create A Private Mtach", "Create A Private Match That People Have To Join Using A Game Code");
        CreateTooltipEvent(document.getElementById("JoinByCodeBtn"),"Join Private Battle", "Join Private Battle Using Game Code");
        CreateTooltipEvent(document.getElementById("createTournament"),"Create Tournament", "Create A Tournament That Can Be Joined By Using A Code");
        CreateTooltipEvent(document.getElementById("createTournament"),"Create Tournament", "Create A Tournament That Can Be Joined By Using A Code");
        CreateTooltipEvent(document.getElementById("JoinTournamentCodeBtn"),"Join Tournament", "Join Tournament And Have FUN");
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
        var Bar = document.getElementById("EXP_FilLevel");
        Bar.style.width = Level+"%";
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
        FontSizeAdjusterArray.push({Element:CharacterStoneDMGText,HeightFactor:1});

        //CardHealth
        var CharacterStoneHealth = document.createElement("div");
        CharacterStoneHealth.classList.add("CharacterStoneHealth");
        CharacterStone.appendChild(CharacterStoneHealth);

        //Health Display
        var CharacterStoneHealthText = document.createElement("p");
        CharacterStoneHealthText.innerHTML = Health;
        CharacterStoneHealth.appendChild(CharacterStoneHealthText);
        FontSizeAdjusterArray.push({Element:CharacterStoneHealthText,HeightFactor:1});

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
        FontSizeAdjusterArray.push({Element:CardDMGText,HeightFactor:1});
        if(Attack == null || Attack == 0) {
            CardDMG.style.filter = "opacity(0)";
        }
        
        //CardHealth
        var CardHealth = document.createElement("div");
        CardHealth.classList.add("CardHealth");
        Card.appendChild(CardHealth);

        //Health Display
        var CardHealthText = document.createElement("p");
        CardHealthText.innerHTML = Health;
        CardHealth.appendChild(CardHealthText);
        FontSizeAdjusterArray.push({Element:CardHealthText,HeightFactor:1});
        if(Health == null || Health == 0) {
            CardHealth.style.filter = "opacity(0)";
        }

        //CardCost
        var CardCost = document.createElement("div");
        CardCost.classList.add("CardCost");
        Card.appendChild(CardCost);

        //Cost Display
        var CardCostText = document.createElement("p");
        CardCostText.innerHTML = Cost;
        CardCost.appendChild(CardCostText);
        FontSizeAdjusterArray.push({Element:CardCostText,HeightFactor:1});

        //CardName
        var CardName = document.createElement("div");
        CardName.classList.add("CardName");
        Card.appendChild(CardName);

        //Name Display
        var CardNameText = document.createElement("p1");
        CardNameText.innerHTML = Name;
        CardName.appendChild(CardNameText);
        FontSizeAdjusterArray.push({Element:CardNameText, FullWidth:true});

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
                let HeightFactor = Array[i].HeightFactor != null ? Array[i].HeightFactor : 0.5;
                //var containerHeight = Element.parentNode.clientHeight;
                //var textHeight = Element.scrollHeight;

                var CharacterAreal = ((Element.parentNode.clientHeight*0.75*HeightFactor) * (Element.parentNode.clientWidth))/(100+(Element.innerHTML.length));

                //if Number(Element.style.fontSize) > 0 then use else 1, then multiply with fontSize

                //var scaleFactor = (containerHeight*0.50) / textHeight;

                //let fontSize = Number(Element.style.fontSize.slice(0, -3));
                
                //fontSize = (fontSize>0)?fontSize * (scaleFactor):scaleFactor;
                
                Element.style.fontSize = `${CharacterAreal}px`;
            }
        }
    }

    async function ShowDeck() {
        const deck = await fetch(window.location.origin+'/api/cards/getDeck', {
            method: 'GET',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });

        if (!deck.ok)
            window.location.reload();

        var Deck = await deck.json();
        console.log(Deck)

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
                    CreateTooltipEvent(CurrentChild, Deck[i].Name, Deck[i].Description+"<br>Cost: "+Deck[i].Cost);
                })(i);
            } else if (i < Deck.length && i < DeckParent.children.length) {
                CurrentChild = DeckParent.children[i];
                CurrentChild.children[0].style.backgroundImage = "url(/images/Cards/"+Deck[i].Texture+".png)";
                CurrentChild.children[2].children[0].innerHTML = Deck[i].Attack;
                CurrentChild.children[3].children[0].innerHTML = Deck[i].Health;
                CurrentChild.children[4].children[0].innerHTML = Deck[i].Cost;
                CurrentChild.children[5].children[0].innerHTML = Deck[i].Name;
                CurrentChild.children[6].children[0].innerHTML = Deck[i].Description;
                if(Deck[i].Attack == null || Deck[i].Attack == 0) {
                    CurrentChild.children[2].style.filter = "opacity(0)";
                } else {
                    CurrentChild.children[2].style.filter = "opacity(1)";
                }
                if(Deck[i].Health == null || Deck[i].Health == 0) {
                    CurrentChild.children[3].style.filter = "opacity(0)";
                } else {
                    CurrentChild.children[3].style.filter = "opacity(1)";
                }
                RemoveAllRefensesFromArray(CurrentChild,FontSizeAdjusterArray);
                CurrentChild = removeAllEventListeners(CurrentChild);
                (function(index) {
                    CurrentChild.addEventListener("click", ()=> {
                        GetCardFromInventory(index);
                    });
                    CreateTooltipEvent(CurrentChild, Deck[i].Name, Deck[i].Description+"<br>Cost: "+Deck[i].Cost);
                })(i);
                AddAllOfElementTypeToArray(CurrentChild,"p",FontSizeAdjusterArray,1);
                AddAllOfElementTypeToArray(CurrentChild,"p1",FontSizeAdjusterArray,null);
            }
            if (i>=Deck.length) {
                RemoveAllRefensesFromArray(DeckParent.children[i],FontSizeAdjusterArray);
                DeckParent.children[i].remove();
                i--;
            }
        }

        //Re add it if it suld exsist
        if (Deck.length<50) {
            if (!document.getElementById("NewCard")){
                var AddNewCard = document.createElement("div");
                AddNewCard.id = "NewCard";
                DeckParent.appendChild(AddNewCard);
                var AddButton = document.createElement("div");
                AddNewCard.appendChild(AddButton);
                AddNewCard.addEventListener("click",()=> {GetCardFromInventory(-1)});
                CreateTooltipEvent(AddNewCard,"Add A New Card","Add A New Card From Inventory To Deck");
            }
        }
        SetAllFontSizeInArray(FontSizeAdjusterArray);
    }
    var RemoveCard;
    //GetFromInventory 
    async function GetCardFromInventory(WhatIndexToReplace) {
        //Get Info
        var InventoryPanel = document.getElementById("InventoryPanel");
        InventoryPanel.style.display = "block";
        var InventoryParent = document.getElementById("Inventory");
        var inventory = await fetch(window.location.origin+'/api/cards/getInventory', {
            method: 'GET',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });

        if (!inventory.ok)
            window.location.reload();

        inventory = await inventory.json();
        //Remove The Current Card From Deck Element
        if (RemoveCard == null){
            RemoveCard = document.createElement("div");
            RemoveCard.id = "RemoveCard";
            InventoryParent.appendChild(RemoveCard);
            var RemoveButton = document.createElement("div");
            RemoveCard.appendChild(RemoveButton);
        }
        // Shuld The Remove Card be Visable
        if (WhatIndexToReplace != -1) {
            RemoveCard.style.display="block";
            RemoveCard = removeAllEventListeners(RemoveCard);
            document.getElementById("RemoveCard").addEventListener("click",()=> {AddToDeck(-1, WhatIndexToReplace);});
            CreateTooltipEvent(RemoveCard,"Remove Current Card");
        } else if (RemoveCard != null) {
            RemoveCard.style.display="none";
        }
        // Card Update / Create Loop
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
                    CreateTooltipEvent(CurrentChild, inventory[i].card.Name,inventory[i].card.Description+"<br>Cost: "+inventory[i].card.Cost);
                })(i);
            } else if (i < (InventoryParent.children.length-1) && i < inventory.length) {
                RemoveAllRefensesFromArray(InventoryParent.children[i+1],FontSizeAdjusterArray);
                CurrentChild = removeAllEventListeners(InventoryParent.children[i+1]);
                CurrentChild.children[0].style.backgroundImage = "url('/images/Cards/"+inventory[i].card.Texture+".png')";
                CurrentChild.children[2].children[0].innerHTML = inventory[i].card.Attack;
                CurrentChild.children[3].children[0].innerHTML = inventory[i].card.Health;
                CurrentChild.children[4].children[0].innerHTML = inventory[i].card.Cost;
                CurrentChild.children[5].children[0].innerHTML = inventory[i].card.Name;
                CurrentChild.children[6].children[0].innerHTML = inventory[i].card.Description;
                if(inventory[i].card.Attack == null || inventory[i].card.Attack == 0) {
                    CurrentChild.children[2].style.filter = "opacity(0)";
                } else {
                    CurrentChild.children[2].style.filter = "opacity(1)";
                }
                if(inventory[i].card.Health == null || inventory[i].card.Health == 0) {
                    CurrentChild.children[3].style.filter = "opacity(0)";
                } else {
                    CurrentChild.children[3].style.filter = "opacity(1)";
                }
                (function(index) {
                    CurrentChild.addEventListener("click", ()=> {
                        AddToDeck(index, WhatIndexToReplace);
                    });
                    CreateTooltipEvent(CurrentChild, inventory[index].card.Name,inventory[index].card.Description+"<br>Cost: "+inventory[index].card.Cost);
                })(i);
                AddAllOfElementTypeToArray(CurrentChild, "p",FontSizeAdjusterArray,1);
                AddAllOfElementTypeToArray(CurrentChild, "p1",FontSizeAdjusterArray);
                console.log(CurrentChild.parentNode.offsetHeight);
            }
            if (i>=inventory.length) {
                RemoveAllRefensesFromArray(InventoryParent.children[i+1],FontSizeAdjusterArray);
                InventoryParent.children[i+1].remove();
                i--;
            }
        }
        setTimeout(()=>{SetAllFontSizeInArray(FontSizeAdjusterArray);},100);
        
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
    function RemoveAllRefensesFromArray(Element, Array) {
        for (let i = 0; i < Array.length; i++) {
            if (Array.Element == Element) {
                Array.splice(Array.indexOf(Element),1);
            }
        }
        for (let i = 0; i < Element.children.length; i++) {
            RemoveAllRefensesFromArray(Element.children[i], Array);
        }
    }
    function AddAllOfElementTypeToArray(Element, ElementType, Array, HeightFactor = null) {
        if (Element.tagName.toLowerCase() === ElementType) {
            Array.push({Element:Element, HeightFactor:HeightFactor});
        }
        for (let i = 0; i < Element.children.length; i++) {
            AddAllOfElementTypeToArray(Element.children[i],ElementType, Array, HeightFactor);
        }
    }

    async function UpdateAvatarsPanel() {
        // Get All Avatars And The Players Avatar
        var Avatars = await fetch(window.location.origin+'/api/avatar/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!Avatars.ok)
            window.location.reload();

        SetAllFontSizeInArray(FontSizeAdjusterArray);
        Avatars = await Avatars.json();
        // Update The Avatar Display
        RemoveAllRefensesFromArray(SelectedAvatar,FontSizeAdjusterArray);
        SelectedAvatar = removeAllEventListeners(SelectedAvatar);
        UpdateStone(SelectedAvatar,Avatars.selected.Attack,Avatars.selected.Health,Avatars.selected.Texture,"Tank");
        CreateTooltipEvent(SelectedAvatar,Avatars.selected.Name,Avatars.selected.Description);
        AddAllOfElementTypeToArray(SelectedAvatar,"p",FontSizeAdjusterArray)
        // Update The Ability Stone
        if (Avatars.selected.AbilityStone) {
            document.getElementById("AvatarAbility").style.opacity = 1;
            RemoveAllRefensesFromArray(document.getElementById("AvatarAbility"),FontSizeAdjusterArray);
            removeAllEventListeners(document.getElementById("AvatarAbility"));
            document.getElementById("AvatarAbility").style.backgroundImage = "url('/images/Ability/"+Avatars.selected.AbilityStone.Texture+".png')";
            CreateTooltipEvent(document.getElementById("AvatarAbility"),Avatars.selected.AbilityStone.Name,Avatars.selected.AbilityStone.Description+"<br>Cost: "+Avatars.selected.AbilityStone.Cost,"/images/Ability/"+Avatars.selected.AbilityStone.Texture+".png");
            AddAllOfElementTypeToArray(document.getElementById("AvatarAbility"),"p",FontSizeAdjusterArray);
            document.getElementById("AvatarAbility").children[0].children[0].innerHTML = Avatars.selected.AbilityStone.Cost;
        } else {
            document.getElementById("AvatarAbility").style.opacity = 0;
        }


        var DisplayAllAvatarsParent = document.getElementById("DisplayAllAvatars");

        for (let i = 0; i < Avatars.avatars.length || i < DisplayAllAvatarsParent.children.length; i++) {
            if (i>= DisplayAllAvatarsParent.children.length && i < Avatars.avatars.length) {
                if (Avatars.avatars[i].Locked) {
                    var NewAvatar = document.createElement("div");
                    NewAvatar.style.backgroundImage = "url(/images/locked.png)";
                    NewAvatar.classList.add("CharacterStone");
                    NewAvatar.Locked = true;
                } else {
                    var NewAvatar = CreateCharacterStone(Avatars.avatars[i].Attack,Avatars.avatars[i].Health,Avatars.avatars[i].Texture, "Tank");
                    NewAvatar.Locked = false;
                    (function(index) {
                        NewAvatar.addEventListener("click",()=>SetAvatar(index));
                    })(i);
                }
                DisplayAllAvatarsParent.appendChild(NewAvatar);
                
                (function(index, NewAvatar) {
                    CreateTooltipEvent(NewAvatar,Avatars.avatars[i].Name,Avatars.avatars[i].Description)
                })(i, NewAvatar)
                
            } else if (i < Avatars.avatars.length) {
                if (!DisplayAllAvatarsParent.children[i].Locked && !Avatars.avatars.Locked)
                    UpdateStone(DisplayAllAvatarsParent.children[i], Avatars.avatars[i].Attack,Avatars.avatars[i].Health,Avatars.avatars[i].Texture, "Tank")
            } else {
                DisplayAllAvatarsParent.children[i].remove();
                i--;
            }
        }
        updateProfilePicture();
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

    function UpdateStone(Stone,Attack,Health,Texture, Type = null) {
        Stone.getElementsByClassName("CharacterStoneDMG")[0].children[0].innerHTML = Attack;
        Stone.getElementsByClassName("CharacterStoneHealth")[0].children[0].innerHTML = Health;
        if (Type != null && Type == "Tank") {
            Stone.style.backgroundImage = "url('/images/Cards/"+Texture+".png'), url(images/shield.png)";
        } else 
            Stone.style.backgroundImage = "url('/images/Cards/"+Texture+".png')";
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