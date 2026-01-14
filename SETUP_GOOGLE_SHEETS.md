# Guida di Configurazione: Collegare la Landing Page inCruises a Google Sheets

## Panoramica
Questa guida spiega come collegare il modulo della landing page inCruises a un Foglio Google per raccogliere automaticamente richieste di clienti su offerte di viaggio scontato.

## Funzionalità Incluse

La landing page include i seguenti campi:

- **Data Richiesta** - Catturata automaticamente
- **Nome Completo** - Nome del cliente
- **Email** - Indirizzo email del cliente
- **Telefono** - Numero di telefono opzionale
- **Tipo di Viaggio** - Crociera/Hotel/Tour/Pacchetto/Altro
- **Destinazione Preferita** - Preferenza di destinazione del cliente
- **Budget Approssimativo** - Fascia di prezzo in euro
- **Periodo Preferito** - Mese/anno del viaggio
- **Messaggio** - Commenti o domande aggiuntive

## Passaggio 1: Crea un Foglio Google

1. Vai a [Google Sheets](https://sheets.google.com)
2. Fai clic su "+ Crea" per avviare un nuovo foglio di lavoro
3. Nominalo: "Richieste inCruises"
4. Crea gli intestazioni di colonna nella prima riga:
   - A1: Data Richiesta
   - B1: Nome Completo
   - C1: Email
   - D1: Telefono
   - E1: Tipo di Viaggio
   - F1: Destinazione Preferita
   - G1: Budget
   - H1: Periodo
   - I1: Messaggio

## Passaggio 2: Crea un Google Apps Script

1. Nel tuo Foglio Google, vai a **Strumenti → Editor di script**
2. Sostituisci tutto il codice con il seguente script:

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
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Salva lo script con un nome come "Gestore Modulo inCruises"
4. Fai clic su **Distribuisci → Nuova distribuzione**
5. Scegli tipo: **App Web**
6. Imposta "Esegui come" al tuo account Google
7. Imposta "Chi ha accesso" su **Tutti**
8. Fai clic su **Distribuisci**
9. Copia l'URL di distribuzione (simile a: `https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb`)

## Passaggio 3: Aggiorna il Modulo HTML

1. Apri il file `index.html`
2. Trova la riga con `<form id="inquiryForm">`
3. Sostituiscila con:

```html
<form id="inquiryForm" onsubmit="submitInquiryForm(event)">
```

4. Trova il tag di chiusura `</form>` e aggiungi questo codice JavaScript prima di `</body>`:

```html
<script src="google-sheets-integration.js"></script>
<script>
  // Sostituisci con l'URL di distribuzione di Google Apps Script
  const GOOGLE_SHEETS_DEPLOYMENT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb';
</script>
```

## Passaggio 4: Ottieni il tuo ID Script

1. Torna a Google Apps Script
2. Copia l'ID del progetto dalle impostazioni del progetto
3. L'URL di distribuzione dovrebbe essere: `https://script.google.com/macros/d/YOUR_PROJECT_ID/userweb`

## Passaggio 5: Testa il Modulo

1. Distribuisci la landing page aggiornata
2. Compila il modulo sulla landing page
3. Fai clic su "Invia Richiesta"
4. Controlla il tuo Foglio Google - i dati dovrebbero apparire automaticamente!

## Risoluzione dei Problemi

- **I dati non appaiono**: Controlla che l'URL di distribuzione di Google Apps Script sia corretto
- **Errori CORS**: Assicurati che la distribuzione sia impostata su "Tutti" l'accesso
- **Problemi di formato della data**: Controlla la console del browser per gli errori JavaScript

## Note di Sicurezza

Questa configurazione è adatta per raccogliere richieste di clienti. Per l'uso in produzione con dati sensibili, considera:
- Aggiungere autenticazione
- Usare solo HTTPS
- Implementare il rate limiting
- Aggiungere la convalida dei dati

## Supporto

Per domande su questa configurazione, fai riferimento a:
- [Documentazione di Google Apps Script](https://developers.google.com/apps-script)
- [API di Google Sheets](https://developers.google.com/sheets/api)
- [App Web di Google Apps Script](https://developers.google.com/apps-script/guides/web)
