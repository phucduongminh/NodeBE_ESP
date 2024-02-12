const Brand = require('../models/brand.model')

exports.listbrand = function(req,res){
    const { protocol } = req.body;
    if(!protocol){
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }
    Brand.getByProtocol(protocol,(err,brand)=>{
        if(err){
            return res.status(400).json({ success: false, message: 'Database error' });
        }
        if(!brand){
            return res
              .status(401)
              .json({ success: false, message: 'Not Found Brand!' });
        } else {
            return res.send(brand);
        }
    })
}