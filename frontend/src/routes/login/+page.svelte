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
    }
    #Form {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: rgb(50, 50, 50);
        border-radius: 25px;
        width: 35%;
        max-width: 700px;
        height: 25%;
        outline: 5px gray solid;
    }
    #Form div {
        width: 100%;
        height: fit-content;
    }
    #Form .Label1 {
        color: white;
        top:65px;
        position: absolute;
        left:10%;
    }
    #Form .Input1 {
        color: black;
        top:65px;
        position: absolute;
        left:40%;
        width: 50%;
    }
    #Form .Label2 {
        color: white;
        top:90px;
        position: absolute;
        left:10%;
    }
    #Form .Input2 {
        color: black;
        top:90px;
        position: absolute;
        left:40%;
        width: 50%;
    }
    #Form .Label3 {
        color: white;
        top:115px;
        position: absolute;
        left:10%;
    }
    #Form .Input3 {
        color: black;
        top:115px;
        position: absolute;
        left:40%;
        width: 50%;
    }
    #Form .button {
        top:150px;
        position: absolute;
        left:10%;
    }
    #Form .Title {
        width: 100%;
        text-align:center;
        color:white;
        margin: 0;
    }
    #Form .Error {
        width: 100%;
        text-align:center;
        color:white;
        margin: 0;
        font-size: 24px;
    }

    .hidden {
        display: none;
    }
    .SwitchTab {
        position: absolute;
        top:150px;
        left:10%;
        transform: translate(150px,0);
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
</style>
<div id="Background"></div>
<img id="logo" src="{base}/images/BattlecardsLogo.png">
<div id="Form">
    <div id="Login">
        <h1 class="Title">Login!</h1>
        <p class="Error" id="login_error"></p>
        <label for="login_username" class="Label1">Username</label>
        <input type="text" name="login_username" id="login_username" class="Input1">
        
        <label for="login_password" class="Label2">Password</label>
        <input type="password" name="login_password" id="login_password" class="Input2">
        
        <button on:click={login} class="button">Login</button>
        <button class="SwitchTab" on:click={switchTab}>Signup instead?</button>
    </div>
    <div id="SignUp" class="hidden">
        <h1 class="Title">Sign Up!</h1>
        <p class="Error" id="signup_error"></p>
        <label for="signup_username" class="Label1">Username</label>
        <input type="text" name="signup_username" id="signup_username" class="Input1">
        
        <label for="signup_display_name" class="Label2">Display Name</label>
        <input type="text" name="signup_display_name" id="signup_display_name" class="Input2">
        
        <label for="signup_password" class="Label3">Password</label>
        <input type="password" name="signup_password" id="signup_password" class="Input3">
        
        <button on:click={signup} class="button">Signup</button>
        <button class="SwitchTab" on:click={switchTab}>Login instead?</button>
    </div>
</div>

<script>
    import { onMount } from "svelte";
    import { base } from '$app/paths';

    onMount(async() => {
        const user = await fetch(base+'/api/account/login', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	},
            body: JSON.stringify({
                createTestUser: false
            })
        });
        if (user.ok) {
            window.location.href=base+"/"
        }
        
        document.getElementById('login_password').addEventListener("keypress",(e) => sendOnEnter(e, login))

        document.getElementById('signup_password').addEventListener("keypress",(e) => sendOnEnter(e, signup))
    })

    function switchTab() {
        document.getElementById("Login").classList.toggle("hidden")
        document.getElementById("SignUp").classList.toggle("hidden")
    }

    function sendOnEnter(event, func) {
        if (event.key === 'Enter') {
            func()
        }
    }

    async function login() {
        let username = document.getElementById("login_username").value
        let password = document.getElementById("login_password").value
        const data = await fetch(base+'/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        if (data.ok) {
            window.location.href=base+"/"
        } else {
            document.getElementById("login_error").innerText = await data.text()
        }
    }

    async function signup() {
        let username = document.getElementById("signup_username").value
        let displayName = document.getElementById("signup_display_name").value
        let password = document.getElementById("signup_password").value
        const data = await fetch(base+'/api/account/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                display_name: displayName
            })
        })
        if (data.ok) {
            window.location.href=base+"/tutorial_game?tutorial=Introduction"
        } else {
            document.getElementById("signup_error").innerText = await data.text()
        }
    }
</script>