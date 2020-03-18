require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/user");


const app = express();
const PORT = process.env.PORT || 8000;

//Database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("============================Database Connected================")
});

//Routes middleware
app.use("/api", userRoutes);


//server listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

