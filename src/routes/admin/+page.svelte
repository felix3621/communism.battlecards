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
        height: calc(10% - 5px);
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
    }
    :global(#NewCard) {
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
    #DU_properties {
        color: white;
    }
    :global(#DU_properties p) {
        margin:0;
    }
    :global(#DU_properties * div) {
        margin-left:10px;
    }
</style>
<img id="logo" src="images/BattlecardsLogo.png" on:click={()=>window.location.href="/"}>

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
                <div class="content" style="height:90%">
                    <div id="DU_avatar"></div>
                    <div id="DU_avatarList"></div>
                    <div id="DU_xp"></div>
                    <p class="contentHeader">Deck:</p>
                    <div id="DU_deck" class="DU_cardContainer"></div>
                    <p class="contentHeader">Properties:</p>
                    <div id="DU_properties"></div>
                </div>
            </div>
        </td>
        <td class="RootLocked" style="width: 25%;">
            <div class="panel"></div>
            <div class="content"></div>
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

    function addCard(index) {
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

    function changeCard(index) {
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

    function updateDisplayedUser() {
        if (displayedUser) {
            document.getElementById("DU_title").innerHTML = "<input style='text-align:center;' value='"+displayedUser.display_name+"'><br><i style='color: rgb(175,175,175'>"+displayedUser.username+"</i>";
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
                displayedUser.display_name = document.getElementById("DU_title").children[0].value;
                userList.find(obj => obj.username == displayedUser.username).display_name = document.getElementById("DU_title").children[0].value;
                update()
            }
            
            document.getElementById("DU_avatar").innerHTML = ""
            document.getElementById("DU_avatar").appendChild(CreateCharacterStone(avatars[displayedUser.avatar].Attack, avatars[displayedUser.avatar].Health, avatars[displayedUser.avatar].Texture))
            document.getElementById("DU_avatar").children[0].style.cursor = "default"

            document.getElementById("DU_avatarList").innerHTML = ""
            
            for (let i = 0; i < avatars.length; i++) {
                if (avatars[i].unlockRequirements) {
                    if (displayedUser.level >= avatars[i].unlockRequirements) {
                        document.getElementById("DU_avatarList").appendChild(CreateCharacterStone(avatars[i].Attack, avatars[i].Health, avatars[i].Texture))
                    } else {
                        document.getElementById("DU_avatarList").innerHTML += "<img src='/images/locked.png' style='width: 100%'>"
                    }
                } else {
                    document.getElementById("DU_avatarList").appendChild(CreateCharacterStone(avatars[i].Attack, avatars[i].Health, avatars[i].Texture))
                }

                if (document.getElementById("DU_avatarList").children[i].classList.contains("CharacterStone"))  {
                    document.getElementById("DU_avatarList").children[i].onclick = async () => {
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
                        displayedUser.avatar = i;
                        userList.find(obj => obj.username == displayedUser.username).avatar = i;
                        update()
                    }
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
                displayedUser.xp = document.getElementById("DU_xp").children[1].value;
                userList.find(obj => obj.username == displayedUser.username).xp = document.getElementById("DU_xp").children[1].value;
                update()
            }

            document.getElementById("DU_deck").innerHTML = ""

            for (let i = 0; i < displayedUser.deck.length; i++) {
                let element = CreateCard(cards[displayedUser.deck[i]].Name, cards[displayedUser.deck[i]].Description, cards[displayedUser.deck[i]].Cost, cards[displayedUser.deck[i]].Attack, cards[displayedUser.deck[i]].Health, cards[displayedUser.deck[i]].Texture)
                
                let options = []

                options.push({
                    name: "Change",
                    func: () => changeCard(i)
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
                if (i != 0)
                    options.push({
                        name: "Insert Before",
                        func: () => addCard(i)
                    })
                options.push({
                    name: "Insert After",
                    func: () => addCard(i+1)
                })
                
                createOptions(element, ...options)
                document.getElementById("DU_deck").appendChild(element)
            }
                var AddNewCard = document.createElement("div");
                AddNewCard.id = "NewCard";
                var AddButton = document.createElement("div");
                AddNewCard.appendChild(AddButton);
                AddNewCard.addEventListener("click",() => addCard(displayedUser.deck.length));
                document.getElementById("DU_deck").appendChild(AddNewCard);

                document.getElementById("DU_properties").innerHTML = ""
                document.getElementById("DU_properties").appendChild(GenerateProperties(displayedUser));
        } else {
            document.getElementById("DU_title").innerHTML = ""
            
            document.getElementById("DU_avatar").innerHTML = ""
            document.getElementById("DU_avatar").appendChild(CreateCharacterStone(null, null, "MissingCharacter"))
            document.getElementById("DU_avatar").children[0].style.cursor = "default"

            document.getElementById("DU_avatarList").innerHTML = ""

            document.getElementById("DU_xp").innerHTML = ""

            document.getElementById("DU_deck").innerHTML = ""

            document.getElementById("DU_properties").innerHTML = ""
        }
        /*
        deck
        inventory
        */
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

        updateDisplayedUser()
        generateUserList()
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

            cards = await (await fetch(window.location.origin+'/api/admin/cards',{method:'GET',headers: {'Content-Type': 'application/json'}})).json()
            avatars = await (await fetch(window.location.origin+'/api/admin/avatars',{method:'GET',headers: {'Content-Type': 'application/json'}})).json()

            let rootItems = document.getElementsByClassName("RootLocked");
            for (let i = 0; i < rootItems.length; i++) {
                if (!ud.root) {
                    rootItems[i].remove();
                }
            }

            let widthAdjustItems = document.getElementsByClassName("widthAdjust");
            for (let i = 0; i < widthAdjustItems.length; i++) {
                const element = widthAdjustItems[i];
                if (ud.root) {
                    element.style.width = element.getAttribute("rootWidth")
                } else {
                    element.style.width = element.getAttribute("adminWidth")
                }
            }

            let users = await fetch(window.location.origin+'/api/admin/users', {
                method: 'get',
                headers: {
	    	    	'Content-Type': 'application/json',
	    	    }
            });

            if (users.ok) {
                userList = await users.json();
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

    function GenerateProperties(object, _array = false) {
        var ParentElement = document.createElement("div");
        ParentElement.innerHTML = "<p>{</p>"
        var element = document.createElement("div");
        Object.entries(object).forEach(([key, value]) => {
            element.innerHTML += "<p>"+key+":</p>"

            if (value instanceof Array) {

            } else if (typeof value =="object") {
                element.appendChild(GenerateProperties(value));
            } else if (typeof value =="string") {

            } else if (typeof value =="float") {

            } else if (typeof value =="boolean") {
 
            }
        });
        ParentElement.appendChild(element)
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
</script>