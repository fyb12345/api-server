const db=require('../db/index');
const bcrypt = require('bcryptjs');


// 注册
exports.regUser=(req,res) => {
  const body=req.body;

  if (!body.username||!body.password){
    return res.send({
      status: 1,
      message: '用户名或密码不能为空！'
    })
  }

  const sql='SELECT * FROM  ev_users WHERE username=?';
  const addUserSql='INSERT into ev_users set ?';
  // 查找有没有该用户
  db.query(sql,body.username,(err,result) =>{
    if (err) throw err;

    if (result.length) return res.send({status:1,message:"用户名被占用，请更换其他用户名！"});

    // 密码加密
    body.password = bcrypt.hashSync(body.password, 10)
    // 添加新建用户
    db.query(addUserSql,[body],(err,result)=>{
      if (err) throw err;

      if(1!==result.affectedRows){
        return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
      }

      res.send({status:1,message:'注册成功!'})

    })

  });







  // res.send('regUser Ok')
};

// 登录
exports.login=(req,res) => {
  res.send('login Ok')
};
