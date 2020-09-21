const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs').promises;

const runServer = async (err, req, res) => {
  await mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Database connection successful');

  app.use(express.json());
  app.use(cors({ origin: 'http://localhost:3000' }));

  const contactsRouter = require('./api/contacts/router');

  app.use('/contact', contactsRouter);

  app.use(async (err, req, res, next) => {
    if (err) {
      let logs = await fs.readFile('errors.logs.json', { encoding: 'utf-8' });
      logs = JSON.parse(logs);
      logs.push({
        date: new Date().toISOString(),
        method: req.method,
        originalUrl: req.originalUrl,
        name: err.message,
      });
      logs = JSON.stringify(logs);
      console.error(err);
      return await fs.writeFile('errors.logs.json', logs);
    }
    console.log('No error');
  });

  app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
};

runServer();
