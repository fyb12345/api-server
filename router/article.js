const express = require('express');
const expressJoi = require('@escook/express-joi');
const router = express.Router();

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({dest: path.join(__dirname, '../uploads')})

// 导入文章分类的路由处理函数模块
const article_handler = require('../router_handler/article')

// 表单验证
const {add_article_schema,delete_article_schema} = require('../schema/article')


router.get('/list', article_handler.getArticleCateList);


// 发布新文章的路由
// 注意：在当前的路由中，先后使用了两个中间件：
//       先使用 multer 解析表单数据
//       再使用 expressJoi 对解析的表单数据进行验证
router.post('/add', upload.single('cover_img'),expressJoi(add_article_schema), article_handler.addArticle)

router.post('/articleInfo/:id', article_handler.getArticleCate)


router.post('/delete/:id', article_handler.deleteArticle)


router.post('/update/:id',upload.single('cover_img'),expressJoi(add_article_schema), article_handler.updateArticle)


module.exports = router;