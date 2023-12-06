<div id="MesageConteiner">
    {#each Mesages as Mesage}
      <p>{Mesage.Name}: {Mesage.Content}</p>
    {/each}
</div>
<input id="Input" type="text" value="Type Message To Send!">
<button on:click={() => send(document.getElementById("Input").value)}>Send</button>

<script>
    import { onMount } from "svelte";

    var socket

    var Mesages = new Array({Name:"bob",Content:"hellow world!"});
    var UserName = "test";
    function send(message) {
      Mesages.push({Name:UserName,Content:message});
      UpdateChat();
      socket.send(JSON.stringify({Name:UserName,Content:message}));
    }
    function UpdateChat() {
      var Parent = document.getElementById("MesageConteiner");
      for (let i = 0; i < Mesages.length || i < Parent.children.length; i++) {
        var p;
        if (i>= Parent.children.length) { // New Message Found
          p = document.createElement("p");
          p.innerHTML = Mesages[i].Name+": "+ Mesages[i].Content;
          Parent.appendChild(p);
        } else if (i>= Mesages.length) {
          Parent.children[i].remove();
        } else {
          p = Parent.children[i];
          p.innerHTML = Mesages[i].Name+": "+ Mesages[i].Content;
        }
      }
    }

    onMount(() => {
      socket = new WebSocket(`wss://${window.location.host}/api_chat`);

      // Event listener for when the connection is established
      socket.onopen = () => {
        console.log('Connected to server');
      };

      // Event listener for incoming messages from the server
      socket.onmessage = (event) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            // The result property contains the data as a data URL
            const result = event.target.result;

            // You can use the result data as needed
            console.log(JSON.parse(result));
            Mesages.push(JSON.parse(result));
            UpdateChat();
        };
        reader.readAsText(event.data)
      };

      // Event listener for when the connection is closed
      socket.onclose = () => {
        console.log('Connection closed');
      };

      // Event listener for errors
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    })
</script>