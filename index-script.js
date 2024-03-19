function generateQRCode() {
    let qrInput = document.getElementById('qr-input').value;
    let qrContainer = document.getElementById('qr-result');
    qrContainer.innerHTML = ''; // Clear previous QR Code

    if (qrInput) {
        // Options for QR Code generation including custom colors
        let qrOptions = {
            text: qrInput,
            width: 256,
            height: 256,
            colorDark: "#e9edf1",  // A blue color that matches the GitHub style buttons
            colorLight: "#0d1117", // A very dark gray, nearly black background that matches the GitHub background
            correctLevel: QRCode.CorrectLevel.H  // QR Code correction level
        };

        // Create QR Code with specific options
        new QRCode(qrContainer, qrOptions);

        // Apply a border to the QR code container to make it blend in with the style
        qrContainer.style.border = "1.5px solid #30363d"; // Border color similar to GitHub's container border
        qrContainer.style.borderRadius = "6px"; // Optional: if you want rounded corners
        qrContainer.style.display = "inline-block"; // Ensures the border wraps tightly around the QR code
        qrContainer.style.padding = "16px"; // Adds some spacing between the QR code and the border
        qrContainer.style.backgroundColor = "#0e1116"; // Matches GitHub container background color
    } else {
        alert('Bitte Text eingeben, um einen QR-Code zu generieren.');
    }
}
