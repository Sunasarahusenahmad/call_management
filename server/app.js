const express = require('express')
const app = express()
const conn = require('./db/conn')
const Institute_Route = require('./routes/Institute');
const Department_Route = require('./routes/Department');
const Make_Route = require('./routes/Make');
const Model_Route = require('./routes/Model');
const Serialno_Route = require('./routes/Serialno');
const Calltype_Route = require('./routes/Calltype');
const User_Route = require('./routes/User');
const App_Route = require('./routes/App');

// Call Master Routes
const router = require('./controller/Callmaster');

app.use(express.json());

// Routes 
app.use("/", Institute_Route);
app.use("/", Department_Route);
app.use("/", Make_Route);
app.use("/", Model_Route);
app.use("/", Serialno_Route);
app.use("/", Calltype_Route);
app.use("/", User_Route);
app.use("/", App_Route);

// Call Master routes
app.use(router);

app.listen(8000, () => {
    console.log("Server Created");
})