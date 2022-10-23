# Sonat Skravler

Velkommen skal dere være til fagdag i Svelte og Svelte Kit.
Det er nå tid for å bygge noe kult.

Dette prosjektet er 99% likt som et skaffoldet Svelte prosjekt, med noen få linjer kode lagt til for å gjøre det lettere å  koble seg opp mot Supabase som tar seg av backend delen av denne Chatten.

Her er noen nyttige lenker til Sveltes dokumentasjon.

[DOCS SVELTE](https://svelte.dev/docs)

[DOCS SVELTE KIT](https://kit.svelte.dev/docs/)

## Getting started

Du vil få utdelt en api-nøkkel som lar deg snakke med Supabase.
Denne nøkkelen må sammen med en url legges inn i en `.env`-fil.

- lag en fil som heter `.env` på rotnivå, dvs samme nivå som readme-filen

Det skal legges inn to variabler i denne filen:

```
VITE_SUPABASE_URL="https://mvmzdxdcvcswwhsldezm.supabase.co"
VITE_SUPABASE_ANON_KEY=Nøkkel-du-får-utdelt
```

Etter dette (eller før) er det bare til å kjøre gode gamle:

```
npm install
npm run dev
```

Modellen som ligger i Supabase ser slik ut:

```mermaid
    erDiagram

    Messages }o--o| Topic : have
    Messages {
        int id
        text user
        timestampz user
        text message
        int reply_to
    } 
    Topic {
        int id
        text name
    }

```

Det ligger noen ferdiglagde spørringer i `lib/supabaseQueries.js`.

Disse kan brukes direkte, eller brukes som inspirasjon til egne spørringer

En står fritt frem til å gå egne veier med denne oppgaven, men her er noen forslag til features som kan implementeres.

### Forslag til features
- Vis frem alle meldinger som finnes i chatten
- Lag input felt og knapp for å sende dine egne meldinger til chatten
- Gjør slik at en ikke trenger skrive inn brukernavn hver gang/brukernavn autofylles inn
- Lag mulighet for å svare på en melding (bruk reply_to feltet for en Message)
- Legg på styling så en kan se hvilke meldinger som er svar/replies
- Lag felt for å opprette en Topic
- Lag egne rom med meldinger som bare hører til i samme Topic
- Legg til animasjoner for når det kommer inn nye meldinger
- Mulighet for å søke etter meldinger på innhold eller brukernavn
- Sortere meldinger etter tid/bruker
