const express = require('express');
const cors = require('cors');
const joi=require('joi');
const config=require('./config/index');
const exparessJwt = require('express-jwt');
const app=express();

// 路由
const user_router=require('./router/user');
const userInfo_router=require('./router/userinfo')
const artCate_router = require('./router/artcate')
const article_router = require('./router/article')


// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

// 跨域
app.use(cors());

// 解析urlencoded表单数据
app.use(express.urlencoded({extended:false}));
// 解析json
app.use(express.json());

// 自定义中间件
// 发布处理失败消息
app.use((req, res, next) => {
  res.cc =function (err, status = 1)  {
    res.send({
      status, message: err instanceof Error ? err.message : err
    })
  }
  next()
})


// 解析token
app.use(exparessJwt({secret:config.JwtSecretKey}).unless({path:[/^\/api\//]}))





app.use('/api',user_router);
app.use('/my',userInfo_router);
app.use('/my/article', artCate_router)
app.use('/my/article', article_router)



// 错误中间件
app.use(function(err,req, res, next) {
  if (err instanceof joi.ValidationError) return res.cc(err);

  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

  res.cc(err);
})



app.listen(8081,(err) =>{
  if (err) throw err;

  console.log('api server running at  http://127.0.0.1:8081');
});