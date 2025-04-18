document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const passwordDisplay = document.getElementById('password');
    const copyBtn = document.getElementById('copy-btn');
    const generateBtn = document.getElementById('generate-btn');
    const copyMessage = document.getElementById('copy-message');
    
    // Character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_-+=<>?/[]{}|';
    
    // Generate password function
    function generatePassword() {
        let chars = '';
        let password = '';
        
        // Add selected character types to pool
        if (uppercaseCheckbox.checked) chars += uppercaseChars;
        if (lowercaseCheckbox.checked) chars += lowercaseChars;
        if (numbersCheckbox.checked) chars += numberChars;
        if (symbolsCheckbox.checked) chars += symbolChars;
        
        // Make sure at least one character type is selected
        if (chars.length === 0) {
            alert('Please select at least one character type');
            lowercaseCheckbox.checked = true;
            chars = lowercaseChars;
        }
        
        // Generate random password
        const passwordLength = lengthSlider.value;
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        
        return password;
    }
    
    // Update length value display
    function updateLengthDisplay() {
        lengthValue.textContent = lengthSlider.value;
        updatePassword();
    }
    
    // Update password display
    function updatePassword() {
        passwordDisplay.value = generatePassword();
    }
    
    // Copy password to clipboard
    function copyToClipboard() {
        if (passwordDisplay.value) {
            passwordDisplay.select();
            document.execCommand('copy');
            
            // Show "copied" message
            copyMessage.classList.remove('hidden');
            setTimeout(() => {
                copyMessage.classList.add('hidden');
            }, 2000);
        }
    }
    
    // Event listeners
    
    // Update password length display when slider moves
    lengthSlider.addEventListener('input', updateLengthDisplay);
    
    // Update password when settings change
    uppercaseCheckbox.addEventListener('change', updatePassword);
    lowercaseCheckbox.addEventListener('change', updatePassword);
    numbersCheckbox.addEventListener('change', updatePassword);
    symbolsCheckbox.addEventListener('change', updatePassword);
    
    // Button click handlers
    generateBtn.addEventListener('click', updatePassword);
    copyBtn.addEventListener('click', copyToClipboard);
    
    // Initialize with a password on page load
    updateLengthDisplay(); // This will update both the length display and generate the password
});