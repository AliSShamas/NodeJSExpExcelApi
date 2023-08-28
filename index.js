const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3030;
// CORS MiddleWare
app.use(cors());

// Define a route to get data from a specific sheet
app.get('/data/:sheetName', (req, res) => {
  const sheetName = req.params.sheetName;
  const filePath = './menu.xlsx';

  try {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      return res.status(404).json({ error: 'Sheet not found' });
    }

    const sheetData = xlsx.utils.sheet_to_json(sheet);
    res.json(sheetData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// MiddleWare(Error Handling)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
