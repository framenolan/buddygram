const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
router.use('/api/users', userRoutes);

const viteRoutes = require('./viteRoutes');
router.use('/api/vites', viteRoutes);

const commentRoutes = require('./commentRoutes');
router.use('/api/comments', commentRoutes);

const frontEnd = require('./frontEndRoutes');
router.use('/', frontEnd);


router.get("/showsession", (req, res) => {
    console.log(req.session.user)
    res.json(req.session)
})

router.get("/loggedin", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Login to join the club!" })
    }
    res.json({ msg: `Welcome to the club ${req.session.user.firstname}` })
})


module.exports = router;