function toggleInputFields() {
    const qrType = document.getElementById('qr-type').value;
    const wifiFields = document.getElementById('wifi-fields');
    const qrInput = document.getElementById('qr-input');
    if (qrType === 'wifi') {
        wifiFields.style.display = 'block';
        qrInput.style.display = 'none';
    } else {
        wifiFields.style.display = 'none';
        qrInput.style.display = 'block';
    }
}

function generateQRCode() {
    const qrType = document.getElementById('qr-type').value;
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

    // If there's input, proceed with QR code generation
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

function formatWifiString(name, password) {
    return `WIFI:S:${name};T:WPA;P:${password};;`;
}

function applyContainerStyles(container) {
    container.style.border = "1.5px solid #30363d";
    container.style.borderRadius = "6px";
    container.style.display = "inline-block";
    container.style.padding = "16px";
    container.style.backgroundColor = "#0e1116";
}

function deleteQRCode() {
    let qrContainer = document.getElementById('qr-result');
    qrContainer.innerHTML = ''; // Clear the QR Code

    // Additionally, reset styles to "remove" the container visually
    qrContainer.style.border = "none";
    qrContainer.style.padding = "0";
    qrContainer.style.backgroundColor = "transparent";
}
