module.exports = function(router){
    let remoteController = require('../controllers/remote.controller')

    //router.get('/brands',bookController.get_brands)

    //router.get('/devices',bookController.get_devices)

    router.get('/controls/:device_id',remoteController.get_remote)

    //router.post('/brands/add',bookController.add_brands)

    //router.post('/devices/add',bookController.add_devices)

    router.post('/controls/add',remoteController.add_remote) //Che do hoc lenh

    //router.delete('/brands/delete/:id',bookController.remove_brands)

    //router.delete('/devices/delete/:id',bookController.remove_devices)

    //router.put('/book/update',bookController.update_book)
}