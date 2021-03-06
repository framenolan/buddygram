const express = require("express");
const router = express.Router();
const { User, Vite, Comment } = require("../models");

//find all
router.get("/", (req, res) => {
  Comment.findAll({
    include: [User, Vite]
  })
    .then(dbComments => {
      res.json(dbComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id, {})
    .then(dbComment => {
      res.json(dbComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// create Comment
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Please login to view" })
    // maybe add a redirect to login, or switch
  }
  
  // let commenter = req.session.user.firstname.concat(req.session.user.lastname)
  
  Comment.create({
    body: req.body.body,
    ViteId: req.body.ViteId,
    commenter: req.session.user.firstname
  })
    .then(newComment => {
      res.json(newComment)
      console.log(newComment)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

// update Comment
router.put("/:id", (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(updatedComment => {
      res.json(updatedComment)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

// delete Comment
router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(delComment => {
      res.json(delComment)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

module.exports = router