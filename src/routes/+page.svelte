<script>
  import { onMount } from 'svelte'
  import { supabase } from '../lib/supabaseClient'
  import { LoadAllMessages, SendMessage } from '../lib/supabaseQueries'

  let messages = []
  let messageText = ''
  let userName = ''

  function handleInserts(payload) {
    messages = [...messages, payload.new]
  }

  function handleDelete(payload) {
    messages = [...messages.filter(msg => msg.id !== payload.old.id)]
  }

  onMount(async function(){
  // Fetching all existing messages
  const { data: initialMessages } = await LoadAllMessages()
  messages = initialMessages;

  // Setting up realtime listening for new messages
  supabase
    .from('Messages')
    .on('INSERT', handleInserts)
    .on('DELETE', handleDelete)
    .subscribe()
  })

</script>
<h1>Velkommen til Sonat Skravler</h1>
{#each messages as message}
  <div>
    <div class="container center-vert">
      <p class="username">{message.user}</p>
      <p class="date">{new Date(message.created_at).toLocaleString()}</p>
    </div>
    <p>{message.message}</p>
  </div>
{/each}

<div class="input-area container flex-column">
  <input bind:value={userName} placeholder="Ditt brukername (påkrevd felt)"/>
  <input bind:value={messageText} placeholder="Melding..." type="text"/>
  <button on:click={() => SendMessage(userName, messageText)}>Send melding</button>
</div>

<style>
  .container {
    display: flex;
  }

  .center-vert {
    align-items: center;
  }

  .flex-column {
    flex-direction: column;
  }

  .username {
    font-size: 24px;
    font-weight: bold;
  }

  .date {
    font-style: italic;
    font-weight: lighter;
    margin-left: 10px;
  }
  .input-area {
    max-width: 50vw;
  }
</style>
