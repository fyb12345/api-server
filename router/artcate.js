const express = require('express');
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');


const router = express.Router();

const artCate_handler = require('../router_handler/artcate')
const {add_cate_schema} = require('../schema/artcate')


router.get('/cates', artCate_handler.getArticleCates);

// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artCate_handler.addArticleCates)


module.exports = router;