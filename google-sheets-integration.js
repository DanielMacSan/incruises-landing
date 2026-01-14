/**
 * inCruises Landing Page - Google Sheets Integration
 * 
 * This script handles form submission and sends data to Google Sheets
 * via a Google Apps Script web app deployment.
 * 
 * Setup Instructions:
 * 1. Update the DEPLOYMENT_URL constant below with your Google Apps Script web app URL
 * 2. Include this script in your HTML: <script src="google-sheets-integration.js"></script>
 * 3. Set your form onsubmit: <form id="inquiryForm" onsubmit="submitInquiryForm(event)">
 */

// Configuration: Replace with your actual Google Apps Script deployment URL
const GOOGLE_SHEETS_DEPLOYMENT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

/**
 * Main function to submit the inquiry form
 * @param {Event} event - The form submission event
 */
function submitInquiryForm(event) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Invio in corso...';
    
    try {
        // Collect form data
        const formData = collectFormData();
        
        // Validate form data
        if (!validateFormData(formData)) {
            throw new Error('Validation failed: Missing required fields');
        }
        
        // Send data to Google Apps Script
        sendToGoogleSheets(formData)
            .then(response => {
                handleSuccess(response, submitButton, originalText, event.target);
            })
            .catch(error => {
                handleError(error, submitButton, originalText);
            });
    } catch (error) {
        handleError(error, submitButton, originalText);
    }
}

/**
 * Collect all form field values
 * @returns {Object} Form data object
 */
function collectFormData() {
    return {
        data_richiesta: getFieldValue('data_richiesta'),
        nome: getFieldValue('nome'),
        email: getFieldValue('email'),
        telefono: getFieldValue('telefono'),
        tipo_viaggio: getFieldValue('tipo_viaggio'),
        destinazione: getFieldValue('destinazione'),
        budget: getFieldValue('budget'),
        periodo: getFieldValue('periodo'),
        messaggio: getFieldValue('messaggio'),
        timestamp: new Date().toISOString()
    };
}

/**
 * Get value from form field
 * @param {string} fieldId - The ID of the form field
 * @returns {string} The field value or empty string
 */
function getFieldValue(fieldId) {
    const field = document.getElementById(fieldId);
    return field ? field.value.trim() : '';
}

/**
 * Validate required form fields
 * @param {Object} data - The form data object
 * @returns {boolean} True if validation passes
 */
function validateFormData(data) {
    const requiredFields = ['nome', 'email', 'data_richiesta', 'tipo_viaggio'];
    
    for (const field of requiredFields) {
        if (!data[field]) {
            console.warn(`Missing required field: ${field}`);
            return false;
        }
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
        console.warn('Invalid email format');
        return false;
    }
    
    return true;
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Send form data to Google Apps Script
 * @param {Object} data - The form data object
 * @returns {Promise} Promise that resolves with the response
 */
function sendToGoogleSheets(data) {
    // Check if deployment URL is configured
    if (GOOGLE_SHEETS_DEPLOYMENT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        return Promise.reject(new Error('Google Sheets deployment URL not configured'));
    }
    
    return fetch(GOOGLE_SHEETS_DEPLOYMENT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'no-cors'  // Important: Google Apps Scripts require this
    })
    .then(response => {
        // Note: With no-cors mode, we can't read the response
        // So we'll consider any response as success
        return { success: true, data: data };
    });
}

/**
 * Handle successful form submission
 * @param {Object} response - The response from Google Sheets
 * @param {HTMLElement} submitButton - The submit button element
 * @param {string} originalText - Original button text
 * @param {HTMLElement} form - The form element
 */
function handleSuccess(response, submitButton, originalText, form) {
    console.log('Form submitted successfully:', response);
    
    // Show success message
    showNotification('Grazie per la tua richiesta! Ti contatteremo presto.', 'success');
    
    // Reset form
    form.reset();
    
    // Restore button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    
    // Optional: Redirect after delay
    // setTimeout(() => {
    //     window.location.href = '/thank-you.html';
    // }, 2000);
}

/**
 * Handle form submission error
 * @param {Error} error - The error object
 * @param {HTMLElement} submitButton - The submit button element
 * @param {string} originalText - Original button text
 */
function handleError(error, submitButton, originalText) {
    console.error('Error submitting form:', error);
    
    let errorMessage = 'Si è verificato un errore nell\'invio del modulo. Per favore riprova.';
    
    if (error.message.includes('deployment URL')) {
        errorMessage = 'Errore di configurazione: URL di Google Sheets non configurato. Contatta l\'amministratore.';
    }
    
    showNotification(errorMessage, 'error');
    
    // Restore button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
}

/**
 * Show notification message to user
 * @param {string} message - The message to display
 * @param {string} type - Type of notification: 'success' or 'error'
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease-in-out;
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#2196F3';
        notification.style.color = 'white';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { submitInquiryForm, collectFormData, validateFormData };
}
