const mongoose = require('mongoose');
const Scehma = mongoose.Schema;
// const crypto = require('crypto');
// const bcrypt = require('bcryptjs')
const uuidv1 = require('uuid/v1');

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        trim: true,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },
},
    { timestamps: true }
)


