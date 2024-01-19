module.exports = function(router){
    let homeController = require('../controllers/home.controller')

    router.get('/',homeController.home)
}