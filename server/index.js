const express = require('express');
const cors = require('cors')
const fs = require('fs');

const app = express();

app.use(express.json({
  limit: '100mb'
}));
app.use(cors());

app.post('/', (req, res) => {
  const { screenshot } = req.body;

  const buffer = Buffer.from(screenshot.substr('data:image/jpeg;base64,'.length), 'base64');

  const date = new Date();

  try {
    fs.mkdirSync('../screenshots');
  } catch (e) {}

  fs.writeFileSync(`../screenshots/${date.toISOString()}.jpg`, buffer);

  res.end();
})

app.listen(9876, () => {
  console.log(`Server listening on port 9876`);
});
