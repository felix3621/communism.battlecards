<style>
    #Background {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: black;
    }
    #BackgroundPart1 {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 50%;
        background-image: url(/images/Background0.png);
        background-size: cover;
        pointer-events: none;
        transition: left 3s ease-in-out, right 3s ease-in-out;
        background-position-x: 50%;
    }
    #BackgroundPart2 {
        position: fixed;
        top: 0;
        left: 50%;
        bottom: 0;
        right: 0;
        background-image: url(/images/Background0.png);
        background-size: cover;
        pointer-events: none;
        transition: left 3s ease-in-out, right 3s ease-in-out;
        background-position-x: -50%;
    }
    :global(.FallingCandle) {
        width: 25px;
        position: absolute;
        transform: translate(-50%,100%);
        pointer-events: none;
        filter: drop-shadow(0 5mm 8mm rgba(0, 0, 0, 0.85));
        background-size: cover;
        aspect-ratio: 1/2;
        background-image: url(/images/Candle.png);
    }
    :global(.Flame) {
        position: relative;
        width: 80%;
        bottom: 50%;
        animation: FadeIn 1s linear, FireMove 2s infinite 1s;
        transform-origin: bottom;
        border-radius: 100%;
        filter: drop-shadow(0 0 4px rgba(255, 0, 0, 1)) drop-shadow(0 0 10px rgba(200, 200, 200, 1));
    }
    @keyframes FadeIn {
        0% {
            transform: scale(0,0);
            filter: opacity(0);
        }
        100% {
            transform: scale(1,1);
            filter: opacity(1);
        }
    }
    @keyframes FireMove {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(20deg);
        }
        75% {
            transform: rotate(-20deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
    #BattleCardsLogoLeft {
        position: absolute;
        right: 0%;
        transform: translate(0,100%);
        width: 50%;
        background-image: url(/images/logos/battlecards/left.png);
        background-size: contain;
        background-repeat: no-repeat;
        aspect-ratio: 500/245;
        bottom: 0;
        filter: opacity(1);
        transition: filter 1s;
    }
    #BattleCardsLogoRight {
        position: absolute;
        left: 0%;
        transform: translate(0,100%);
        width: 50%;
        background-image: url(/images/logos/battlecards/right.png);
        background-size: contain;
        background-repeat: no-repeat;
        aspect-ratio: 500/245;
        bottom: 0;
        filter: opacity(1);
        transition: filter 1s;
    }
    #FlashBang {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: white;
        transition: 1s;
        filter: opacity(1);
    }
    :global(#LeopardenBobLogo) {
        position: fixed;
        top: 50%;
        transform: translate(-50%,-50%);
        left: 50%;
        max-height: 30%;
        width: 50%;
        aspect-ratio: 783/116;
        max-width: 75%;
        transition: top 1s;
    }
    :global(.BottomText) {
        position: absolute;
        height: 100%;
        aspect-ratio: 783/116;
        background-image: url(/images/logos/leopardenBob/Bottom.png);
        background-size: cover;
        animation: LeopardenBobText 3s ease 0.5s;
        animation-fill-mode: forwards;
        filter: opacity(0);
    }
    @keyframes LeopardenBobText {
        0% {
            filter: opacity(1);
            left: -150vw
        }
        90% {
            left: 5vw;
        }
        100% {
            filter: opacity(1);
            left: 0
        }
    }
    :global(.Face) {
        position: absolute;
        height: 100%;
        aspect-ratio: 62/100;
        top: 41%;
        left: 85.3%;
        transform: translate(-50%,-50%);
        background-image: url(/images/logos/leopardenBob/FaceGlow.png),
            url(/images/logos/leopardenBob/Face.png);
        background-size: cover;
        animation: LeopardenBobFace 2s ease-out 2.5s;
        animation-fill-mode: forwards;
        filter: opacity(0);
    }
    @keyframes LeopardenBobFace {
        0% {
            left: 100vw;
            filter: opacity(1);
        }
        90% {
            left: 82%;
        }
        100% {
            left: 85.3%;
            filter: opacity(1);
        }
    }
    :global(.Wheel) {
        position: absolute;
        height: 95%;
        top: 50%;
        left: 19.25%;
        transform: translate(-50%,-50%);
        aspect-ratio: 1/1;
        background-image: url(/images/logos/leopardenBob/WheelGlow.png),
            url(/images/logos/leopardenBob/Wheel.png);
        background-size: cover;
        animation: LeopardenBobWheel 2s ease-out 2s, Spin 2.5s infinite linear 4s;
        animation-fill-mode: forwards;
        filter: opacity(0);
    }
    @keyframes LeopardenBobWheel {
        0% {
            filter: opacity(1);
            top: -50vw;
        }
        90% {
            top:60%;
        }
        100% {
            top:50%;
            filter: opacity(1);
        }
    }
    @keyframes Spin {
        0% {
            transform: translate(-50%,-50%) rotate(0deg);
        }
        100% {
            transform: translate(-50%,-50%) rotate(360deg);
        }
    }
    :global(.TopText) {
        position: absolute;
        height: 100%;
        aspect-ratio: 783/116;
        background-image: url(/images/logos/leopardenBob/Top.png);
        background-size: cover;
        animation: LeopardenBobText 3s ease 0.5s;
        animation-fill-mode: forwards;
        filter: opacity(0);
    }
    #FelixLogo {
        position: fixed;
        background-image: url(/images/logos/felix/felix.png);
        top: 60%;
        left: 50%;
        transform: translate(-25vh,-50%);
        height: 25%;
        background-size: contain;
        background-repeat: no-repeat;
        filter: opacity(0);
        animation: FelixLogo 3s ease;
        animation-fill-mode: forwards;
        width: 50%;
    }
    #FelixLogo h1 {
        position: absolute;
        left: 25vh;
        height: 100%;
        filter: opacity(0);
        width: fit-content;
        animation: FelixText 4s ease;
        animation-fill-mode: forwards;
        color: orange;
        top: 15%;
        font-size: 20vh;
        margin: 0;
    }
    @keyframes FelixLogo {
        0% {
            filter: opacity(0);
            top: 150%;
        }
        20% {
            filter: opacity(1);
            top: 150%;
        }
        100% {
            filter: opacity(1);
            top: 60%;
            transform: translate(-50%,-50%);
        }
    }
    @keyframes FelixText {
        0% {
            filter: opacity(0);
            left: 500vw;
        }
        40% {
            filter: opacity(1);
        }
        85% {
            filter: opacity(1) drop-shadow(0mm 0mm 0px rgb(0, 0, 0));
            left: 25vh;
        }
        100% {
            filter: opacity(1) drop-shadow(3mm 3mm 5px rgb(170, 70, 0));
            left: 25vh;
        }
    }
    #MadeBy {
        position: fixed;
        font-size: 5vw;
        top: 7.5%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: white;
    }
    #ScrollTextHolder {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    :global(#ScrollTextHolder > p) {
        position: absolute;
        color: white;
        text-align: center;
        width: 100vw;
        transform: translate(0,100%);
        bottom: 0;
    }
    #ScrollCardHolder {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;

        & > div {
            position: absolute;
            width: 25%;
            max-width: 100px;
            top: 0;
            transform: translate(-50%,-100%);
            filter: drop-shadow(0mm 10mm 5mm black);
        }
    }
</style>
<div id="Background">
    <h1 id="MadeBy">Made By:</h1>
    <div id="LeopardenBobLogo" style="display: none;">
        <div class="BottomText"></div>
        <div class="Face"></div>
        <div class="Wheel"></div>
        <div class="TopText"></div>
    </div>
    <div id="FelixLogo" style="display: none;">
        <h1>Felix</h1>
    </div>
    <div id="BackgroundPart1">
        <div id="CandleHolderPart1"></div>
        <div id="BattleCardsLogoLeft"></div>
    </div>
    <div id="BackgroundPart2">
        <div id="CandleHolderPart2"></div>
        <div id="BattleCardsLogoRight"></div>
    </div>
    <div id="ScrollCardHolder" class="CardHolder"></div>
    <div id="ScrollTextHolder"></div>
</div>

<div id="FlashBang"></div>
<script>
    import { Card } from '$lib';
    import { onMount, onDestroy } from "svelte";
    import { base } from '$app/paths';

    var ActivationTIme = 0;
    var CurrentStage = 0;
    var BackgroundScroll = true;
    var ScrollSpeed = 100;
    var cards = [];;
    var avatars = [];

    var SpawnCards = false;

    var CreditText = {
        Stage: 0,
        Stages: [
            {
                Title: "Database",
                Text: "Mongo",
                SpawnCards: true,
                NextSpawnDelay: 75
            },
            {
                Title: "Account System",
                Text: "Felix",
                NextSpawnDelay: 75
            },
            {
                Title: "Web Design",
                Text: "LeopardenBob",
                NextSpawnDelay: 75
            },
            {
                Title: "Art",
                Text: "LeopardenBob",
                NextSpawnDelay: 75
            },
            {
                Title: "Socket",
                Text: "Felix And LeopardenBob",
                NextSpawnDelay: 75
            },
            {
                Title: "API",
                Text: "Felix: 90%<br>LeopardenBob: 10%",
                NextSpawnDelay: 150
            },    
            {
                Title: "Special Thanks To",
                Text: "Ian: for coming with ideas <br>FakeCheesy: The Cheese man <br>Fix: Being Fix <br>Svæin: Programing <br>Runar: Existing",
                NextSpawnDelay: 200
            }, 
            {
                Title: "Thank You For Playing",
                Text: "yes i know this one is short, live with it.",
                NextSpawnDelay: 100
            }
        ]
    }

    //Update Loop
    let lastFrameTime = performance.now();
    let FallingCandles = new Array();
    let ScrollingElements = new Array();
    let NextCandleSpawnDelay = 80;
    let TextSpawnDelay = 0.5;
    let CardsSpawnDelay = 0;
    let CardSpawnDelay = 1.5;
    let AvatarsSpawnDelay = 0;
    let AvatarSpawnDelay = 4;
    let NextCardIndex = 0;
    let NextAvatarIndex = 0;
    let animationId;
    function AnimationLoop() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastFrameTime)/1000;
        lastFrameTime = currentTime;
        if (CurrentStage >=2) 
            ActivationTIme += deltaTime;

        //Background
        if (BackgroundScroll) {
            let computedStyle1 = getComputedStyle(document.getElementById("BackgroundPart1"));
            document.getElementById("BackgroundPart1").style.backgroundPositionY = (parseFloat(computedStyle1.backgroundPositionY)!=null?parseFloat(computedStyle1.backgroundPositionY):0)+deltaTime*(-ScrollSpeed)+"px";
            let computedStyle2 = getComputedStyle(document.getElementById("BackgroundPart2"));
            document.getElementById("BackgroundPart2").style.backgroundPositionY = (parseFloat(computedStyle2.backgroundPositionY)!=null?parseFloat(computedStyle2.backgroundPositionY):0)+deltaTime*(-ScrollSpeed)+"px";
        }
        
        // Falling Random Candles
        if (NextCandleSpawnDelay<=0 && BackgroundScroll) {
            NextCandleSpawnDelay = 400;
            let FallingCandle = document.createElement("div");
            FallingCandle.classList.add("FallingCandle");
            FallingCandle.style.bottom = "0px";
            FallingCandle.style.left = "50%";
            document.getElementById("CandleHolderPart1").appendChild(FallingCandle);
            FallingCandles.push(FallingCandle);

            let FallingCandle2 = document.createElement("div");
            FallingCandle2.classList.add("FallingCandle");
            FallingCandle2.style.bottom = "0px";
            FallingCandle2.style.left = "50%";
            document.getElementById("CandleHolderPart2").appendChild(FallingCandle2);
            FallingCandles.push(FallingCandle2);
        } else if (BackgroundScroll) {
            NextCandleSpawnDelay -= deltaTime * ScrollSpeed;
        }
        for (let i = 0; i < FallingCandles.length && BackgroundScroll; i++) {
            let computedStyle = getComputedStyle(FallingCandles[i]);
            if (parseFloat(computedStyle.bottom)-FallingCandles[i].offsetHeight>=document.getElementById("Background").offsetHeight) {
                FallingCandles[i].remove();
                FallingCandles.splice(i,1);
                i--;
            } else {
                FallingCandles[i].style.bottom = parseFloat(computedStyle.bottom) + deltaTime*ScrollSpeed + "px";
                if (FallingCandles[i].children.length<=0 && parseFloat(computedStyle.bottom) >= 60) { // Remove Flame
                    let Flame = document.createElement("img");
                    Flame.src = base+"/images/Fire.png";
                    Flame.classList.add("Flame");
                    FallingCandles[i].appendChild(Flame);
                }
            }
        }
        for (let i = 0; i < ScrollingElements.length && BackgroundScroll; i++) {
            if (ScrollingElements[i] == null) {
                ScrollingElements.splice(i,1);
                i--;
            } else {
                let computedStyle = getComputedStyle(ScrollingElements[i]);
                if (ScrollingElements[i].direction == "down") {
                    if (parseFloat(computedStyle.top)-10-ScrollingElements[i].offsetHeight>=document.getElementById("Background").offsetHeight) {
                        ScrollingElements[i].remove();
                        ScrollingElements.splice(i,1);
                        i--;
                    } else {
                        ScrollingElements[i].style.top = parseFloat(computedStyle.top) + deltaTime*ScrollSpeed*ScrollingElements[i].scrollSpeed + "px";
                    }
                } else {
                    if (parseFloat(computedStyle.bottom)-10-ScrollingElements[i].offsetHeight>=document.getElementById("Background").offsetHeight) {
                        ScrollingElements[i].remove();
                        ScrollingElements.splice(i,1);
                        i--;
                    } else {
                        ScrollingElements[i].style.bottom = parseFloat(computedStyle.bottom) + deltaTime*ScrollSpeed + "px";
                    }
                }
            }
            
        }
        if (CurrentStage==0 && ScrollingElements.length > 0 && parseFloat(getComputedStyle(ScrollingElements[0]).bottom)>=document.getElementById("Background").offsetHeight/2+ScrollingElements[0].offsetHeight/2) {
            CurrentStage++;
            BackgroundScroll = false;
            OpenBackground();
            setTimeout(()=>{
                document.getElementById("BattleCardsLogoLeft").style.filter = "opacity(0)";
                document.getElementById("BattleCardsLogoRight").style.filter = "opacity(0)";
                document.getElementById("LeopardenBobLogo").style.display = "block";
                setTimeout(()=>{
                    document.getElementById("LeopardenBobLogo").style.top = "25%";
                    document.getElementById("FelixLogo").style.display = "block";
                    setTimeout(()=>{
                        CloseBackground();
                        setTimeout(()=>{
                            BackgroundScroll = true;
                            setTimeout(()=>{
                                CurrentStage++;
                            },1000)
                        },3400)
                    },5500)
                },5500)
            },2000);
            ScrollSpeed = 40;
        }
        if (CurrentStage == 2) {
            if (CreditText.Stage<CreditText.Stages.length) {
                if (TextSpawnDelay <= 0) {
                    TextSpawnDelay = CreditText.Stages[CreditText.Stage].NextSpawnDelay;
                    let Holder = document.createElement("p");
                    Holder.innerHTML += "<h1 style='margin-bottom:0;'>"+CreditText.Stages[CreditText.Stage].Title+"</h1>"
                    Holder.innerHTML += CreditText.Stages[CreditText.Stage].Text;
                    document.getElementById("ScrollTextHolder").appendChild(Holder);
                    ScrollingElements.push(Holder);
                    CreditText.Stage++;
                } else {
                    TextSpawnDelay -= deltaTime * ScrollSpeed;
                }
                if (typeof CreditText.Stages[CreditText.Stage]?.SpawnCards == "boolean") {
                    SpawnCards = CreditText.Stages[CreditText.Stage].SpawnCards;
                }
            } else {
                CurrentStage++;
            }
        }
        if (SpawnCards) {
            if (CardsSpawnDelay>0) {
                CardsSpawnDelay-=deltaTime;
            } else {
                // Spawn card
                if (cards.length>NextCardIndex) {
                    const NextCard = cards[NextCardIndex];
                    const CardHolder = document.getElementById("ScrollCardHolder");
                    let cardInstance  = new Card({
                        target: CardHolder,  // The DOM element where the component will be rendered
                        props: {
                            cardData: NextCard,
                            isStone: false,
                            isUnknownCard: false
                        }
                    });
                    let element = CardHolder.children[CardHolder.children.length-1];
                    NextCardIndex++;
                    element.direction = "down";
                    element.scrollSpeed = 4;
                    element.style.left = `${Math.random()*100}%`;
                    element.style.top = "-100px";
                    ScrollingElements.push(element);
                }

                CardsSpawnDelay = CardSpawnDelay;
            }
            if (AvatarsSpawnDelay>0) {
                AvatarsSpawnDelay -= deltaTime;
            } else {
                // Spawn avatar
                if (avatars.length>NextAvatarIndex) {
                    const NextAvatar = avatars[NextAvatarIndex];
                    const CardHolder = document.getElementById("ScrollCardHolder");
                    let avatarInstance  = new Card({
                        target: CardHolder,  // The DOM element where the component will be rendered
                        props: {
                            cardData: NextAvatar,
                            isStone: true,
                            isUnknownCard: false
                        }
                    });
                    NextAvatarIndex++;
                    let element = CardHolder.children[CardHolder.children.length-1];
                    element.direction = "down";
                    element.scrollSpeed = 2;
                    element.style.left = `${Math.random()*100}%`;
                    element.style.top = "-100px";
                    ScrollingElements.push(element);
                }

                AvatarsSpawnDelay = AvatarSpawnDelay;
            }
        }
        if (CurrentStage == 3 && ScrollingElements.length == 0)
            window.location.href = base;
            //CurrentStage = 0;
        animationId = requestAnimationFrame(AnimationLoop);
    }
    function OpenBackground() {
        let Part1 = document.getElementById("BackgroundPart1");
        Part1.style.right = "100%";
        Part1.style.left = "-50%";
        let Part2 = document.getElementById("BackgroundPart2");
        Part2.style.left = "100%";
        Part2.style.right = "-50%";
    }
    function CloseBackground() {
        let Part1 = document.getElementById("BackgroundPart1");
        Part1.style.right = "50%";
        Part1.style.left = "0%";
        let Part2 = document.getElementById("BackgroundPart2");
        Part2.style.left = "50%";
        Part2.style.right = "0%";
    }
    function BlackOut() {
        let BlackOut = document.getElementById("BlackOut");
    }
    function FlashBang() {
        let FlashBang = document.getElementById("FlashBang");
    }
    onMount(async() => {
        const cardRequest = await fetch(window.location.origin+base+'/api/data/cards', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        const avatarRequest = await fetch(window.location.origin+base+'/api/data/avatars', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        cards = await cardRequest.json();
        avatars = await avatarRequest.json();

        ScrollingElements.push(document.getElementById("BattleCardsLogoLeft"));
        ScrollingElements.push(document.getElementById("BattleCardsLogoRight"));
        AnimationLoop();
        return ()=>{
            cancelAnimationFrame(animationId);
        }
    });
    onDestroy(()=>{
        if (animationId)
            cancelAnimationFrame(animationId);

        ScrollingElements.forEach(element=>{
            element.remove();
        })
    })
</script>