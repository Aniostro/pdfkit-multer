# pdfkit-multer

This repository offers a streamlined approach to integrate images into PDF documents. By leveraging the power of `multer` and `pdfKit`, you can seamlessly incorporate user-uploaded images or specify images via URL to create visually enhanced PDFs.

## Add dependencies
```sh
npm install express multer pdfkit
```

## Basic usage
```sh
const express = require('express');
const multer = require('multer');
const pdfKit = require('pdfkit');

const app = express();

// Configure multer for image upload (customize as needed)
const upload = multer({ dest: 'uploads/' });

app.post('/upload-image-to-pdf', upload.single('image'), (req, res) => {
    const imageFilePath = req.file.path; // Path to uploaded image
    const pdfDoc = new pdfKit();

    // ... (code to generate PDF and add image)

    pdfDoc.pipe(res); // Stream the PDF to the response
    pdfDoc.end();
});

app.listen(3000, () => console.log('Server listening on port 3000'));
```
