<style lang="less">
    #Container {
        position: relative;
        width: 100%;
        aspect-ratio: 2/1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: rgb(25,25,25);
        border: 5px solid rgb(75, 75, 75);
        border-radius: 25px;
        overflow: hidden;

      #Time {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%,0);
        color: white;
      }

      #p1Data, #p2Data {
        position: relative;
        overflow: hidden;
        height: 100%;
      }
      #p1Avatar {
        position: absolute;
        right: 10%;
        top: 40%;
        transform: translate(0,-50%);
        transition: all 0.5s ease;
      }
      #p2Avatar {
        position: absolute;
        left: 10%;
        top: 40%;
        transform: translate(0,-50%);
        transition: all 0.5s ease;
      }
      #p1Display_Name {
        position: absolute;
        right: 10%;
        margin: 0;
        top: 70%;
        transition: all 0.5s ease;
      }
      #p2Display_Name {
        position: absolute;
        left: 10%;
        margin: 0;
        top: 70%;
        transition: all 0.5s ease;
      }
      #p1CardAmount {
        position: absolute;
        bottom: 5px;
        left:5px;
        flex-direction: row;
      }
      #p2CardAmount {
        position: absolute;
        bottom: 5px;
        right:5px;
        flex-direction: row-reverse;
      }
      .CardAmount {
        display: flex;
        height: 10%;
        transition: all 0.5s ease;
        align-items: center;
        p {
          margin: 0;
        }
      }
      :global(.CardAmount .EmptyCard) {
        height: 100%;
      }
      #p1FieldStones {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 50%;
      }
      #p2FieldStones {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 50%;
      }
      .GameField {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        overflow: hidden;
        justify-content: center;
      }
      :global(.GameField > div) {
        height: 25%;
      }
      :global(.Avatar > div) {
        height: 100%;
      }
      .Avatar {
        height: 40%;
        aspect-ratio: 1.66/2.14;
      }
      #VSText {
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: white;
        margin: 0;
      }
      div:where(.selected) {
        background-color: rgb(50,50,50);
      }
      &:where(.gameStarted) {
        #p1Avatar {
          left: 0;
          right: unset;
        }
        #p2Avatar {
          right: 0;
          left: unset;
        }
        #p1Display_Name {
          left: 0;
          right: unset;
        }
        #p2Display_Name {
          right: 0;
          left: unset;
        }
      }
      #EnergyHolder {
          position: absolute;
          top: 0;
          height: 7%;
          width: fit-content;
          max-width: 90%;

          display: flex;
          flex-direction: row;
          overflow: hidden;
          align-items: center;

          p {
            margin: 0;
            width: fit-content;
          }
          .Energy {
            height: 100%;
            aspect-ratio: 1/1;
            background-image: url("/images/EnergyIcon.png");
            background-size: cover;
          }
        }
      #p1Data {
          #EnergyHolder {
            left: 5%;
          }
      }
      #p2Data {
        #EnergyHolder {
          right: 5%;
        }
      }
    }
</style>
    <div id="Container" class="{gameData.onCountDown?'':'gameStarted'}">
        <div id="p1Data" class="{gameData?.currentPlayer=='p1'?'selected':''}">
            <div id="p1Avatar" class="Avatar">
                <Card cardData={{...gameData.p1.Card, cooldown: gameData.p1.attackCooldown}} isStone={true}/>
            </div>
            <h2 id="p1Display_Name">{gameData.p1Name}</h2>
            <div id="p1FieldStones" class="GameField">
                {#each gameData.p1FieldCards as stone}
                    <Card cardData={stone} isStone={true}/>
                {/each}
            </div>
            {#if !gameData.onCountDown}
                <div id="p1CardAmount" class="CardAmount" transition:slide={{duration: 300, easing: quintOut, axis: 'y' }}>
                    <Card isUnknownCard={true}/>
                    <p>{gameData.p1CardsAmount}</p>
                </div>
            {/if}
            <div id="EnergyHolder">
                <p>{gameData.p1Energy}/{gameData.maxEnergy}</p>
                {#each Array.from({length: gameData.maxEnergy}) as _, index}
                    <div class="Energy" style="{index+1>gameData.p1Energy?'filter:grayscale(1);':''}"></div>
                {/each}
            </div>
        </div>
        <div id="p2Data" class="{gameData?.currentPlayer=='p2'?'selected':''}">
            <div id="p2Avatar" class="Avatar">
                <Card cardData={{...gameData.p2.Card, cooldown: gameData.p2.attackCooldown}} isStone={true}/>
            </div>
            <h2 id="p2Display_Name">{gameData.p2Name}</h2>
            <div id="p2FieldStones" class="GameField">
                {#each gameData.p2FieldCards as stone}
                    <Card cardData={stone} isStone={true}/>
                {/each}
            </div>
            {#if !gameData.onCountDown}
                <div id="p2CardAmount" class="CardAmount" transition:slide={{duration: 300, easing: quintOut, axis: 'y' }}>
                    <Card isUnknownCard={true}/>
                    <p>{gameData.p2CardsAmount}</p>
                </div>
            {/if}
            <div id="EnergyHolder">
                <p>{gameData.p2Energy}/{gameData.maxEnergy}</p>
                {#each Array.from({length: gameData.maxEnergy}) as _, index}
                    <div class="Energy" style="{index+1>gameData.p2Energy?'filter:grayscale(1);':''}"></div>
                {/each}
            </div>
        </div>
        {#if typeof gameData?.gameTime != "undefined" && !gameData.onCountDown}
            <p id="Time" transition:slide={{duration: 300, easing: quintOut, axis: 'y' }}>{Math.trunc(gameData.gameTime/60) + ":" + String(gameData.gameTime%60).padStart(2,"0")}</p>
        {/if}
        <h1 id="VSText">VS</h1>
    </div>

<script>
    import { Card } from '$lib';
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    export let gameData = {};
</script>