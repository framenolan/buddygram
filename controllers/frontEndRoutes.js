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
        where: {
            date: {
                [Op.not]: null
            }
        }
    })
        .then(allVites => {
            // console.log(allVites)
            const hbsVites = allVites.map(vite => vite.get({ plain: true }));
            // TODO: remove console logs
            hbsVites.loggedIn = req.session.user ? true : false;
            // console.log(hbsVites)
            // console.log("========")
            // console.log(hbsVites.length)
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
        include: [Vite]
    }).then(userData => {
        console.log(userData)
        const hbsData = userData.get({ plain: true })
        hbsData.loggedIn = req.session.user ? true : false
        console.log(hbsData)
        res.render("profile", hbsData)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    });
})


module.exports = router;