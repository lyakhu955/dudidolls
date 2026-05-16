# Guida — Webhook Sanity per aggiornamento istantaneo

## Problema

Quando aggiungi/modifichi/cancelli una bambola su Sanity Studio, il sito non si aggiorna immediatamente perché Next.js genera le pagine a build time.

## Soluzione: Webhook + On-Demand Revalidation

Quando salvi una bambola su Sanity, il CMS chiama automaticamente il sito e gli dice: "rigenera le pagine". Così la modifica è visibile in **2-3 secondi**.

---

## Passo 1: Aggiorna le env vars su Vercel

Carica di nuovo il file `.env` su Vercel (ora contiene anche `REVALIDATE_SECRET`) oppure aggiungi manualmente:

```
REVALIDATE_SECRET=877f606b0bd9aca51fed80e7b400475c7c3b579ea923210df485bc35160651b0
```

Poi fai un **Redeploy**.

---

## Passo 2: Configura il webhook su Sanity

1. Vai su: [https://www.sanity.io/manage/project/tu17xem4/api/webhooks](https://www.sanity.io/manage/project/tu17xem4/api/webhooks)
2. Clicca **"Add webhook"**
3. Compila così:

| Campo | Valore |
|-------|--------|
| **Name** | `Aggiorna sito dudidolls` |
| **URL** | `https://dudidolls.vercel.app/api/revalidate?secret=877f606b0bd9aca51fed80e7b400475c7c3b579ea923210df485bc35160651b0` |
| **Dataset** | `production` |
| **Trigger on** | ✅ Create / ✅ Update / ✅ Delete |
| **Projection** | `{ "_id": _id, "_type": _type, "id": id }` |
| **Status** | ✅ Enabled |
| **HTTP Method** | `POST` |
| **HTTP Headers** | lascia vuoto |
| **Secret** | lascia vuoto (usiamo il token in query string) |

4. Clicca **"Save"**

---

## Passo 3: Test

1. Vai su [dudidolls.sanity.studio](https://dudidolls.sanity.studio)
2. Apri una bambola e cambia il nome
3. Clicca **Publish**
4. Aspetta **2-3 secondi**
5. Aggiorna il sito live → vedi il cambiamento istantaneo

---

## Cosa fa tecnicamente

- Salvi la bambola su Sanity
- Sanity chiama `https://dudidolls.vercel.app/api/revalidate`
- Next.js invalida la cache della homepage (`/`) e della pagina prodotto (`/product/nome-bambola`)
- La prossima visita al sito mostra i dati aggiornati

> **Nota**: se aggiungi una bambola **nuova** (non esistente prima), la pagina `/product/nuova-bambola` verrà generata al volo quando qualcuno la visita (grazie a `dynamicParams = true`). Per farla apparire nella homepage, basta visitare la homepage dopo 2-3 secondi dal salvataggio.
