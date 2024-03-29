const db=require('../db/index');
// 导入处理路径的 path 核心模块
const path = require('path')

exports.getArticleCateList=function (req,res){
   const sql ='SELECT * from ev_articles  where is_delete=0 order by id asc'
    db.query(sql,(err,result)=>{
        if (err) throw err;

        res.send({
            status:0,
            message:'获取成功!',
            data:result
        })

    })

}

exports.getArticleCate=function (req,res){
    const sql ='SELECT * from ev_articles  where id=?'
    db.query(sql,[req.params.id],(err,result)=>{
        if (err) throw err;

        res.send({
            status:0,
            message:'获取成功!',
            data:result[0]
        })

    })

}


exports.addArticle=function(req,res){
    // 手动判断是否上传了文章封面
    // if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')


    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        // cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,

        is_delete:0
    }

    const sql = 'insert into ev_articles set ?'
    db.query(sql,[articleInfo],(err,result) => {
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (result.affectedRows !== 1) return res.cc('发布文章失败！')

        // 发布文章成功
        res.cc('发布文章成功', 200, 0)
    })
}


//删除
exports.deleteArticle=function(req,res){
    const sql ='update ev_articles SET is_delete=1 WHERE id = ?';

    db.query(sql,[req.params.id],(err,result) => {
        if(err) throw err;

        if (1!==result.affectedRows) res.cc('删除失败');

        res.cc('删除成功',200, 0)
    })
}

// 更新
exports.updateArticle=function(req,res){
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')


    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),

    }
    const sql ='update ev_articles SET ? WHERE id = ?';
    db.query(sql,[articleInfo,req.params.id],(err,result) => {
        if(err) throw err;

        if (1!==result.affectedRows) res.cc('更新失败');

        res.cc('更新成功',200, 0)
    })
}