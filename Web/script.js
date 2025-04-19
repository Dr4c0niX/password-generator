// Password Generator Script
document.addEventListener('DOMContentLoaded', function() {
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
            uppercaseCheckbox.checked = true;
            chars = uppercaseChars;
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

// Matrix Effect Script -- the following code comes from a youtube tutorial, but I've added some comments to explain it
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
    // Constructor to initialize the symbol with its position, font size, and canvas height
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }

    // Draw a random character from the characters string at the symbol's position
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    // Constructor to initialize the effect with canvas dimensions (passed through parameters), font size, and columns
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 15; // Font size for the symbols (can be adjusted as you like)
        this.columns = this.canvasWidth / this.fontSize; // Number of columns based on canvas width and font size
        this.symbols = [];
        this.#initialize();
    }

    // Initialize the symbols by creating a new Symbol object for each column
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    // Resize the canvas and reinitialize the symbols
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}


// Variables for the animation
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 45;
const nextFrame = 1000 / fps;
let timer = 0;

// Function to animate the matrix effect
function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // Check if enough time has passed to draw the next frame
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Slightly transparent background to create a trailing effect
        ctx.textAlign = 'center'; // Center the text because the mix of japanese and latin characters is not the same width
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.fillStyle = '#0aff0a'; // Green color for the characters
        ctx.font = effect.fontSize + 'px monospace'; // Set the font size
        effect.symbols.forEach(symbol => symbol.draw(ctx)); // Draw each symbol
        timer = 0; // Reset the timer
    } else {
        timer += deltaTime; // Increment the timer by the time since the last frame
    }

    // Call the animate function again for the next frame (recursive)
    requestAnimationFrame(animate);
}

// Start the matrix animation
animate(0);

// Resize the canvas when the window is resized
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
});