<style>
    #logo {
        position: fixed;
        top:0;
        left:0;
        background-color: rgb(50, 50, 50);
        border-radius: 0 0 25px 0;
        outline: 5px black solid;
        max-height: 10%;
        padding: 0 10px 20px 0;
        cursor: pointer;
    }
    #gameList {
        background-color: rgb(50, 50, 50);
        outline: 10px black solid;
        border-radius: 25px;
        position: fixed;
        top: 20%;
        bottom: 10%;
        left: 2.5%;
        right: 55%;
    }
    #games {
        float: left;
        height: 100%;
        width: calc(50% - 5px);
        border-right: 5px solid black;
    }
    #tournaments {
        float: left;
        height: 100%;
        width: calc(50% - 5px);
        border-left: 5px solid black;
    }
    .title {
        width: 100%;
        text-align: center;
        color: white;
        font-size: 20px;
        border-bottom: 5px dotted black;
        height: calc(5% - 5px);
    }
    .list {
        width: 100%;
        height: 95%;
        overflow: auto;
        color: white;
    }
</style>
<img id="logo" src="images/BattlecardsLogo.png" on:click={()=>window.location.href="/"}>

<div id="gameList">
    <div id="games">
        <div class="title">Games</div>
        <div class="list" id="GamesList">
            <p>
                /CODE/ <br>
                - p1: /P1/ <br>
                - p2: /P2/
            </p>
        </div>
    </div>
    <div id="tournaments">
        <div class="title">Tournaments</div>
        <div class="list"  id="TournamentsList"></div>
    </div>
</div>

<script>
    import { onMount } from "svelte";

    var socket;

    function createSocket() {
        socket = new WebSocket(`wss://${window.location.host}/gamesocket?admin=true`);

        socket.onopen = () => {
            console.log('Connected to server');
        }

        socket.onmessage = (event) => {
            var data = JSON.parse(event.data)
            console.log(data)
            Update(data)
        }

        socket.onclose = (event) => {
            console.log('Connection closed', event);
            if (event.code == 1008) {
                setTimeout(() => {window.location.href = "/"},1000)
            } else {
                setTimeout(createSocket, 1000)
            }
        }

        socket.onerror = (error) => {
            console.log('WebSocket error:', error);
        }
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
            if (!ud.admin)
                window.location.href = '/';
        } else
            window.location.href = '/login';

        createSocket();
    })

    function Update(data) {
        if (data.battles)
            UpdateGameList(data.battles)
        if (data.tournaments)
            UpdateTournamentList(data.tournaments)
    }

    function UpdateGameList(GameList) {
        var GameListElement = document.getElementById("GamesList");
        // Loop
        for (let i = 0; i < GameList.length || i < GameListElement.children.length; i++) {
            if (i<GameList.length && i>=GameListElement.children.length) { // create
                var NewElement = document.createElement("p");
                NewElement.innerHTML = GameList[i].code + "<br>p1: " + GameList[i].p1 + "<br>p2: " + GameList[i].p2;
                GameListElement.appendChild(NewElement);
            } else if (i<GameList.length && i<GameListElement.children.length) { // Update

                GameListElement.children[i].innerHTML = GameList[i].code + "<br>&nbsp; p1: " + GameList[i].p1 + "<br>&nbsp; p2: " + GameList[i].p2;
            } else { // Remove
                GameListElement.children[i].remove();
            }
        }
    }
    function UpdateTournamentList(TournamentList) {
        var TournamentsListElement = document.getElementById("TournamentsList");
        // Loop
        for (let i = 0; i < TournamentList.length || i < TournamentsListElement.children.length; i++) {
            if (i<TournamentList.length && i>=TournamentsListElement.children.length) { // create
                var NewElement = document.createElement("p");
                NewElement.innerHTML = TournamentList[i].code;
                for (let j = 0; j < TournamentList[i].userList.length; j++) {
                    NewElement.innerHTML += "<br>&nbsp; " + TournamentList[i].userList[j]
                }
                TournamentsListElement.appendChild(NewElement);
            } else if (i<TournamentList.length && i<TournamentsListElement.children.length) { // Update
                TournamentsListElement.children[i].innerHTML = TournamentList[i].code;
                for (let j = 0; j < TournamentList[i].userList.length; j++) {
                    TournamentsListElement.children[i].innerHTML += "<br>&nbsp; " + TournamentList[i].userList[j]
                }
            } else { // Remove
                TournamentsListElement.children[i].remove();
            }
        }
    }
</script>