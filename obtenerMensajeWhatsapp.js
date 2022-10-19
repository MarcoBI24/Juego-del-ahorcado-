const router = require("express").Router()


router.route("/facebook").post((req,res)=>{
    console.log(req.body)
})





module.exports = router