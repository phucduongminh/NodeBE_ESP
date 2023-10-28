exports.get_list = function (req,res){
    var data = [
        {
            "id":1,
            "name":"Name",
        }
    ]
    res.send({result:data})
}

exports.detail = function (req,res){
    var data = [
        {
            "id":req.params.id,
            "name":"Detail",
        }
    ]
    res.send({result:data})
}