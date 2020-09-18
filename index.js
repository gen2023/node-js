const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const contactsRouter = require('./api/contacts/router');

app.use('/contacts', contactsRouter);

app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
