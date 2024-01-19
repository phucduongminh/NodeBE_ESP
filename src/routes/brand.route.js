module.exports = function(router){
    let brandController = require('../controllers/brand.controller')

    router.get('/brands',brandController.get_brands)

    router.post('/brands/add',brandController.add_brands)

    router.delete('/brands/delete/:id',brandController.remove_brands)

    //router.put('/book/update',bookController.update_book)
}