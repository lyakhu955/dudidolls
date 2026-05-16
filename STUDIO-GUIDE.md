# Guida — Usare Sanity Studio

## Metodo 1: Studio nel sito (più comodo per te)

Quando il sito è online, vai su:

```
https://dudidolls.vercel.app/studio
```

In locale:

```bash
npm run dev
# poi apri http://localhost:3000/studio
```

> Funziona subito, senza deploy aggiuntivi.

---

## Metodo 2: Studio su sanity.io (da qualsiasi dispositivo)

### Passo 1 — Deploy dello Studio

Apri il terminale nella cartella del progetto ed esegui:

```bash
npx sanity@latest deploy
```

Ti chiederà di fare login con il tuo account Sanity (quello che hai usato per creare il progetto). Dopo il login, lo Studio verrà caricato su:

```
https://tu17xem4.sanity.studio
```

### Passo 2 — Modificare le bambole

1. Vai su [https://www.sanity.io/manage/project/tu17xem4](https://www.sanity.io/manage/project/tu17xem4)
2. Nel menu a sinistra clicca **"Content"**
3. Vedrai l'elenco delle bambole
4. Clicca una bambola per modificarla

---

## Cosa puoi fare dallo Studio

| Azione | Come si fa |
|--------|------------|
| **Cambiare prezzo** | Apri la bambola → modifica il campo `price` → clicca **Publish** |
| **Marcare come venduta** | Spunta il campo `sold` → **Publish** |
| **Cambiare descrizione** | Modifica il campo `desc` → **Publish** |
| **Aggiungere foto** | Clicca il campo `images` → **Upload** → scegli file → **Publish** |
| **Aggiungere una nuova bambola** | Clicca **"+"** in alto → scegli "Bambola" → compila i campi → **Publish** |
| **Cambiare tag** | Menu a tendina `tag` → scegli "Nuova", "Rara" o nessuno → **Publish** |

> ⚠️ **Importante**: dopo ogni modifica clicca sempre il pulsante verde **"Publish"** in basso a destra. Se lasci in "Draft", le modifiche non appaiono sul sito.

---

## Aggiungere un collaboratore

Se vuoi che Simona (o altri) gestiscano le bambola senza usare il tuo account:

1. Vai su [https://www.sanity.io/manage/project/tu17xem4](https://www.sanity.io/manage/project/tu17xem4)
2. Clicca **"Members"** nel menu laterale
3. Clicca **"Invite member"**
4. Inserisci l'email di Simona
5. Ruolo consigliato: **Editor** (può modificare contenuti ma non cancellare il progetto)

---

## Aggiornare il sito dopo le modifiche

- **In locale** (`npm run dev`): le modifiche si vedono subito al refresh della pagina
- **Online** (Vercel): dopo aver modificato le bambole su Sanity, fai un redeploy su Vercel per vedere i cambiamenti

Per evitare il redeploy manuale, chiedimi di aggiungere l'**ISR** (aggiornamento automatico ogni X minuti).
