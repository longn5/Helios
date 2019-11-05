const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connect to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then( () => {
    console.log("Successfully connected to the database.")
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
})

app.get('/', (req, res) => {
    res.json({"message": "simple route"})
});

require('./app/routes/register.routes.js')(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})