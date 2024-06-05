
// node.js server
const express = require('express');
const multer  = require('multer');
const pdfkit = require('pdfkit');
const fs = require('fs');

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html')
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.fields([
  { name: 'makerFile', maxCount: 1 }, 
  { name: 'comakerFile', maxCount: 1 }
]), (req, res) => {
  const makerFile = req.files.makerFile[0];
  const comakerFile = req.files.comakerFile[0];

  const doc = new pdfkit();
  const filePath = 'uploads/' + makerFile.originalname;
  const comakerfilePath = 'uploads/' + comakerFile.originalname;

  const fileContent = fs.readFileSync(filePath);
  doc.pipe(fs.createWriteStream('uploads/output.pdf'));
  doc.image(fileContent, { width: 500 });
  doc.addPage();
  doc.image(comakerfilePath, { width: 500 });

  doc.end();
  res.status(200).send('Files uploaded!');
});

app.listen(3000, () => {
  console.log('Server is running on port http://127.0.0.1:3000');
});



