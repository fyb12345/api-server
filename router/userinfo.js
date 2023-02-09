const express = require('express');
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const {update_userinfo_schema, update_userPassword_schema, update_avatar_schema} = require('../schema/userinfo')


const router = express.Router();

const userInfo_handler = require('../router_handler/userInfo')


router.get('/userinfo', userInfo_handler.getUserInfo);


router.post('/updateUser', expressJoi(update_userinfo_schema), userInfo_handler.updateUserInfo)


router.post('/updatePass', expressJoi(update_userPassword_schema), userInfo_handler.updatePassword)


router.post('/updatePic', expressJoi(update_avatar_schema), userInfo_handler.updateUserPic)


module.exports = router