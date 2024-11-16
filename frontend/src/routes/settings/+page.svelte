<style>
    #logo {
        position: fixed;
        top:0;
        left:0;
        background-color: rgb(50, 50, 50);
        border-radius: 0 0 25px 0;
        outline: 5px black solid;
        width: 350px;
        padding: 0 10px 7.5px 0;
        cursor: pointer;
    }
    #settingsPanel {
        width: 75%;
        height: 75%;
        position: fixed;
        left: 50%;
        top: 55%;
        transform: translate(-50%,-50%);
        border: 5px solid black;
        border-radius: 25px;
        background-color: rgb(50, 50, 50);
        overflow: auto;
        padding: 10px;
        text-align: center;
        color: white;
    }
    h1 {
        margin: 0;
    }
    hr {
        margin: 15px 0 15px 0;
    }
    #passwordError {
        color: red;
        width: 100%;
    }
</style>

<img id="logo" src="{base}/images/BattlecardsLogo.png" on:click={()=>window.location.href=base}>

<div id="settingsPanel">
    <h1>Settings</h1>
    <hr>
    <label for="display_name">Display Name</label>
    <input type="text" id="display_name">
    <hr>
    <p id="passwordError"></p>
    <table style="margin-left: 50%; transform: translate(-50%,0)">
        <tr>
            <td>
                <label for="password">Password</label>
            </td>
            <td>
                <input type="Password" id="password">
            </td>
        </tr>
        <tr>
            <td>
                <label for="new_password">New Password</label>
            </td>
            <td>
                <input type="Password" id="new_password" on:input={identicalPasswordCheck}>
            </td>
        </tr>
        <tr>
            <td>
                <label for="repeat_password">Repeat Password</label>
            </td>
            <td>
                <input type="Password" id="repeat_password" on:input={identicalPasswordCheck}>
            </td>
        </tr>
    </table>
    <button id="update_password">Change Password</button>
</div>

<script>
    import { onMount } from "svelte";
    import { base } from '$app/paths';

    function identicalPasswordCheck() {
        let newPassword = document.getElementById("new_password");
        let repeatPassword = document.getElementById("repeat_password");

        if (newPassword.value != repeatPassword.value)
            document.getElementById("update_password").setAttribute("disabled", true)
        else
            document.getElementById("update_password").removeAttribute("disabled")
    }

    onMount(async () => {
        let user = await fetch(base+'/api/account/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!user.ok)
            window.location.href = base+"/login";

        let ud = await user.json()

        document.getElementById("display_name").value = ud.display_name;

        document.getElementById("display_name").onblur = async () => {
            await fetch(base+'/api/account/setDisplayName', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    display_name: document.getElementById("display_name").value
                })
            });
        }

        document.getElementById("update_password").onclick = async () => {
            let password = document.getElementById("password").value;
            let newPassword = document.getElementById("new_password").value;
            
            let setPassword = await fetch(base+'/api/account/setPassword', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    password: password,
                    newPassword: newPassword
                })
            });

            document.getElementById("password").value = "";
            document.getElementById("new_password").value = "";
            document.getElementById("repeat_password").value = "";

            if (setPassword.ok) {
                document.getElementById("passwordError").innerText = ""
            } else {
                document.getElementById("passwordError").innerText = await setPassword.text()
            }
        }
    })
</script>