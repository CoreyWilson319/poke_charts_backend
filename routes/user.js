const router = require("express").Router();
const auth = require("../middleware/auth");
let User = require("../models/user.model");


// GET
// SHOW USER PROFILE
    // IF PROFILE OWNER HAS PROFILE PUBLIC SHOW USER POKEMON
router.get("/:id", async (req, res) => {
    try {
        user = await User.findOne({ id: req.params.id});
        if (user)
        res.status(200).json(user)
    }
    catch(err) {
        res.status(400).json({ msg: err})
    }
})


module.exports = router;
