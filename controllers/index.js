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


router.get("/showsessions",(req,res)=>{
    res.json(req.session)
})

router.get("/loggedin",(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({msg:"ya gotta login to join the club!"})
    }
    res.json({msg:`welcome to the club ${req.session.user.username}`})
})


module.exports = router;