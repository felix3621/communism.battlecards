<style lang="less">
    .Text {
      margin: 0;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      text-align: center;
      align-items: center;
      overflow: hidden;
      overflow-wrap: break-word; /* Forces a line break within words */


      p {
        text-align: center;
        width: min-content;
        margin: 0;
        white-space: normal; /* Allows line breaks */
        -webkit-text-stroke-width: 0.2px;
        -webkit-text-stroke-color: black;
        font-weight: 1000;
      }
    }
</style>
    <div class="Text" bind:this={textHolder}>
        <p style="color: {color};" bind:this={textElement}>{text}</p>
    </div>
<script>
    import {onMount} from "svelte";
    let textHolder;
    let textElement;
    export let text = "";
    export let color = "black";
    export let scaleFactor = 1;
    onMount(()=>{
        onResize();
        new ResizeObserver(onResize).observe(textHolder);
    });
    function onResize() {
        if (!textElement) return;
        getFontSize(textElement);
    }
    function getFontSize(Element) {
        let i1 = 1 // let's start with 12px
        let overflow = false
        const maxSize = 200 // very huge text size
        while (!overflow && i1 < maxSize) {
            Element.style.fontSize = `${i1}px`;
            overflow = isOverflown(Element.parentNode);
            if (!overflow) i1++
        }

        // revert to last state where no overflow happened:
        Element.style.fontSize = `${i1*scaleFactor - 1}px`;
    }
    function isOverflown(element) {
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }
</script>