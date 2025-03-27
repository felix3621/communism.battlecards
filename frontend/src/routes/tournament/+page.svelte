<style lang="less" global>
    :global(body) {
        overflow: hidden;
    }

    :global(#GameList > div) {
        max-height: min(325px, 20vw);
        max-width: min(650px, 40vw);
        aspect-ratio: 1/2;
        color: white;
    }
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
        max-height: 10%;
        cursor: pointer;
    }

    #TournamensPanel {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 250px;
        min-height: 40px;
        max-height: calc(100% - 100px);
        background-color: rgb(25,25,25);
        border-radius: 0 25px 0 0;
        border: 3px solid rgb(75,75,75);
        transform: translate(0,100%);
        transition: all 0.5s ease;

        display: flex;
        flex-direction: column;

        &:where(.Open) {
            transform: translate(0,0%);
        }

        #MinimizeBtn {
            bottom: calc(100% + 3px);
            left: -3px;
            position: absolute;
            aspect-ratio: 1/1;
            background-color: rgb(75,75,75);
            border: 2px black solid;
            width: 50px;
            height: 50px;
            padding: 0;
            border-radius: 0 15px 0 0;
            cursor: pointer;
            overflow: hidden;

            &:where(:hover) {
                opacity: 0.75;
            }

            svg {
                pointer-events: none;
                width: 100%;
                height: 100%;
                filter: invert(0.75);
            }
        }

        #AddTournament {
            cursor: pointer;

            &:hover {
                opacity: 0.75;
            }
        }
        .SelectTournament {
            display: flex;
            flex-direction: column;

            border: 2px solid rgb(75,75,75);
            border-left: 0;
            border-right: 0;
            cursor: pointer;

            h1, p {
                margin: 0;
                pointer-events: none;
                color: white;
            }

            &:hover {
                background: rgb(100,100,100);
            }
        }
    }
    #TournamentPanel {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        height: 75%;
        width: 90%;
        background: rgb(25,25,25);
        border: 5px solid rgb(75,75,75);

        #Code {
            position: absolute;
            top: 0;
            right: 0;
        }
        #PlayerList {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 200px;
            border-right: 2px solid rgb(75,75,75);
            display: flex;
            flex-direction: column;
            padding: 5px;
            gap: 5px;

            #Player {
                color: white;

                p {
                    margin: 0;
                }

                &:where(.ready) {
                    color: rgb(0,255,0);
                }
                &:where(.notReady) {
                    color: rgb(150,0,0);
                }
            }
        }
        #GameList {
            position: absolute;
            left: 200px;
            top: 0;
            right: 0;
            bottom: 0;
            padding: 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        #StartBattles {
            position: absolute;
            right: 0;
            top: 20px;
        }
    }
</style>
<div id="Background">
    <div id="CandleHolder"></div>
    <div id="CardHolder"></div>
</div>
<img id="logo" src="{base}/images/BattlecardsLogo.png" on:click={()=>goto('/')}>
<div id="TournamensPanel" class="{minimizeTournamentsPanel?'Open':''}">
    <button id="MinimizeBtn" on:click={()=>minimizeTournamentsPanel=!minimizeTournamentsPanel}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg></button>
    <button id="AddTournament" on:click={()=>createTournament()}>New Tournament</button>
    <!--tournament list-->
    {#each tournamentGames as tournament}
        <div class="SelectTournament" on:click={()=>selectTournament(tournament.Code)}>
            <h1>{tournament.Code}</h1>
            <p>Players: {tournament.Players}</p>
        </div>
    {/each}
</div>
{#if selectedTournamentGameData}
    <div id="TournamentPanel">
        <div id="PlayerList">
            {#each selectedTournamentGameData.Players as player}
                <div id="Player" class="{player.ready?'ready':'notReady'}">
                    <p>{player.displayName}</p>
                </div>
            {/each}
        </div>
        <div id="GameList">
            {#each selectedTournamentGameData.battles as battle}
                <TurnamentGame gameData={battle}/>
            {/each}
        </div>
        {#if selectedTournamentGameData.battles.length==0}
            <input id="Code" type="text" disabled value={selectedTournamentGameData.Code}>
            <button id="StartBattles" on:click={()=>startBattle()}>Start Tournament</button>
        {/if}
    </div>
{/if}
<script>
    import { TurnamentGame, Errors } from "$lib";
    import { onMount, onDestroy } from "svelte";
    import { base } from '$app/paths';
    import { goto } from '$app/navigation';

    let self;
    let tournamentGames = [];
    let selectedTournamentGameData;

    // page settings
    let minimizeTournamentsPanel = true;

    // socket data
    let socket;
    let SocketPing=0;

    // socket send functions
    function createTournament() {
        if (socket && socket.readyState == WebSocket.OPEN) {
            socket.send(JSON.stringify({createTournament:true}));
        } else {
            $Errors.push({text:"Socket is not connected",time:2});
        }
    }
    function selectTournament(code) {
        if (socket && socket.readyState == WebSocket.OPEN) {
            socket.send(JSON.stringify({SelectedTournament:code}));
        } else {
            $Errors.push({text:"Socket is not connected",time:2});
        }
    }
    function startBattle() {
        if (socket && socket.readyState == WebSocket.OPEN) {
            socket.send(JSON.stringify({startBattles:true}));
        } else {
            $Errors.push({text:"Socket is not connected",time:2});
        }
    }

    onMount(async() => {
        const user = await fetch(base+'/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (user.ok) {
            let ud = await user.json();
            if (!ud.admin) {
                goto('/login');
            }

            self = ud;

            CreateSocketConnection();
            animationId = requestAnimationFrame(AnimationLoop);

            // Return a cleanup function to cancel the animation frame
            return () => {
                console.log('Cleaning up animation...');
                cancelAnimationFrame(animationId);
            };
        } else {
            goto('/login');
        }
    });
    onDestroy(() => {
        if (socket)
            socket.close(1000);
        if (animationId)
            cancelAnimationFrame(animationId);
        animationId = undefined;
    });
    // Animation loop
    let lastFrameTime = performance.now();
    let animationId;
    function AnimationLoop() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastFrameTime)/1000;
        lastFrameTime = currentTime;

        for (let i = 0; i < $Errors.length; i++) {
            if ($Errors[i].time>0) {
                $Errors[i].time-=deltaTime;
            } else {
                $Errors.splice(i,1);
                i--;
            }
        }

        SocketPing += deltaTime;
        if (SocketPing>=5) {
            SocketPing = 0;
            CreateSocketConnection();
            console.log("Socket Close");
        }

        animationId = requestAnimationFrame(AnimationLoop);
    }
    function CreateSocketConnection() {
        if (socket)
            socket.close(1000);
        socket = new WebSocket(base+'/socket/game?tournamentPanel=true');

        // Event listener for when the connection is established
        socket.onopen = () => {
            console.log('Connected to server');
        };

        // Event listener for incoming messages from the server
        socket.onmessage = (event) => {
            var data = event.data;
            if (data) {
                data = JSON.parse(data);
                if (data.ping = "keep alive") {
                    SocketPing = 0;
                }
                if (typeof data.tournaments != "undefined") {
                    tournamentGames = data.tournaments;
                }
                if (typeof data.selectedTournament != "undefined") {
                    selectedTournamentGameData = data.selectedTournament;
                }
                if (data.Errors?.length>0) {
                    data.Errors.forEach(error=>{
                        $Errors.push({text:error,time:2});
                    })
                }
            }
        };

        // Event listener for when the connection is closed
        socket.onclose = (event) => {
            console.log('Connection closed', event);
            if (event.code==1008) {
                console.log("old instance closed!", typeof animationId == "undefined");
                return true;
            }
            if (event.code==1000) {
                return true;
            }
            setTimeout(() => {
                if (socket.readyState === WebSocket.CLOSED)
                    CreateSocketConnection();
            }, 1000)
        };

        // Event listener for errors
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
</script>