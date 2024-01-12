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
        overflow: hidden;
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
        filter: brightness(150%);
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
        height: calc(10% - 2.5px);
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
        grid-template-columns: repeat(auto-fit,calc(7.4vw));
        border-top: 2.5px solid black;
        border-bottom: 5px solid black;
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

    function updateDisplayedUser() {
        if (displayedUser) {
            document.getElementById("DU_title").innerHTML = "<input style='text-align:center;' value='"+displayedUser.display_name+"'><br><i>"+displayedUser.username+"</i>";
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
        } else {
            document.getElementById("DU_title").innerHTML = ""
            
            document.getElementById("DU_avatar").innerHTML = ""
            document.getElementById("DU_avatar").appendChild(CreateCharacterStone(null, null, "MissingCharacter"))

            document.getElementById("DU_avatarList").innerHTML = ""

            document.getElementById("DU_xp").innerHTML = ""
        }
        /*
        deck
        inventory
        */
        SetAllFontSizeInArray(FontSizeArray)
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
                updateDisplayedUser()
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
        SetAllFontSizeInArray(FontSizeArray);
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
        SetAllFontSizeInArray(FontSizeArray);
        window.addEventListener('resize', () => SetAllFontSizeInArray(FontSizeArray));
    })

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
    function SetAllFontSizeInArray(Array) {
        for (var i = 0; i < Array.length; i++) {
            const Element = Array[i].Element;
            if (Element!= null) {
                let HightFactor = Array[i].HeightFactor != null ? Array[i].HeightFactor : 0.5;
                //var containerHeight = Element.parentNode.clientHeight;
                //var textHeight = Element.scrollHeight;

                var CharacterAreal = ((Element.parentNode.clientHeight*0.75*HightFactor) * (Element.parentNode.clientWidth))/(100+(Element.innerHTML.length));

                //if Number(Element.style.fontSize) > 0 then use else 1, then multiply with fontSize

                //var scaleFactor = (containerHeight*0.50) / textHeight;

                //let fontSize = Number(Element.style.fontSize.slice(0, -3));
                
                //fontSize = (fontSize>0)?fontSize * (scaleFactor):scaleFactor;
                
                Element.style.fontSize = `${CharacterAreal}px`;
            }
        }
    }
</script>