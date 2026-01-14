# Quick Start Guide - inCruises Landing Page

## Overview
This is a complete solution for collecting customer inquiries about discounted travel offers. The landing page is fully functional and ready to deploy.

## What You Get

✅ **Landing Page** (`index.html`)
- Professional, responsive design
- All necessary form fields
- Mobile-optimized interface
- Live deployment via GitHub Pages

✅ **Google Sheets Integration** (`google-sheets-integration.js`)
- Standalone JavaScript module
- Form validation
- Error handling
- Success notifications

✅ **Documentation**
- Comprehensive setup guide (SETUP_GOOGLE_SHEETS.md)
- This quick start guide
- Inline code comments

## Quick Setup (5 Minutes)

### Step 1: View Your Landing Page

Your landing page is already deployed and live! 

Access it at: `https://danielmacsan.github.io/incruises-landing/`

### Step 2: Set Up Google Sheets

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"inCruises Customer Inquiries"**
4. Add these column headers in row 1:
   - A1: `Data Richiesta`
   - B1: `Nome Completo`
   - C1: `Email`
   - D1: `Telefono`
   - E1: `Tipo di Viaggio`
   - F1: `Destinazione Preferita`
   - G1: `Budget`
   - H1: `Periodo`
   - I1: `Messaggio`

### Step 3: Create Google Apps Script

1. In your Google Sheet, go to **Tools → Script editor**
2. Delete existing code
3. Copy and paste this script:

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
    return ContentService.createTextOutput(JSON.stringify({success: false}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Save it (name it "inCruises Form Handler")
5. Click **Deploy → New deployment**
6. Select type: **Web app**
7. Set "Execute as" to your account
8. Set "Who has access" to **Anyone**
9. Click **Deploy**
10. **Copy the deployment URL** (look like `https://script.google.com/macros/d/XXXXX/userweb`)

### Step 4: Configure the Form

#### Option A: Using Formspree (Easiest)

1. Go to [Formspree](https://formspree.io)
2. Create a new form
3. Set endpoint to your email
4. Edit `index.html`
5. Find the `<form>` tag
6. Change it to:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### Option B: Using Google Apps Script (Recommended)

1. Edit `index.html`
2. Find the line: `<form id="inquiryForm">`
3. Add `onsubmit="submitInquiryForm(event)"`
4. Add this before `</body>`:
   ```html
   <script src="google-sheets-integration.js"></script>
   <script>
     // Configure your Google Apps Script URL
     const GOOGLE_SHEETS_DEPLOYMENT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb';
   </script>
   ```
5. Replace `YOUR_SCRIPT_ID` with your actual Script ID from Step 3

### Step 5: Test It!

1. Open your landing page
2. Fill out the form completely
3. Click "Invia Richiesta" (Submit)
4. You should see a success message
5. Check your Google Sheet - the data should appear!

## File Structure

```
incruises-landing/
├── index.html                      # Main landing page
├── google-sheets-integration.js    # Form handler script
├── SETUP_GOOGLE_SHEETS.md          # Detailed setup guide
├── QUICKSTART.md                   # This file
└── README.md                       # Project overview
```

## Troubleshooting

### "Form not submitting"
- Check browser console for errors (F12)
- Verify the Google Apps Script URL is correct
- Make sure deployment is set to "Anyone" access

### "Data not appearing in Sheet"
- Confirm the deployment URL in the form
- Check Google Apps Script execution logs
- Verify column headers match exactly

### "CORS errors"
- Google Apps Scripts require `mode: 'no-cors'`
- This is already configured in `google-sheets-integration.js`

## Customization

### Change Form Fields
Edit `index.html` to add/remove form fields. Remember to:
1. Update the HTML form
2. Update column headers in Google Sheet
3. Update the JavaScript in both files

### Style Customization
All styling is in the `<style>` section of `index.html`. Modify colors, fonts, and layout there.

### Add Redirect After Submission
Uncomment this in `google-sheets-integration.js`:
```javascript
setTimeout(() => {
    window.location.href = '/thank-you.html';
}, 2000);
```

## Next Steps

1. ✅ Deploy the landing page (already done!)
2. ✅ Set up Google Sheets
3. ✅ Create Google Apps Script
4. ✅ Test the form
5. Share the link with customers: `https://danielmacsan.github.io/incruises-landing/`

## Support

For detailed information, see:
- [SETUP_GOOGLE_SHEETS.md](SETUP_GOOGLE_SHEETS.md) - Comprehensive setup guide
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Formspree Documentation](https://formspree.io/docs) (alternative)

## License

Free to use and modify for your inCruises business.

---

**Ready to collect inquiries? Start with Step 1 above!** 🚀
