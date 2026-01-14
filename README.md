# inCruises Landing Page

## Panoramica

Questa è una **landing page completa e pronta all'uso** per raccogliere richieste di clienti su offerte di viaggio scontato con inCruises. La pagina è completamente responsive, professionale e integrata con Google Sheets per la raccolta automatica dei dati.

## Funzionalità

- ✅ **Design Professionale e Responsive** - Funziona perfettamente su desktop, tablet e dispositivi mobili
- ✅ **Modulo di Richiesta Completo** - Raccoglie tutte le informazioni necessarie dai clienti
- ✅ **Integrazione Google Sheets** - I dati vengono salvati automaticamente in un Foglio Google
- ✅ **Validazione Modulo** - Controllo dei dati lato client con messaggi di errore personalizzati
- ✅ **Notifiche di Successo** - Feedback visivo all'utente dopo l'invio del modulo
- ✅ **GitHub Pages Deployment** - Deployata live e pronta all'uso
- ✅ **Personalizzabile** - Facile da modificare e adattare alle tue esigenze

## Campi Modulo

La landing page raccoglie i seguenti dati:

- **Data Richiesta** - Catturata automaticamente
- **Nome Completo** - Nome del cliente
- **Email** - Indirizzo email
- **Telefono** - Numero di telefono (opzionale)
- **Tipo di Viaggio** - Crociera, Hotel, Tour, Pacchetto o Altro
- **Destinazione Preferita** - Destinazione desiderata
- **Budget** - Fascia di prezzo in euro
- **Periodo Preferito** - Mese/anno del viaggio
- **Messaggio** - Domande o commenti aggiuntivi

## Installazione Rapida

### 1. Visualizza la Landing Page

La pagina è già deployata e live:

**[Accedi a: https://danielmacsan.github.io/incruises-landing/](https://danielmacsan.github.io/incruises-landing/)**

### 2. Configura Google Sheets

Segui la [Guida di Configurazione](SETUP_GOOGLE_SHEETS.md) per:
- Creare un Foglio Google
- Impostare Google Apps Script
- Collegare il modulo alla foglio

### 3. Leggi la Guida Rapida

Vedi [QUICKSTART.md](QUICKSTART.md) per istruzioni passo passo in 5 minuti.

## Struttura Progetto

```
incruises-landing/
├── index.html                      # Landing page principale
├── google-sheets-integration.js    # Modulo JavaScript per integrazione
├── SETUP_GOOGLE_SHEETS.md          # Guida di configurazione dettagliata
├── QUICKSTART.md                   # Guida rapida in 5 minuti
├── README.md                       # Questo file
└── incruises_landing_page.html    # Versione alternativa
```

## Tecnologie Utilizzate

- **HTML5** - Markup semantico
- **CSS3** - Design responsive con gradients e animazioni
- **JavaScript (ES6+)** - Validazione modulo e integrazione dati
- **Google Sheets API** - Salvataggio automatico dei dati
- **Google Apps Script** - Backend serverless
- **GitHub Pages** - Hosting gratuito

## Personalizzazione

### Modificare i Colori

Edita la sezione `<style>` in `index.html` per modificare i colori del tema.

### Aggiungere Nuovi Campi

1. Aggiungi il campo HTML nel modulo
2. Aggiungi la colonna nel Foglio Google
3. Aggiorna il JavaScript in `google-sheets-integration.js`

### Modificare Testi

Edita il contenuto HTML per personalizzare i messaggi e le descrizioni.

## Risoluzione Problemi

### Il modulo non viene inviato
- Verifica che il JavaScript sia abilitato nel browser
- Controlla la console del browser (F12) per gli errori
- Verifica l'URL di Google Apps Script

### I dati non appaiono nel Foglio Google
- Confirma che l'URL di distribuzione sia corretto
- Verifica che le colonne del Foglio Google corrispondano esattamente
- Controlla i registri di Google Apps Script

## Supporto e Documentazione

- **Guida Rapida**: [QUICKSTART.md](QUICKSTART.md)
- **Guida di Configurazione**: [SETUP_GOOGLE_SHEETS.md](SETUP_GOOGLE_SHEETS.md)
- **Modulo JavaScript**: [google-sheets-integration.js](google-sheets-integration.js)
- **Documentazione Google Sheets**: https://developers.google.com/sheets/api
- **Documentazione Google Apps Script**: https://developers.google.com/apps-script

## Licenza

Questo progetto è libero da usare e modificare per il tuo business inCruises.

## Autore

Creato per inCruises - Soluzioni di Marketing per Viaggio a Prezzi Scontati

## Contatti e Supporto

Per supporto tecnico o personalizzazioni, contatta il team di sviluppo.

---

**Pronto a iniziare?**
1. Leggi [QUICKSTART.md](QUICKSTART.md) per una configurazione rapida
2. Segui [SETUP_GOOGLE_SHEETS.md](SETUP_GOOGLE_SHEETS.md) per l'integrazione completa
3. Personalizza i contenuti per il tuo brand
4. Condividi il link con i tuoi clienti!

---

Ultimo aggiornamento: Gennaio 2026
