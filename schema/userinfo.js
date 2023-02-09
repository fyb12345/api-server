const joi = require('joi')



const id=joi.number().integer().min(1).required();
const nickname =joi.string().required();
const email =joi.string().email().required();

exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email,
    }
}



// 密码的验证规则
const newPwd=joi.string().pattern(/^[\S]{6,12}$/).required();
const oldPwd=joi.string().pattern(/^[\S]{6,12}$/).required();


exports.update_userPassword_schema={
    body: {newPwd,oldPwd}
}

// 头像
const avatar = joi.string().required()

exports.update_avatar_schema ={
    body: {avatar}
}