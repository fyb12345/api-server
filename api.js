const express = require('express');
const cors = require('cors');
const app=express();

// 路由
const routerUser=require('./router/user');



// 跨域
app.use(cors());

// 解析urlencoded表单数据
app.use(express.urlencoded({extended:false}));
// 解析json
app.use(express.json());



app.use('/api',routerUser);


app.listen(8081,(err) =>{
  if (err) throw err;

  console.log('api server running at  http://127.0.0.1:8081');
});