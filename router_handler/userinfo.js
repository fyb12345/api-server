const db = require('../db/index');
const bcrypt = require("bcryptjs");

// 获取用户信息
exports.getUserInfo = function (req, res) {
    const sql = 'SELECT id,username,nickname,email,user_pic FROM ev_users Where id=?'

    db.query(sql, req.user.id, (err, result) => {
        if (err) throw err;

        if (result.length !== 1) return res.cc('获取用户失败!')

        res.send({
            status: 0, message: '获取用户基本信息成功！', data: result[0],
        })
    })
}

// 更新用户信息
exports.updateUserInfo = function (req, res) {
    const sql = 'UPDATE ev_users SET ? where id=?';
    const body = req.body;
    db.query(sql, [body, req.user.id], (err, result) => {
        if (err) throw err;
        if (1 !== result.affectedRows) {
            return res.cc('用户信息更新失败，请稍后再试！');
        }
        res.cc('更新成功!', 0)
    })
}

// 修改密码
exports.updatePassword = function (req, res) {
    const sql = 'SELECT password from ev_users where id=?';
    const body = req.body;
    db.query(sql,[req.user.id],(err,result) => {
        if (err) throw err;

        if (1 !== result.length) return res.cc('用户不存在!');

        const compareResult = bcrypt.compareSync(body.oldPwd, result[0].password)

        if (!compareResult)return res.cc('旧密码不正确!');

        const compareResult2 = bcrypt.compareSync(body.newPwd, result[0].password)
        if (compareResult2)return res.cc('原密码和新密码一样!');


        const sql = 'UPDATE ev_users SET password=? where id=?';

        const newPass= bcrypt.hashSync(body.newPwd, 10)


        db.query(sql, [newPass, req.user.id], (err, result) => {
            if (err) throw err;
            if (1 !== result.affectedRows) return res.cc('用户密码更新失败，请稍后再试！')
            res.cc('更新成功!')
        })
    })




}



// 更新用户头像
exports.updateUserPic=function (req, res) {
    const sql = 'UPDATE ev_users SET user_pic=? WHERE id=?';
    const body = req.body;
    db.query(sql, [body.avatar,req.user.id],(err,result) => {
        if (err) throw err;

        if (1!==result.affectedRows) return res.cc('更新失败!')

        res.cc('更新成功',0)
    })
}
