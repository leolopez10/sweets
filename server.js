require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/user");


const app = express();
const PORT = process.env.PORT || 8000;

//express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database
mongoose.connect(
    process.env.MONGODB_URI || process.env.DATABASE)
    .then(() => { console.log("============================Database Connected================") })
    .catch(err => console.log(err));

//Routes middleware
app.use("/api", userRoutes);


//server listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

