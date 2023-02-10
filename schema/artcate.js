const joi=require('joi');


const name =joi.string().required();
const alias =joi.string().alphanum().required();
const is_delete =joi.number().integer().min(0).max(1).required();


exports.add_cate_schema = {
    body:{
        name,
        alias,
        is_delete
    }
}


const id=joi.number().integer().min(1).required();

exports.delete_cate_schema={
    body: {
        id
    }
}

// 校验规则对象 - 根据 Id 获取分类
exports.get_cate_schema = {
    params: {
        id,
    },
}


//更新
exports.update_cate_schema = {
    body:{
        id,
        name,
        alias,
        is_delete
    }
}