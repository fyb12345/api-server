const db = require('../db/index')

// 查询分类列表
exports.getArticleCates = function (req, res) {
    const sql = 'SELECT id,name,alias,is_delete FROM ev_article_cate  where is_delete=0 order by id asc'

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send({
            status: 0, message: '获取成功', data: result
        })
    })
}


exports.addArticleCates = function (req, res) {
    const body = req.body;
    const sql = 'SELECT id,name,alias,is_delete FROM ev_article_cate WHERE name=? or alias=?'
    db.query(sql,[body.name, body.alias], (err, result) => {
        if (err) throw err;
        // 分类名称 和 分类别名 都被占用
        if (result.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (result.length === 1 && result[0].name === body.name && result[0].alias === body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (result.length === 1 && result[0].name === body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (result.length === 1 && result[0].alias === body.alias) return res.cc('分类别名被占用，请更换后重试！')


        const sql = 'INSERT INTO ev_article_cate SET ?';
        db.query(sql, [body], (err, result) => {
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (result.affectedRows !== 1) return res.cc('新增文章分类失败！')
            console.log(result)
            // 新增文章分类成功
            res.cc('新增文章分类成功！', 0)
        })
    })
}

