function guest(req, res, next) {
    if(!req.isAuthenticated()) {
        return next()
    }
    else if(req.isAuthenticated() && req.user.role === 'customer') {
        return res.redirect('/customers/dashboard')
    }
    else if(req.isAuthenticated() && req.user.role === 'admin') {
        return res.redirect('/admin/dashboard')
    }
}

module.exports = guest