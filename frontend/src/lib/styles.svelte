<style>
    :global(*) {
        font-family: 'Roboto', sans-serif;
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
        pointer-events: none
    }
    :global(.Card .CardImage) {
        position: absolute;
        width: 59%;
        aspect-ratio: 1.66/2.14;
        background-size: cover;
        left:50%;
        top:8%;
        transform: translate(-50%,0);
        pointer-events: none
    }
    :global(.Card .CardFrame) {
        position: absolute;
        width: 100%;
        background-image: url(/images/CardFrame.png);
        height: 100%;
        background-size: cover;
        pointer-events: none
    }
    :global(.Card .CardDMG) {
        position: absolute;
        background-image: url(/images/DMGIcon.png);
        width: 40%;
        aspect-ratio: 1/1;
        background-size: cover;
        bottom: 0px;
        transform: translate(-40%,20%);
        pointer-events: none;
        overflow: auto;

    }
    :global(.Card .CardHealth) {
        position: absolute;
        background-image: url(/images/HealthIcon.png);
        width: 40%;
        aspect-ratio: 1/1;
        background-size: cover;
        bottom: 0px;
        right:0px;
        transform: translate(40%,20%);
        pointer-events: none;
        overflow: auto;
    }
    :global(.Card .CardCost) {
        position: absolute;
        background-image: url(/images/EnergyIcon.png);
        width: 40%;
        aspect-ratio: 1/1;
        background-size: cover;
        transform: translate(-40%,-20%);
        pointer-events: none;
        overflow: auto;
    }
    :global(.Card .CardName) {
        position: absolute;
        top:45%;
        left:21%;
        right:21%;
        bottom: 33%;
        pointer-events: none
    }
    :global(.Card .CardDescription) {
        position: absolute;
        top:70%;
        left:21%;
        right:21%;
        bottom: 5%;
        pointer-events: none
    }
    :global(.Card p1) {
        position: absolute;
        color: white;
        text-align: center;
        left:50%;
        top: 50%;
        transform: translate(-50%,-50%);
        user-select: none;
        width: 100%;
        height: fit-content;
        word-break: break-all;
        pointer-events: none
    }

    :global(.CharacterStone) {
        position: relative;
        aspect-ratio: 1.66/2.14;
        background-size: cover;
    }
    :global(.CharacterStone p) {
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
        pointer-events: none
    }
    :global(.CharacterStone .CharacterStoneDMG) {
        position: absolute;
        background-image: url(/images/DMGIcon.png);
        width: 40%;
        aspect-ratio: 1/1;
        background-size: cover;
        bottom: 0px;
        transform: translate(0%,20%);
        pointer-events: none;
        overflow: auto;

    }
    :global(.CharacterStone .CharacterStoneHealth) {
        position: absolute;
        background-image: url(/images/HealthIcon.png);
        width: 40%;
        aspect-ratio: 1/1;
        background-size: cover;
        bottom: 0px;
        right:0px;
        transform: translate(0%,20%);
        pointer-events: none;
        overflow: auto;
    }
    :global(.EmptyCard) {
        position: relative;
        aspect-ratio: 2.73/3.93;
        background-size: cover;
        background-image: url(/images/EmptyCard.png);
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
</style>