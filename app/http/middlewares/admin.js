function admin(req, res, next) {
    if(req.isAuthenticated() && req.user.role === 'admin') {
        return next()
    }
    else if(req.isAuthenticated() && req.user.role === 'customer') {
        return res.redirect('/customers/dashboard')
    }
    return res.redirect('/login')
}

module.exports = admin