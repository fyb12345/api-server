const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
// 注册
exports.regUser = (req, res) => {
    const body = req.body;

    const sql = 'SELECT * FROM  ev_users WHERE username=?';
    const addUserSql = 'INSERT into ev_users set ?';
    // 查找有没有该用户
    db.query(sql, body.username, (err, result) => {
        if (err) throw err;

        if (result.length) return res.cc('用户名被占用，请更换其他用户名！');

        // 密码加密
        body.password = bcrypt.hashSync(body.password, 10)
        // 添加新建用户
        db.query(addUserSql, [body], (err, result) => {
            if (err) throw err;

            if (1 !== result.affectedRows) {
                return res.cc('注册用户失败，请稍后再试！');
            }

            res.send({status: 1, message: '注册成功!'})

        })

    });
};

// 登录
exports.login = (req, res) => {
    const body = req.body;

    const sql = 'SELECT * From ev_users WHERE username=?';

    db.query(sql, body.username, (err, result) => {
        if (err) throw err;

        if (!result.length) return res.cc("用户不存在！")

        const compareResult = bcrypt.compareSync(body.password, result[0].password);

        if (!compareResult) return res.cc("密码错误！");

        const user = {...result[0], password: '', user_pic: ''};

        const tokenStr = jwt.sign(user, config.JwtSecretKey, {
            expiresIn: config.expiresIn,//有效期
        })

        res.send({
            status: 0, message: '登录成功', token: 'Bearer ' + tokenStr
        })

    })
};
