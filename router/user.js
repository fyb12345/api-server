const  express = require("express");

const router = express.Router()

const userHandler =require("../router_handler/user")


router.post('/regUser',userHandler.regUser);
router.post('/regUser',userHandler.login);





module.exports =router;



