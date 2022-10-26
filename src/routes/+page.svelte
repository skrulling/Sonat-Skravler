<script>
  import { onMount } from 'svelte'
  import { supabase } from '../lib/supabaseClient'
  import { LoadAllMessages } from '../lib/supabaseQueries'

  let messages = []

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
  console.log(messages);

  // Setting up realtime listening for new messages
  supabase
    .from('Messages')
    .on('INSERT', handleInserts)
    .on('DELETE', handleDelete)
    .subscribe()
  })

</script>
<h1>Velkommen til Sonat Skravler</h1>
<br>
<p>Dette er for øyeblikket en nesten helt tom side</p>
<p>Målet med denne oppgaven er at du skal lage din egen Chat app ved bruk av Svelte 🔥</p>
<br>
<p>Om du tar en titt i console log, så skal det ligge noen meldinger der, dersom ting er satt riktig opp</p>
<p>Du står fritt frem til å lage hva du vil. Det ligger noen forslag til features i README.</p>
<p>Vi foreslår at du begynner med å vise frem de eksisterende meldingene på skjermen, så kan du se om du får sendt noe meldinger selv 😎</p>
<br>
<p>Lykke til! 🙌</p>
