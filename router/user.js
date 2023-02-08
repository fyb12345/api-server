const express = require("express");

const router = express.Router()

const userHandler = require("../router_handler/user")

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const {reg_login_schema} = require('../schema/user')

// 局部中间件
// 验证成功往下走
// 验证失败，终止后面代码，抛出一个全局Error错误，进入全局错误级别中间件进行处理

// 注册
router.post('/regUser', expressJoi(reg_login_schema),userHandler.regUser);
// 登录
router.post('/login',expressJoi(reg_login_schema), userHandler.login);




module.exports = router;



