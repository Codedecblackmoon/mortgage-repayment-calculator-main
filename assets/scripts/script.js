
const form = document.querySelector('form');
const mortgageInput = document.getElementById('mort');
const termInput = document.getElementById('mt');
const interestInput = document.getElementById('ir');
const repaymentRadio = document.getElementById('repay');
const interestOnlyRadio = document.getElementById('inter');
const emptyResultBox = document.getElementById('emptyResultBox');
const fullResultBox = document.getElementById('fullResultBox');
const monthlyAmount = document.getElementById('monthAmount');
const totalAmount = document.getElementById('totalAmount');
const clearButton = document.querySelector('header a');

// Hide full result box initially
fullResultBox.style.display = 'none';

// Format mortgage amount with commas and £ symbol
function formatAmount() {
    let value = mortgageInput.value.replace(/[^0-9.]/g, '');
    if (value) {
        value = parseFloat(value).toLocaleString('en-GB', {
            style: 'currency',
            currency: 'GBP'
        });
        mortgageInput.value = value;
    }
}

// Calculate monthly mortgage payment
function calculateMonthlyPayment(principal, annualRate, years, isRepayment) {
    const monthlyRate = (annualRate / 100) / 12;
    const numberOfPayments = years * 12;

    if (isRepayment) {
        // Repayment mortgage formula: P * (r(1+r)^n)/((1+r)^n-1)
        return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
               (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
        // Interest only mortgage formula: P * r
        return principal * monthlyRate;
    }
}

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate inputs
    if (!mortgageInput.value || !termInput.value || !interestInput.value || 
        (!repaymentRadio.checked && !interestOnlyRadio.checked)) {
        alert('Please fill in all fields');
        return;
    }

    // Parse values
    const principal = parseFloat(mortgageInput.value.replace(/[^0-9.]/g, ''));
    const term = parseFloat(termInput.value);
    const rate = parseFloat(interestInput.value);
    const isRepayment = repaymentRadio.checked;

    // Calculate monthly payment
    const monthlyPayment = calculateMonthlyPayment(principal, rate, term, isRepayment);
    const totalPayment = monthlyPayment * term * 12;

    // Display results
    emptyResultBox.style.display = 'none';
    fullResultBox.style.display = 'block';
    
    monthlyAmount.textContent = monthlyPayment.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP'
    });
    
    totalAmount.textContent = totalPayment.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP'
    });
});

// Clear form and results
clearButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Reset form
    form.reset();
    mortgageInput.value = '';
    
    // Reset display
    emptyResultBox.style.display = 'block';
    fullResultBox.style.display = 'none';
});

// Add required attribute to inputs
mortgageInput.required = true;
termInput.required = true;
interestInput.required = true;

// Input validation for numbers only
function validateNumberInput(e) {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
        e.target.value = value.replace(/[^\d.]/g, '');
    }
}

termInput.addEventListener('input', validateNumberInput);
interestInput.addEventListener('input', validateNumberInput);