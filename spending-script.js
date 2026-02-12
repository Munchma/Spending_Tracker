// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
// Replace with your Google Form's formResponse URL and entry IDs

const GOOGLE_FORM_URL = 'YOUR_FORM_URL_HERE';
// Example: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse'

const ENTRY_IDS = {
    cardType: 'YOUR_CARD_TYPE_ENTRY_ID',      // e.g., 'entry.123456789'
    amount: 'YOUR_AMOUNT_ENTRY_ID'            // e.g., 'entry.987654321'
};

// ============================================
// FORM HANDLING
// ============================================

const form = document.getElementById('spendingForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get spending amounts
    const spending = {
        'Costco Card': parseFloat(document.getElementById('costcoCard').value) || 0,
        'TD Card': parseFloat(document.getElementById('tdCard').value) || 0,
        'Debit Card': parseFloat(document.getElementById('debitCard').value) || 0
    };
    
    // Check if at least one amount is entered
    const hasSpending = Object.values(spending).some(amount => amount > 0);
    
    if (!hasSpending) {
        showMessage('error');
        return;
    }
    
    // Submit each non-zero spending
    const submissions = [];
    for (const [card, amount] of Object.entries(spending)) {
        if (amount > 0) {
            submissions.push(submitSpending(card, amount));
        }
    }
    
    try {
        await Promise.all(submissions);
        showMessage('success');
        form.reset();
    } catch (error) {
        console.error('Submission error:', error);
        showMessage('error');
    }
});

// ============================================
// GOOGLE FORMS SUBMISSION
// ============================================

async function submitSpending(cardType, amount) {
    // Build the URL with form data
    const url = `${GOOGLE_FORM_URL}?${ENTRY_IDS.cardType}=${encodeURIComponent(cardType)}&${ENTRY_IDS.amount}=${amount}&submit=Submit`;
    
    console.log('Submitting:', cardType, amount);
    
    // Submit to Google Forms
    await fetch(url, {
        method: 'POST',
        mode: 'no-cors' // Required for Google Forms
    });
}

// ============================================
// UI FEEDBACK
// ============================================

function showMessage(type) {
    // Hide both messages first
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    // Show the appropriate message
    if (type === 'success') {
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 3000);
    } else {
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 3000);
    }
}

// ============================================
// AUTO-FOCUS AND CONVENIENCE
// ============================================

// Pressing Enter moves to next field or submits
const allInputs = document.querySelectorAll('input[type="number"]');

allInputs.forEach((input, index) => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (index < allInputs.length - 1) {
                allInputs[index + 1].focus();
            } else {
                form.querySelector('.submit-btn').click();
            }
        }
    });
});
