<style>
    #Background {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-image: url(/images/Background0.png);
        background-size: contain;
        pointer-events: none;
    }
    #logo {
        position: fixed;
        top:0;
        left:0;
        background-color: rgb(50, 50, 50);
        border-radius: 0 0 25px 0;
        outline: 5px black solid;
        width: 350px;
        padding: 0 10px 7.5px 0;
        cursor: pointer;
    }
    #adminConfig {
        width: 100%;
        height: 87.5%;
        position: fixed;
        top: 12.5%;
        left: 0;
    }
    #adminConfig > tr > td {
        padding: 2.5%
    }
    .panel {
        border: 5px solid black;
        width: 100%;
        height: 100%;
        border-radius: 25px;
        background-color: rgb(50, 50, 50);
        overflow: auto;
    }
    .panel .title {
        width: 100%;
        margin: 0;
        height: 5%;
        font-size: 200%;
        text-align: center;
        color: white;
    }
    .panel .content {
        width: 100%;
        height: 95%;
        overflow-y: auto;
        overflow-x: hidden;
    }
    :global(.userElement) {
        width: 100%;
        height: fit-content;
        background-color: rgb(50, 50, 50);
        transition: 0.25s;
        color: white;
        cursor: pointer;
    }
    :global(.userElement p) {
        margin: 0;
    }
    :global(.userElement:hover) {
        filter: brightness(125%);
    }
    :global(.userElement > table) {
        width: 100%;
    }
    :global(.userElement > table:first-child) {
        height: 66.7%;
    }
    :global(.userElement > table:last-child) {
        height: 33.3%;
    }
    #DU_title {
        height: calc(15% + 25px);
        border-bottom: 5px solid black;
    }
    #DU_avatar {
        width: 15vw;
        aspect-ratio: 3/4;
        margin-left: 50%;
        transform: translate(-50%,0);
    }
    :global(#DU_avatarList) {
        width: 100%;
        height: fit-content;
        display: grid;
        grid-template-columns: repeat(auto-fit,calc(7vw));
        border-top: 2.5px solid black;
        border-bottom: 5px solid black;
    }
    :global(#DU_avatarList .CharacterStone) {
        transition: 0.25s;
    }
    :global(#DU_avatarList .CharacterStone:hover) {
        filter: brightness(125%);
    } 
    #DU_xp {
        transform: translate(-50%,0);
        margin-left: 50%;
        width: fit-content;
    }
    :global(#DU_xp p) {
        margin: 0;
        text-align: center;
        color: white;
    }
    .contentHeader {
        border-top: 5px solid black;
        border-bottom: 2.5px solid black;
        text-align: center;
        color: white;
        margin: 0;
    }
    .DU_cardContainer {
        display: grid;
        grid-template-columns: repeat(auto-fit,8.5vw);
        padding: 2.5%;
        grid-gap: 2vw;
    }
    :global(#options) {
        width: fit-content;
        border: 5px solid black;
        border-radius: 15px;
        position: fixed;
        overflow: hidden;
    }
    :global(#options *) {
        color: white;
        width: 100%;
        cursor: pointer;
        transition: 0.25s;
        background-color: rgb(100,100,100);
    }
    :global(#options *:hover) {
        background-color: rgb(60,60,60);
        color: rgb(175,175,175)
    }
    :global(#NewCard) {
        background-color: #414141;
        border: 4px black solid;
        border-radius: 15px;
        aspect-ratio: 2.73/3.93;
    }
    :global(#NewCard div) {
        background-image: url(/images/plus.png);
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
    :global(.selectCard) {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: black;
    }
    :global(.selectCard > div:not(.cancel)) {
        position: fixed;
        left: 10%;
        top: 10%;
        right: 10%;
        bottom: 10%;
        background-color: rgb(50, 50, 50);
        border: 5px solid rgb(25,25,25);
        border-radius: 50px 0 0 50px;
        overflow: auto;
        padding: 2.5%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 0.4fr));
        grid-gap: 5%
    }
    :global(.selectCard > div.cancel) {
        position: fixed;
        bottom: 5%;
        left: 50%;
        transform: translate(-50%,50%);
        width: fit-content;
        cursor: pointer;
        background-color: rgb(100,100,100);
        border: 2.5px solid rgb(25,25,25);
        border-radius: 10px;
        padding: 10px;
        color: white;
    }
    :global(.CharacterStone, .Card) {
        cursor: pointer;
    }
    :global(#DU_inventory table) {
        margin-left: 50%;
        transform: translate(-50%, 0);
    }
    :global(#DU_inventory td button) {
        width: 100%;
    }
    :global(#DU_inventory td input) {
        width: calc(100% - 8px);
    }
    #DU_properties {
        color: white;
        padding-bottom: 5%;
    }
    :global(#DU_properties p) {
        margin:0;
        float: left;
    }
    :global(#DU_properties > * > div) {
        margin-left:20px;
    }
    :global(#DU_properties > * > div div) {
        margin-left:10px;
    }
    :global(#reset) {
        background-color: rgb(100,100,100);
        outline:0;
        border:2.5px solid black;
        padding:2.5px 5px 2.5px 5px;
        border-radius:10px;
        color:white;
        transition: 0.1s;
    }
    :global(#reset:hover) {
        background-color: rgb(125,125,125);
    }
    :global(#reset:active) {
        background-color: rgb(75,75,75);
    }
    :global(#DU_danger_zone > *) {
        width: 45%;
        float: left;
        padding: 2.5%
    }
    :global(#DU_danger_zone > * > *) {
        margin-left: 50%;
        transform: translate(-50%,0)
    }
    #configError {
        width: 100%;
        text-align: center;
        color: red;
    }
    #configEditor {
        height: auto;
        min-height: 50px;
        width: 100%;
    }
    #configSave {
        margin-left: 50%;
        transform: translate(-50%,0)
    }
</style>
<div id="Background">

</div>
<img id="logo" src="/images/BattlecardsLogo.png" on:click={()=>window.location.href="/"}>

<table id="adminConfig">
    <tr>
        <td adminWidth="33.3%" rootWidth="25%" class="widthAdjust">
            <div class="panel">
                <p class="title"><b>Users</b></p>
                <div class="content" id="userList"></div>
            </div>
        </td>
        <td adminWidth="66.7%" rootWidth="50%" class="widthAdjust">
            <div class="panel">
                <p class="title" id="DU_title"></p>
                <div class="content" style="height:calc(85% - 30px)">
                    <div id="DU_avatar"></div>
                    <div id="DU_avatarList"></div>
                    <div id="DU_xp"></div>
                    <p class="contentHeader">Deck:</p>
                    <div id="DU_deck" class="DU_cardContainer"></div>
                    <p class="contentHeader">Inventory:</p>
                    <div id="DU_inventory" class="DU_cardContainer"></div>
                    <p class="contentHeader">Raw:</p>
                    <div id="DU_properties"></div>
                    <p class="contentHeader RootLocked" style="color: red;font-weight: bold">Danger Zone:</p>
                    <div class="RootLocked" id="DU_danger_zone"></div>
                </div>
            </div>
        </td>
        <td class="RootLocked" style="width: 25%;">
            <div class="panel">
                <p class="title"><b>Config</b></p>
                <div class="content">
                    <div id="configError"></div>
                    <textarea id="configEditor" oninput="this.style.height = 'auto';this.style.height = (this.scrollHeight + 2) + 'px';"></textarea>
                    <button id="configSave">Save</button>
                </div>
            </div>
        </td>
    </tr>
</table>

<script>
    import { onMount } from "svelte";

    var cards;
    var avatars;

    var displayedUser;

    var userList; 
    var FontSizeArray = new Array();

    var self;

    var settings;

    function createOptions(element, ...options) {

        element.setAttribute("optionsClick", true)

        element.onclick = (e) => {
            if (document.getElementById("options"))
                document.getElementById("options").remove();

            let menu = document.createElement("div");
            menu.id = "options";

            for (let i = 0; i < options.length; i++) {
                let element = document.createElement("div");
                element.onclick = () => {
                    document.getElementById("options").remove();
                    options[i].func();
                }
                element.innerHTML = options[i].name;

                menu.appendChild(element);
            }

            menu.style.left = e.pageX+"px";
            menu.style.top = e.pageY+"px";

            document.body.appendChild(menu);
        }
    }

    function selectCard(then) {
        let background = document.createElement("div");
        background.classList.add("selectCard");

        let container = document.createElement("div");
        for (let i = 0; i < cards.length; i++) {
            let element = CreateCard(cards[i].Name, cards[i].Description, cards[i].Cost, cards[i].Attack, cards[i].Health, cards[i].Texture)
            element.onclick = () => {
                document.getElementsByClassName("selectCard")[0].remove()
                then(i)
            }
            container.appendChild(element)
        }
        background.appendChild(container);

        let cancel = document.createElement("div");
        cancel.classList.add("cancel");
        cancel.innerText = "Cancel";
        cancel.onclick = () => {
            document.getElementsByClassName("selectCard")[0].remove()
        }
        background.appendChild(cancel);

        document.body.appendChild(background);
        SetAllFontSizeInArray(FontSizeArray);
    }

    function addDeckCard(index) {
        selectCard(async (i) => {
            displayedUser.deck = [
                ...displayedUser.deck.slice(0, index),
                i,
                ...displayedUser.deck.slice(index)
            ]

            await fetch(window.location.origin+'/api/admin/setDeck', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    user: displayedUser.username,
                    deck: displayedUser.deck
                })
            
            });
            update();
        });
    }

    function addInventoryCard(index) {
        selectCard(async (i) => {
            displayedUser.inventory = [
                ...displayedUser.inventory.slice(0, index),
                i,
                ...displayedUser.inventory.slice(index)
            ]

            await fetch(window.location.origin+'/api/admin/setInventory', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: displayedUser.username,
                    inventory: displayedUser.inventory
                })

            });
            update();
        });
    }

    function changeDeckCard(index) {
        selectCard(async (i) => {
            displayedUser.deck = [
                ...displayedUser.deck.slice(0, index),
                i,
                ...displayedUser.deck.slice(index+1)
            ]

            await fetch(window.location.origin+'/api/admin/setDeck', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    user: displayedUser.username,
                    deck: displayedUser.deck
                })
            
            });
            update();
        });
    }

    function changeInventoryCard(index) {
        selectCard(async (i) => {
            displayedUser.inventory = [
                ...displayedUser.inventory.slice(0, index),
                i,
                ...displayedUser.inventory.slice(index+1)
            ]

            await fetch(window.location.origin+'/api/admin/setInventory', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: displayedUser.username,
                    inventory: displayedUser.inventory
                })

            });
            update();
        });
    }

    function updateDisplayedUser() {
        if (displayedUser) {
            document.getElementById("DU_title").innerHTML = `
                <input style='text-align:center;' value='`+displayedUser.display_name+`'>
                <br>
                <i style='color: rgb(175,175,175'>`+displayedUser.username+`</i>
                <br>
            `;
            document.getElementById("DU_title").children[0].onblur = async () => {
                await fetch(window.location.origin+'/api/admin/setDisplayName', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({
                        user: displayedUser.username,
                        displayName: document.getElementById("DU_title").children[0].value
                    })
                });
                update()
            }
            let resetUserBtn = document.createElement("button");
            resetUserBtn.id = "reset";
            CreateTooltipEvent(resetUserBtn, "Reset account", "Hold <code>shift</code> and <code>ctrl</code> while clicking to reset user");
            resetUserBtn.innerText = "Reset";
            resetUserBtn.onclick = async e => {
                if (!e.shiftKey || !e.ctrlKey)
                    return

                let newUser = await(await fetch(window.location.origin+'/api/admin/resetUser', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({
                        user: displayedUser.username
                    })
                })).json()
                update()
            }
            document.getElementById("DU_title").appendChild(resetUserBtn);
            
            document.getElementById("DU_avatar").innerHTML = ""
            document.getElementById("DU_avatar").appendChild(CreateCharacterStone(avatars[displayedUser.avatar].Attack, avatars[displayedUser.avatar].Health, avatars[displayedUser.avatar].Texture))
            document.getElementById("DU_avatar").children[0].style.cursor = "default"

            document.getElementById("DU_avatarList").innerHTML = ""
            
            for (let i = 0; i < avatars.length; i++) {
                let element = CreateCharacterStone(avatars[i].Attack, avatars[i].Health, avatars[i].Texture)

                element.onclick = async () => {
                    await fetch(window.location.origin+'/api/admin/setAvatar', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        }, 
                        body: JSON.stringify({
                            user: displayedUser.username,
                            avatar: i
                        })
                    });
                    update()
                }

                if (avatars[i].unlockRequirements) {
                    if (displayedUser.level >= avatars[i].unlockRequirements) {
                        document.getElementById("DU_avatarList").appendChild(element);
                    } else {
                        let locked = document.createElement("img");
                        locked.src = "/images/locked.png";
                        locked.style.width = "100%";
                        document.getElementById("DU_avatarList").appendChild(locked);
                    }
                } else {
                    document.getElementById("DU_avatarList").appendChild(element);
                }
            }

            document.getElementById("DU_xp").innerHTML = "<p style='float: left'>XP:&nbsp;</p><input type='number' style='width: 10vw' value='"+displayedUser.xp+"'>"
            document.getElementById("DU_xp").children[1].onblur = async () => {
                await fetch(window.location.origin+'/api/admin/setXp', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({
                        user: displayedUser.username,
                        xp: Number(document.getElementById("DU_xp").children[1].value)
                    })
                });
                update()
            }

            document.getElementById("DU_deck").innerHTML = ""

            for (let i = 0; i < displayedUser.deck.length; i++) {
                let element = CreateCard(cards[displayedUser.deck[i]].Name, cards[displayedUser.deck[i]].Description, cards[displayedUser.deck[i]].Cost, cards[displayedUser.deck[i]].Attack, cards[displayedUser.deck[i]].Health, cards[displayedUser.deck[i]].Texture)
                
                let options = []

                options.push({
                    name: "Change",
                    func: () => changeDeckCard(i)
                })
                options.push({
                    name: "Remove",
                    func: async () => {
                        displayedUser.deck.splice(i,1);

                        await fetch(window.location.origin+'/api/admin/setDeck', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            }, 
                            body: JSON.stringify({
                                user: displayedUser.username,
                                deck: displayedUser.deck
                            })
                        });
                        update();
                    }
                })
                
                createOptions(element, ...options)
                document.getElementById("DU_deck").appendChild(element)
            }
            var AddNewDeckCard = document.createElement("div");
            AddNewDeckCard.id = "NewCard";
            var AddDeckButton = document.createElement("div");
            AddNewDeckCard.appendChild(AddDeckButton);
            AddNewDeckCard.addEventListener("click",() => addDeckCard(displayedUser.deck.length));
            document.getElementById("DU_deck").appendChild(AddNewDeckCard);

            document.getElementById("DU_inventory").innerHTML = ""

            for (let i = 0; i < displayedUser.inventory.length; i++) {
                let element = CreateCard(cards[displayedUser.inventory[i]].Name, cards[displayedUser.inventory[i]].Description, cards[displayedUser.inventory[i]].Cost, cards[displayedUser.inventory[i]].Attack, cards[displayedUser.inventory[i]].Health, cards[displayedUser.inventory[i]].Texture)

                let options = []

                options.push({
                    name: "Change",
                    func: () => changeInventoryCard(i)
                })
                options.push({
                    name: "Remove",
                    func: async () => {
                        displayedUser.inventory.splice(i,1);

                        await fetch(window.location.origin+'/api/admin/setInventory', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                user: displayedUser.username,
                                inventory: displayedUser.inventory
                            })
                        });
                        update();
                    }
                })

                createOptions(element, ...options)
                document.getElementById("DU_inventory").appendChild(element)
            }
            var AddNewInventoryCard = document.createElement("div");
            AddNewInventoryCard.id = "NewCard";
            var AddInventoryButton = document.createElement("div");
            AddNewInventoryCard.appendChild(AddInventoryButton);
            AddNewInventoryCard.addEventListener("click",() => addInventoryCard(displayedUser.inventory.length));
            document.getElementById("DU_inventory").appendChild(AddNewInventoryCard);

            document.getElementById("DU_properties").innerHTML = ""
            document.getElementById("DU_properties").appendChild(GenerateViewableProperties(displayedUser));

            if (document.getElementById("DU_danger_zone")) {
                document.getElementById("DU_danger_zone").innerHTML = ""
                if (!displayedUser.root) {
                    let setAdminDiv = document.createElement("div");

                    let setAdminLabel = document.createElement("label");
                    setAdminLabel.innerText = "Admin";
                    setAdminLabel.setAttribute("for", "adminCheck");
                    setAdminLabel.style.color = "white";
                    setAdminDiv.appendChild(setAdminLabel);

                    let setAdminCheck = document.createElement("input");
                    setAdminCheck.type = "checkbox";
                    setAdminCheck.id = "adminCheck";
                    setAdminCheck.checked = displayedUser.admin || false;
                    setAdminCheck.onclick = async (e) => {
                        e.preventDefault();
                        if (!e.shiftKey)
                            return

                        let rtn = await fetch(window.location.origin+'/api/admin/setAdmin', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            }, 
                            body: JSON.stringify({
                                user: displayedUser.username,
                                admin: setAdminCheck.checked
                            })
                        });
                        update()
                    }
                    setAdminDiv.appendChild(setAdminCheck);

                    CreateTooltipEvent(setAdminDiv, "Set admin", "Shift-click to change this property")

                    let container = document.createElement("div");
                    container.appendChild(setAdminDiv)
                    
                    document.getElementById("DU_danger_zone").appendChild(container);
                }

                if (displayedUser.username != self.username && !displayedUser.root) {
                    let deleteDiv = document.createElement("div");

                    let deleteBtn = document.createElement("button");
                    deleteBtn.innerText = "Delete";
                    deleteBtn.onclick = async (e) => {
                        if (!e.shiftKey || !e.ctrlKey)
                            return

                        let rtn = await fetch(window.location.origin+'/api/admin/deleteUser', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            }, 
                            body: JSON.stringify({
                                user: displayedUser.username
                            })
                        });
                        displayedUser = undefined;
                        CloseAllToolTips()
                        update()
                    }
                    CreateTooltipEvent(deleteBtn, "Delete account", "Hold <code>shift</code> and <code>ctrl</code> while clicking to delete user");

                    deleteDiv.appendChild(deleteBtn);

                    document.getElementById("DU_danger_zone").appendChild(deleteDiv);
                }
            }
        } else {
            document.getElementById("DU_title").innerHTML = ""
            
            document.getElementById("DU_avatar").innerHTML = ""
            document.getElementById("DU_avatar").appendChild(CreateCharacterStone(null, null, "MissingCharacter"))
            document.getElementById("DU_avatar").children[0].style.cursor = "default"

            document.getElementById("DU_avatarList").innerHTML = ""

            document.getElementById("DU_xp").innerHTML = ""

            document.getElementById("DU_deck").innerHTML = ""

            document.getElementById("DU_inventory").innerHTML = ""

            document.getElementById("DU_properties").innerHTML = ""
            
            if (document.getElementById("DU_danger_zone")) {
                document.getElementById("DU_danger_zone").innerHTML = ""
            }
        }
    }

    function generateUserList() {
        let userPanel = document.getElementById("userList");

        userPanel.innerHTML = ""
                
        for (let i = 0; i < userList.length; i++) {
            const element = userList[i];

            let userElement = document.createElement("div");
            userElement.classList.add("userElement");
            userElement.onclick = () => {
                displayedUser = element;
                update()
            }

            userElement.innerHTML = `
            <table>
                <tr>
                    <td rowspan="2" style="width: 25%">
                        <img src="/images/Cards/`+avatars[element.avatar].Texture+`.png" width="100%">
                    </td>
                    <td style="width: 75%">
                        <p style="font-size:200%;width:1000000%;"><b><u>`+element.display_name+`</u></b></p>
                    </td>
                </tr>
                <tr style="color:rgb(175,175,175)">
                    <td>
                        <p>`+element.username+`</p>
                    </td>
                </tr>
            </table>`;

            userPanel.appendChild(userElement);
        }
    }

    async function generateConfig() {
        //id: config
        let settings = await (await fetch(window.location.origin+'/api/admin/settings', {
            method: 'POST',
            headers: {
		    	'Content-Type': 'application/json',
    	    }
        })).json();

        document.getElementById("configEditor").value = JSON.stringify(settings, null, 4);
        document.getElementById("configEditor").dispatchEvent(new Event('input'));

        document.getElementById("configSave").onclick = async () => {
            let data;
            try {
                data = JSON.parse(document.getElementById("configEditor").value);
            } catch (e) {
                document.getElementById("configError").innerText = e.message;
            }

            if (data) {
                document.getElementById("configError").innerText = "";
                await fetch(window.location.origin+'/api/admin/settings', {
                    method: 'POST',
                    headers: {
		    	        'Content-Type': 'application/json',
    	            },
                    body: JSON.stringify(data)
                });
                update();
            }
        }
    }

    async function update() {
        let users = await fetch(window.location.origin+'/api/admin/users', {
            method: 'get',
            headers: {
		    	'Content-Type': 'application/json',
    	    }
        });

        if (users.ok) {
            userList = await users.json();
        }

        if (displayedUser)
            displayedUser = userList.find(obj => obj.username == displayedUser.username)

        generateUserList();
        updateDisplayedUser();

        if (self.root)
            generateConfig();

        SetAllFontSizeInArray(FontSizeArray);
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
            if (!ud.admin) {
                window.location.href = '/login';
            }

            self = ud;

            cards = await (await fetch(window.location.origin+'/api/admin/cards',{method:'GET',headers: {'Content-Type': 'application/json'}})).json()
            avatars = await (await fetch(window.location.origin+'/api/admin/avatars',{method:'GET',headers: {'Content-Type': 'application/json'}})).json()

            let rootItems = document.getElementsByClassName("RootLocked");
            Object.entries(rootItems).forEach(([id, obj]) => {
                if (!ud.root) {
                    obj.remove();
                }
            })

            let widthAdjustItems = document.getElementsByClassName("widthAdjust");
            for (let i = 0; i < widthAdjustItems.length; i++) {
                const element = widthAdjustItems[i];
                if (ud.root) {
                    element.style.width = element.getAttribute("rootWidth")
                } else {
                    element.style.width = element.getAttribute("adminWidth")
                }
            }
            update()
        } else {
            window.location.href = '/login';
        }
        window.addEventListener('resize', () => SetAllFontSizeInArray(FontSizeArray));
        window.addEventListener('click', (e) => {
            if (!e.target.getAttribute("optionsClick") && document.getElementById("options"))
                document.getElementById("options").remove();
        })
    })

    function GenerateViewableProperties(object, _nTop = false) {
        var ParentElement = document.createElement("div");

        if (!_nTop)
            ParentElement.innerHTML = "<p>{</p><br>"

        var element = document.createElement("div");
        Object.entries(object).forEach(([key, value]) => {
            element.innerHTML += "<p style='display: inline'>"+key+":&nbsp;</p>"

            if (value instanceof Array) {
                element.innerHTML += "<p>[</p><br>"
                element.appendChild(GenerateViewableProperties(value, true));
                element.innerHTML += "<p>],</p>"
            } else if (typeof value =="object") {
                element.innerHTML += "<p>{</p><br>"
                element.appendChild(GenerateViewableProperties(value, true));
                element.innerHTML += "<p>},</p>"
            } else if (typeof value =="string") {
                element.innerHTML += "<p>\""+value+"\",</p>"
            } else if (typeof value =="number") {
                element.innerHTML += "<p>"+value+",</p>"
            } else if (typeof value =="boolean") {
                element.innerHTML += "<p>"+value+",</p>"
            }
            element.innerHTML += "<br>"
        });
        ParentElement.appendChild(element)
        
        if (!_nTop)
            ParentElement.innerHTML += "<p>}</p>"

        return ParentElement;
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
        FontSizeArray.push({Element:CharacterStoneDMGText,HeightFactor:1});

        //CardHealth
        var CharacterStoneHealth = document.createElement("div");
        CharacterStoneHealth.classList.add("CharacterStoneHealth");
        CharacterStone.appendChild(CharacterStoneHealth);
        

        //Health Display
        var CharacterStoneHealthText = document.createElement("p");
        CharacterStoneHealthText.innerHTML = Health;
        CharacterStoneHealth.appendChild(CharacterStoneHealthText);
        FontSizeArray.push({Element:CharacterStoneHealthText,HeightFactor:1});

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
        FontSizeArray.push({Element:CardDMGText,HeightFactor:1});
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
        FontSizeArray.push({Element:CardHealthText,HeightFactor:1});
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
        FontSizeArray.push({Element:CardCostText,HeightFactor:1});

        //CardName
        var CardName = document.createElement("div");
        CardName.classList.add("CardName");
        Card.appendChild(CardName);

        //Name Display
        var CardNameText = document.createElement("p1");
        CardNameText.innerHTML = Name;
        CardName.appendChild(CardNameText);
        FontSizeArray.push({Element:CardNameText, FullWidth:true});

        //CardDescription
        var CardDescription = document.createElement("div");
        CardDescription.classList.add("CardDescription");
        Card.appendChild(CardDescription);

        //Description Display
        var CardDescriptionText = document.createElement("p1");
        CardDescriptionText.innerHTML = Description;
        CardDescriptionText.style.fontSize = "80%";
        CardDescription.appendChild(CardDescriptionText);
        FontSizeArray.push({Element:CardDescriptionText});

        return Card;
    }
    function SetAllFontSizeInArray(Array) {
        for (var i = 0; i < Array.length; i++) {
            const Element = Array[i].Element;
            if (Element!= null) {
                let HightFactor = Array[i].HeightFactor != null ? Array[i].HeightFactor : 0.5;
                //var containerHeight = Element.parentNode.clientHeight;
                //var textHeight = Element.scrollHeight;

                var CharacterAreal = ((Element.parentNode.clientHeight*0.75*HightFactor) * (Element.parentNode.clientWidth))/(100+(Element.innerHTML.length/2));

                //if Number(Element.style.fontSize) > 0 then use else 1, then multiply with fontSize

                //var scaleFactor = (containerHeight*0.50) / textHeight;

                //let fontSize = Number(Element.style.fontSize.slice(0, -3));
                
                //fontSize = (fontSize>0)?fontSize * (scaleFactor):scaleFactor;
                
                Element.style.fontSize = `${CharacterAreal}px`;
            }
        }
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