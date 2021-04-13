const router = require("express").Router();
const auth = require("../middleware/auth");
let User = require("../models/user.model");


// GET
// SHOW USER PROFILE
    // IF PROFILE OWNER HAS PROFILE PUBLIC SHOW USER POKEMON
router.get("/:username", auth, async (req, res) => {
    try {
        user = await User.findOne({ username: req.params.username});
        if (user.public == true){
            res.status(200).json(user)
        } else if (user.public == false){
            res.status(200).json({
                pokemon: user.pokemon,
                id: user.id,
                username: user.username,
                public: user.public

            })
        }
    }
    catch(err) {
        res.status(400).json({ msg: err})
    }
})

// PUT
// UPDATE PUBLIC
router.put("/:username", auth, async (req, res) => {
    try {
        user = await User.findOne({_id: req.user.id})
        if (user.username != req.params.username){
            res.status(400).json({ msg: "User is not logged in as " + req.params.username})
        } else {
            let filter = { username: user.username}
            let publicStatus = !user.public
            let update = { public:publicStatus}
            await User.findOneAndUpdate(filter, update)
            res.status(200).json(user)

        }
    }
    catch(err) {
        res.status(400).json({ msg: err })
    }
})


module.exports = router;
