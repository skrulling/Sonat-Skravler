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
<div class="flex flex-col gap-4">
  {#each messages as message}
    <div class="rounded-lg bg-indigo-500 p-2">
      <div class="container center-vert">
        <p class="username">{message.user}</p>
        <p class="date">{new Date(message.created_at).toLocaleString()}</p>
      </div>
      <p>{message.message}</p>
    </div>
  {/each}
</div>

<div class="grid gap-6 mb-6 md-grid-cols-1 mt-16 bg-gray-800 rounded-lg p-5">
  <div>
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
    <input bind:value={userName} type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John..." required>
  </div>
  <div>
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Message</label>
    <input bind:value={messageText} type="text" id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your awesome message" required>
  </div>
  <button on:click={() => SendMessage(userName, messageText)} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
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
