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
</style>
<img id="logo" src="images/BattlecardsLogo.png" on:click={()=>window.location.href="/"}>

<!--
    IDEAS:
    -setAvatar (users)
    -setDeck (users)
    -setInventory (users)
    -setXp (users)
    -setAdmin (users)
    -setDisplayName (user)

    -resetUsers (users)
    -purgeUsers (users)

    -RESET
    -PURGE
-->


<script>
    import { onMount } from "svelte";
    onMount(async() => {
        const user = await fetch(window.location.origin+'/api/account/login', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        if (user.ok) {
            let ud = await user.json()
            if (!ud.admin) {
                window.location.href = '/login';
            }

            let rootItems = document.getElementsByClassName("RootLocked")
            for (let i = 0; i < rootItems.length; i++) {
                if (ud.root) {
                    rootItems[i].style.display = ""
                } else {
                    rootItems[i].style.display = "none"
                }
            }
        } else {
            window.location.href = '/login';
        }
    })
</script>