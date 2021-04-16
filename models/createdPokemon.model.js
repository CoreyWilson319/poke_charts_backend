const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const createdPokemonSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 13,
    },
    nickname: {
        type: String,
        minlength: 1,
        maxlength: 13,
    },
    level: {
        type: Number,
        min: 0,
        max: 100
    },
    hp_iv: {
        type: Number,
        min: 0,
        max: 31,
    },
    attack_iv: {
        type: Number,
        min: 0,
        max: 31,
    },
    defense_iv: {
        type: Number,
        min: 0,
        max: 31,
    },
    special_attack_iv: {
        type: Number,
        min: 0,
        max: 31,
    },
    special_defense_iv: {
        type: Number,
        min: 0,
        max: 31,
    },
    speed_iv: {
        type: Number,
        min: 0,
        max: 31,
    },
    hp_ev: {
        type: Number,
        min: 0,
        max: 252
    },
    attack_ev: {
        type: Number,
        min: 0,
        max: 252
    },
    defense_ev: {
        type: Number,
        min: 0,
        max: 252
    },
    special_attack_ev: {
        type: Number,
        min: 0,
        max: 252
    },
    special_defense_ev: {
        type: Number,
        min: 0,
        max: 252
    },
    speed: {
        type: Number,
        min: 0,
        max: 252
        
    },
    gMax: {
        type: Boolean,
    },
    shiny: {
        type: Boolean,
    },
    marks: {
        type: String,
    },
    moves_1: {
        type:String
    },
    moves_2: {
        type:String
    },
    moves_3: {
        type:String
    },
    moves_4: {
        type:String
    },
    // Attempting to use default mongoose created id
    // rid: {
    //     type: Number
    // }

}, {
    timestamps: true,
})

const CreatedPokemon = mongoose.model('CreatedPokemon', createdPokemonSchema);

module.exports = CreatedPokemon;
