const express = require('express');
const router = express.Router();
const { User, Vite, Comment } = require('../models');
const { Op } = require("sequelize")

// Explore Vites
router.get("/", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }

    Vite.findAll({
        include:[Comment],
        where: {
            date: {
                [Op.not]: null
            }
        }
    })
        .then(allVites => {
            const hbsVites = allVites.map(vite => vite.get({ plain: true }));
            hbsVites.loggedIn = req.session.user ? true : false;
            res.render("explore", hbsVites)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
})

// Login
router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/profile")
    }
    res.render("login")
})

// Signup
router.get("/signup", (req, res) => {
    if (req.session.user) {
        return res.redirect("/profile")
    }
    res.render("signup")
})

// Logout User
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
    location.reload();
})


// About Us
router.get("/aboutus", (req, res) => {
    const hbsLoggedIn = req.session
    hbsLoggedIn.loggedIn = req.session.user ? true : false;
    res.render("aboutus", hbsLoggedIn);
})


// Profile Page
router.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }
    
    User.findByPk(req.session.user.id, {
        include: [{model:Vite, include: [Comment]}]
    }).then(userData => {
        console.log(userData)
        const hbsData = userData.get({ plain: true })
        hbsData.loggedIn = req.session.user ? true : false
        res.render("profile", hbsData)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    })
});

    
module.exports = router;