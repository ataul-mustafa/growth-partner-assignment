const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const app = express();

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
