# Guida Rapida - Landing Page inCruises

## Panoramica
Questa è una soluzione completa per raccogliere richieste di clienti su offerte di viaggio scontato. La landing page è completamente funzionale e pronta per il deployment.

## Cosa Ottieni

✅ **Landing Page** (`index.html`)
- Design responsivo e professionale
- Tutti i campi modulo necessari
- Interfaccia ottimizzata per dispositivi mobili
- Deployment live tramite GitHub Pages

✅ **Integrazione Google Sheets** (`google-sheets-integration.js`)
- Modulo JavaScript standalone
- Convalida del modulo
- Gestione degli errori
- Notifiche di successo

✅ **Documentazione**
- Guida di configurazione completa (SETUP_GOOGLE_SHEETS.md)
- Questa guida rapida
- Commenti nel codice

## Configurazione Rapida (5 Minuti)

### Passaggio 1: Visualizza la tua Landing Page

La tua landing page è già deployata e live!

Accedi a: `https://danielmacsan.github.io/incruises-landing/`

### Passaggio 2: Configura Google Sheets

1. Vai a [Google Sheets](https://sheets.google.com)
2. Crea un nuovo foglio di lavoro
3. Nominalo: **"Richieste inCruises"**
4. Aggiungi questi intestazioni di colonna nella riga 1:
   - A1: `Data Richiesta`
   - B1: `Nome Completo`
   - C1: `Email`
   - D1: `Telefono`
   - E1: `Tipo di Viaggio`
   - F1: `Destinazione Preferita`
   - G1: `Budget`
   - H1: `Periodo`
   - I1: `Messaggio`

### Passaggio 3: Crea Google Apps Script

1. Nel tuo Foglio Google, vai a **Strumenti → Editor di script**
2. Elimina il codice esistente
3. Copia e incolla questo script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var row = [
      new Date().toLocaleString('it-IT'),
      data.nome || '',
      data.email || '',
      data.telefono || '',
      data.tipo_viaggio || '',
      data.destinazione || '',
      data.budget || '',
      data.periodo || '',
      data.messaggio || ''
    ];
    
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Errore: ' + error);
    return ContentService.createTextOutput(JSON.stringify({success: false}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Salvalo (nominalo "Gestore Modulo inCruises")
5. Fai clic su **Distribuisci → Nuova distribuzione**
6. Seleziona tipo: **App Web**
7. Imposta "Esegui come" al tuo account
8. Imposta "Chi ha accesso" su **Tutti**
9. Fai clic su **Distribuisci**
10. **Copia l'URL di distribuzione** (simile a `https://script.google.com/macros/d/XXXXX/userweb`)

### Passaggio 4: Configura il Modulo

#### Opzione A: Usando Formspree (Più facile)

1. Vai a [Formspree](https://formspree.io)
2. Crea un nuovo modulo
3. Imposta l'endpoint sulla tua email
4. Modifica `index.html`
5. Trova il tag `<form>`
6. Cambialo con:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### Opzione B: Usando Google Apps Script (Consigliato)

1. Modifica `index.html`
2. Trova la riga: `<form id="inquiryForm">`
3. Aggiungi `onsubmit="submitInquiryForm(event)"`
4. Aggiungi questo prima di `</body>`:
   ```html
   <script src="google-sheets-integration.js"></script>
   <script>
     // Configura il tuo URL di Google Apps Script
     const GOOGLE_SHEETS_DEPLOYMENT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb';
   </script>
   ```
5. Sostituisci `YOUR_SCRIPT_ID` con il tuo ID Script reale dal Passaggio 3

### Passaggio 5: Testa!

1. Apri la tua landing page
2. Completa il modulo
3. Fai clic su "Invia Richiesta"
4. Dovresti vedere un messaggio di successo
5. Controlla il tuo Foglio Google - i dati dovrebbero apparire!

## Struttura File

```
incruises-landing/
├── index.html                      # Landing page principale
├── google-sheets-integration.js    # Script di gestione modulo
├── SETUP_GOOGLE_SHEETS.md          # Guida di configurazione dettagliata
├── QUICKSTART.md                   # Questa guida
└── README.md                       # Panoramica del progetto
```

## Risoluzione Problemi

### "Il modulo non viene inviato"
- Controlla la console del browser per gli errori (F12)
- Verifica che l'URL di Google Apps Script sia corretto
- Assicurati che la distribuzione sia impostata su "Tutti" l'accesso

### "I dati non appaiono nel Foglio"
- Conferma l'URL di distribuzione nel modulo
- Controlla i registri di esecuzione di Google Apps Script
- Verifica che gli intestazioni di colonna corrispondano esattamente

### "Errori CORS"
- Google Apps Scripts richiede `mode: 'no-cors'`
- Questo è già configurato in `google-sheets-integration.js`

## Personalizzazione

### Modificare i Campi del Modulo
Modifica `index.html` per aggiungere/rimuovere campi del modulo. Ricorda di:
1. Aggiornare il modulo HTML
2. Aggiornare gli intestazioni di colonna nel Foglio Google
3. Aggiornare il JavaScript in entrambi i file

### Personalizzazione dello Stile
Tutto lo stile è nella sezione `<style>` di `index.html`. Modifica colori, caratteri e layout lì.

### Aggiungi Reindirizzamento Dopo l'Invio
Scommenta questo in `google-sheets-integration.js`:
```javascript
setTimeout(() => {
    window.location.href = '/grazie.html';
}, 2000);
```

## Passaggi Successivi

1. ✅ Distribuisci la landing page (già fatto!)
2. ✅ Configura Google Sheets
3. ✅ Crea Google Apps Script
4. ✅ Testa il modulo
5. Condividi il link con i clienti: `https://danielmacsan.github.io/incruises-landing/`

## Supporto

Per informazioni dettagliate, vedi:
- [SETUP_GOOGLE_SHEETS.md](SETUP_GOOGLE_SHEETS.md) - Guida di configurazione completa
- [Documentazione Google Apps Script](https://developers.google.com/apps-script)
- [Documentazione Formspree](https://formspree.io/docs) (alternativa)

## Licenza

Libero da usare e modificare per il tuo business inCruises.

---

**Pronto a raccogliere richieste? Inizia dal Passaggio 1 sopra!** 🚀
