// Toggle WiFi fields and URL input based on dropdown selection
function toggleInputFields(value) {
    const wifiFields = document.getElementById('wifi-fields');
    const qrInput = document.getElementById('qr-input');
    if (value === 'wifi') {
        wifiFields.style.display = 'block';
        qrInput.style.display = 'none';
    } else {
        wifiFields.style.display = 'none';
        qrInput.style.display = 'block';
    }
}

// Handle custom dropdown functionality
document.getElementById('dropdown-selected').addEventListener('click', function() {
    const options = document.getElementById('dropdown-options');
    options.style.display = options.style.display === 'none' ? 'block' : 'none';
});

// Listen for option selection in the dropdown
document.querySelectorAll('.dropdown-option').forEach(item => {
    item.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        document.getElementById('dropdown-selected').textContent = this.textContent;
        const options = document.getElementById('dropdown-options');
        options.style.display = 'none';
        toggleInputFields(value);
    });
});

// Toggle visibility of the password field
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('wifi-password');
    const icon = document.getElementById('toggle-password').querySelector('ion-icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.setAttribute('name', 'eye-off');
    } else {
        passwordInput.type = 'password';
        icon.setAttribute('name', 'eye');
    }
});

// Generate QR Code based on the selected type and input
function generateQRCode() {
    const qrType = document.getElementById('dropdown-selected').textContent.toLowerCase();
    let qrInput;
    let qrContainer = document.getElementById('qr-result');
    qrContainer.innerHTML = '';

    if (qrType === 'url') {
        qrInput = document.getElementById('qr-input').value;
        if (!qrInput.trim()) {
            alert('Bitte eine URL eingeben, um einen QR-Code zu generieren.');
            return;
        }
    } else {
        const name = document.getElementById('wifi-name').value;
        const password = document.getElementById('wifi-password').value;
        if (!name.trim() || !password.trim()) {
            alert('Bitte sowohl WiFi-Name als auch WiFi-Passwort eingeben, um einen QR-Code zu generieren.');
            return;
        }
        qrInput = formatWifiString(name, password);
    }

    let qrOptions = {
        text: qrInput,
        width: 256,
        height: 256,
        colorDark: "#e9edf1",
        colorLight: "#0d1117",
        correctLevel: QRCode.CorrectLevel.H
    };

    new QRCode(qrContainer, qrOptions);
    applyContainerStyles(qrContainer);
}

// Format the WiFi string for QR Code generation
function formatWifiString(name, password) {
    return `WIFI:S:${name};T:WPA;P:${password};;`;
}

// Apply styles to the QR Code container
function applyContainerStyles(container) {
    container.style.border = "1.5px solid #30363d";
    container.style.borderRadius = "6px";
    container.style.display = "inline-block";
    container.style.padding = "16px";
    container.style.backgroundColor = "#0e1116";
}

// Delete the QR Code
function deleteQRCode() {
    let qrContainer = document.getElementById('qr-result');
    qrContainer.innerHTML = '';

    // Reset styles to visually "remove" the container
    qrContainer.style.border = "none";
    qrContainer.style.padding = "0";
    qrContainer.style.backgroundColor = "transparent";
}
