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

userSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

UserSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        }
        catch (err) {
            return ""
        }
    }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;