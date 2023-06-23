const extrapageController =require('../app/http/controllers/extrapageController')
const authController =require('../app/http/controllers/authController')
const dashboardController = require('../app/http/controllers/dashboardController')
const custfileController = require('../app/http/controllers/customers/custfileController')
const adminfileController = require('../app/http/controllers/admin/adminfileController')

const auth = require('../app/http/middlewares/auth')
const guest = require('../app/http/middlewares/guest')
const admin = require('../app/http/middlewares/admin')


function initRoutes(app) {
    app.get('/viewall', extrapageController().viewall)
    app.get('/termsandconditions', extrapageController().termsandconditions)
    app.get('/contactus', extrapageController().contactus)
    
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postlogin)
    
    app.get('/admin/signup', admin, authController().signup)
    app.post('/admin/signup', authController().postsignup)

    app.get('/admin/dashboard', admin, dashboardController().foradmin)
    app.get('/customers/dashboard', auth, dashboardController().foruser)

    app.post('/logout', authController().logout)

    app.get('/customers/createfile', auth, custfileController().createfile)
    app.post('/customers/createfile', custfileController().postcreatefile)

    app.get('/customers/activefile', auth, custfileController().activefile)

    app.get('/customers/deletefile', auth, custfileController().deletefile)
    app.post('/customers/deletefile', custfileController().postdeletefile)

    app.get('/admin/activefile', admin, adminfileController().activefile)

    app.get('/admin/createfile', admin, adminfileController().createfile)
    app.post('/admin/createfile', adminfileController().postcreatefile)

    app.get('/admin/deletefile', admin, adminfileController().deletefile)
    app.post('/admin/deletefile', adminfileController().postdeletefile)

}

module.exports = initRoutes