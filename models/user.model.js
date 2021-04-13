const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    public: {
        type: Boolean,
        required: true
    },
    pokemon: [{ type: Schema.Types.ObjectId, ref: 'CreatedPokemon' }]
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

module.exports = User;
