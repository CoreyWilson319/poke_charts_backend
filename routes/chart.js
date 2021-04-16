const router = require("express").Router();
const auth = require("../middleware/auth");
let Pokemon = require("../models/createdPokemon.model");
let User = require("../models/user.model");

// GET 'chart'
// SHOW ALL USER GENERATED POKEMON
// PRIVATE
router.get("/", auth, (req, res) => {
    chart_mons = User.findById(req.user.id)
    console.log(chart_mons)
})

// GET 'chart/download'
// CREATE A FILE FOR THE USER TO DOWNLOAD AN EXCEL SHEET WITH POKEMON THEY'VE CREATED
// PRIVATE

module.exports = router;