<style lang="less">
  #ErrorPanel {
    position: absolute;
    top: 0;
    right: 0;
    width: 250px;
    background: rgb(25,25,25);
    border: 2px solid rgb(75,75,75);
    display: flex;
    flex-direction: column-reverse;
  }

  :global(#ErrorPanel > div) {
    float: right;
    padding: 10px;
    background: rgb(125,0,0);
    border: 3px solid rgb(255,0,0);
    color: white;

    p {
      width: 100%;
      margin: 0;
      color: red;
    }
  }
</style>
<Styles/>
<slot />

{#if $Errors.length > 0}
    <div id="ErrorPanel">
        {#each $Errors as error}
            <div>
                <p>{error.text}</p>
            </div>
        {/each}
    </div>
{/if}
<script>
    import { Errors } from '$lib';
    import { Styles } from '$lib'
    import { onMount, onDestroy } from "svelte";

    onMount(()=>{
        animationId = requestAnimationFrame(AnimationLoop);
    });
    onDestroy(()=>{
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

        animationId = requestAnimationFrame(AnimationLoop);
    }
</script>