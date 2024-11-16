<style>
    :global(.Cooldown) {
        opacity: 0.5;
        filter: brightness(0.5);
    }
    :global(.Text) {
        color: white;
    }
</style>
    <div class="{isStone&&!isUnknownCard?'CharacterStone':(isUnknownCard?'EmptyCard':'Card')} {cardData.cooldown>0?'Cooldown':''}" style="{isStone?`background-image: url('/images/Cards/${cardData.Texture}.png')`+(cardData.type=='Tank'?', url(/images/shield.png)':''):''}">
        {#if isStone && !isUnknownCard}
            <div class="CharacterStoneDMG">
                <TextAutoSizeToArea text="{cardData.Attack}" scaleFactor={0.4}/>
            </div>
            <div class="CharacterStoneHealth">
                <TextAutoSizeToArea text="{cardData.Health}" scaleFactor={0.4}/>
            </div>
        {:else if !isUnknownCard}
            <div class="CardImage" style="background-image:url('/images/Cards/{cardData.Texture}.png')"></div>
            <div class="CardFrame"></div>
            {#if typeof cardData.Attack != "undefiend" && cardData.Attack != null}
                <div class="CardDMG">
                    <TextAutoSizeToArea text="{cardData.Attack}" scaleFactor={0.4}/>
                </div>
            {/if}
            {#if typeof cardData.Health != "undefiend" && cardData.Health != null}
                <div class="CardHealth">
                    <TextAutoSizeToArea text="{cardData.Health}" scaleFactor={0.4}/>
                </div>
            {/if}
            <div class="CardCost">
                <TextAutoSizeToArea text="{cardData.Cost}" scaleFactor={0.4}/>
            </div>
            <div class="CardName">
                <TextAutoSizeToArea text="{cardData.Name}" color="white"/>
            </div>
            <div class="CardDescription">
                <TextAutoSizeToArea text="{cardData.Description}" color="white"/>
            </div>
        {/if}
    </div>
<script>
    import {TextAutoSizeToArea} from '$lib'

    export let cardData = {};
    export let isStone = false;
    export let isUnknownCard = false;
</script>