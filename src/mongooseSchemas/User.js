const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 40
    },
    passwordHash: {
        type: String,
        required: true,
    },
    listID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'List'
    },
    settings: {
        correctUntilComplete: {
            type: Number,
            required: true
        },
    }
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);

module.exports = User;