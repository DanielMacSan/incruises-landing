# Setup Guide: Connect inCruises Landing Page to Google Sheets

## Overview
This guide explains how to connect the inCruises landing page form to a Google Sheet to automatically collect customer inquiries about discounted travel offers.

## Features Included

The landing page includes the following fields:

- **Data Richiesta** (Request Date) - Automatically captured
- **Nome Completo** (Full Name) - Customer name
- **Email** - Customer email address
- **Telefono** (Phone) - Optional phone number
- **Tipo di Viaggio** (Travel Type) - Crociera/Hotel/Tour/Pacchetto/Altro
- **Destinazione Preferita** (Preferred Destination) - Customer destination preference
- **Budget Approssimativo** (Approximate Budget) - Price range in euros
- **Periodo Preferito** (Preferred Period) - Travel month/year
- **Messaggio** (Message) - Additional comments or questions

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "+ Create" to start a new spreadsheet
3. Name it: "inCruises Customer Inquiries"
4. Create column headers in the first row:
   - A1: Data Richiesta
   - B1: Nome Completo
   - C1: Email
   - D1: Telefono
   - E1: Tipo di Viaggio
   - F1: Destinazione Preferita
   - G1: Budget
   - H1: Periodo
   - I1: Messaggio

## Step 2: Create a Google Apps Script

1. In your Google Sheet, go to **Tools** → **Script editor**
2. Replace all code with the following script:

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
    Logger.log('Error: ' + error);
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Save the script with a name like "inCruises Form Handler"
4. Click **Deploy** → **New deployment**
5. Choose type: **Web app**
6. Set "Execute as" to your Google account
7. Set "Who has access" to **Anyone**
8. Click **Deploy**
9. Copy the deployment URL (it looks like: `https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb`)

## Step 3: Update the HTML Form

1. Open the `index.html` file
2. Find the line with `<form id="inquiryForm">`
3. Replace it with (using your deployment URL):

```html
<form id="inquiryForm" onsubmit="submitForm(event)">
```

4. Find the closing `</form>` tag and add this JavaScript code before `</body>`:

```html
<script>
function submitForm(event) {
    event.preventDefault();
    
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        data_richiesta: document.getElementById('data_richiesta').value,
        tipo_viaggio: document.getElementById('tipo_viaggio').value,
        destinazione: document.getElementById('destinazione').value,
        budget: document.getElementById('budget').value,
        periodo: document.getElementById('periodo').value,
        messaggio: document.getElementById('messaggio').value
    };
    
    // Replace with your Google Apps Script deployment URL
    const deploymentUrl = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb';
    
    fetch(deploymentUrl, {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Grazie per la tua richiesta! Ti contatteremo presto.');
            document.getElementById('inquiryForm').reset();
        } else {
            alert('Errore nell\'invio del modulo. Per favore riprova.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Errore di connessione. Per favore riprova.');
    });
}
</script>
```

## Step 4: Get Your Script ID

1. Go back to your Google Apps Script
2. Copy the Project ID from the project settings
3. Your deployment URL should be: `https://script.google.com/macros/d/YOUR_PROJECT_ID/userweb`

## Step 5: Test the Form

1. Deploy the updated HTML page
2. Fill out the form on the landing page
3. Click "Invia Richiesta" (Submit Request)
4. Check your Google Sheet - the data should appear automatically!

## Troubleshooting

- **Data not appearing**: Check that the Google Apps Script deployment URL is correct
- **CORS errors**: Make sure the deployment is set to "Anyone" access
- **Date format issues**: Check your browser console for JavaScript errors

## Security Note

This setup is suitable for collecting customer inquiries. For production use with sensitive data, consider:
- Adding authentication
- Using HTTPS only
- Implementing rate limiting
- Adding data validation

## Support

For questions about this setup, refer to:
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Google Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
