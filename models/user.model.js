const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: { type: String, trim: true, unique: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String, trim: true, unique: true, required: true }
}, {
    collection: 'users',
    timestamps: true
});


module.exports = mongoose.model('User', UserSchema);