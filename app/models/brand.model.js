//brand.model.js
const db = require('../common/connect');
const Brand = function (brand) {
  this.Protocol = brand.Protocol;
  this.Brand = brand.Brand;
};

Brand.getByProtocol = function(protocol,callback){
    const sql='SELECT Brand FROM ac_protocol WHERE Protocol=?'
    db.query(sql,protocol,(err,result) => {
        if(err){
            console.error(err)
            callback(err,null)
        } else {
            callback(null,result)
        }
    })
}

Brand.getAll = function(callback){
    const sql='SELECT Brand FROM ac_protocol'
    db.query(sql,(err,result) => {
        if(err){
            console.error(err)
            callback(err,null)
        } else {
            callback(null,result)
        }
    })
}

module.exports = Brand;