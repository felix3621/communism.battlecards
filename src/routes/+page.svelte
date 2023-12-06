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
        width: 100px;
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
        right:100px;
        top:25%;
        left:50%;
        bottom: 5%;
    }
    .Card {
        position: relative;
        width: 125px;
        aspect-ratio: 2.73/3.93;
    }
    .Card p {
        position: absolute;
        margin: 0;
        color: black;
        text-align: center;
        left:0px;
        right: 0px;
        top: 0px;
        bottom:  0px;
        font-size: 100%;
        -webkit-text-stroke-width: 0.5px;
        -webkit-text-stroke-color: black;
        padding: 7px;
    }
    .Card .CardImage {
        position: absolute;
        background-image: url(/images/Cards/BanditBOBCharacter.png);
        width: 59%;
        aspect-ratio: 1.66/2.14;
        background-size: cover;
        left:50%;
        top:8%;
        transform: translate(-50%,0);
    }
    .Card .CardFrame {
        position: absolute;
        width: 100%;
        background-image: url("/images/CardFrame.png");
        height: 100%;
        background-size: cover;
    }
    .Card .CardDMG {
        position: absolute;
        background-image: url("/images/DMGIcon.png");
        width: 35px;
        aspect-ratio: 1/1;
        background-size: cover;
        bottom: 0px;
        transform: translate(-40%,20%);

    }
    .Card .CardHealth {
        position: absolute;
        background-image: url("/images/HealthIcon.png");
        width: 35px;
        aspect-ratio: 1/1;
        background-size: cover;
        bottom: 0px;
        right:0px;
        transform: translate(40%,20%);
    }
    .Card .CardCost {
        position: absolute;
        background-image: url("/images/EnergyIcon.png");
        width: 35px;
        aspect-ratio: 1/1;
        background-size: cover;
        transform: translate(-40%,-20%);
    }
    .Card .CardName {
        position: absolute;
        top:52%;
        left:21%;
        right:21%;
        bottom: 39%;
    }
    .Card .CardDescription {
        position: absolute;
        top:70%;
        left:21%;
        right:21%;
        bottom: 5%;
    }
    .Card p1 {
        position: absolute;
        color: white;
        text-align: center;
        left:0px;
        right: 0px;
        top: 0px;
        bottom:  0px;
    }
    .CardDeck {
        
    }
</style>
<h1 class="Title" style="margin: 0px;">Welcome to BattleCards!</h1>
<div class="EXP_Bar">
    <div class="EXP_FilLevel"></div>
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
        <div id="CardDeck" style="width: 100%; height:100%;">
            <div class="Card">
                <div class="CardImage"></div>
                <div class="CardFrame"></div>
                <div class="CardDMG"><p>2</p></div>
                <div class="CardHealth"><p>6</p></div>
                <div class="CardCost"><p>4</p></div>
                <div class="CardName"><p1>Name!</p1></div>
                <div class="CardDescription"><p1 style="font-size: 80%;">Description is broken and weird</p1></div>
            </div>
        </div>
    </div>
</div>


<script>
    import { onMount } from "svelte";
    var Level = 1;
    var Exp = 0;

    onMount(async() => {
        /*const user = await fetch(window.location.origin+'/api/account/login', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	},
            body: JSON.stringify({
	    		username: "user",
                password: "pass",
	    	}),
        });
        let text = await user.json();
        console.log(text);*/
        SetExpFilLevel(100);
    })

    function SetExpFilLevel(Level) {
        var Bar = document.getElementsByClassName("EXP_FilLevel");
        for (let i = 0; i < Bar.length; i++) {
            Bar[i].style.width = Level+"%";
        }
    }
</script>