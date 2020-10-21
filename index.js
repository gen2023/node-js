const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

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

  const app = express();
  app.get(express.static(path.resolve(__dirname, 'public')));
  app.use(express.json());
  app.use(cors({ origin: 'http://localhost:3000' }));

  const contactsRouter = require('./api/contacts/router');
  const usersRouter = require('./api/users/router');
  const authRouter = require('./api/auth/auth.router');

  app.use('/contact', contactsRouter);
  app.use('/user', usersRouter);
  app.use('/auth', authRouter);

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
      await fs.writeFile('errors.logs.json', logs);
      console.error(err);
      res.status(500).send(err.message);
    }
    console.log('No error');
  });

  app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
};

runServer();
