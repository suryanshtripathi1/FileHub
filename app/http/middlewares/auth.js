function auth(req, res, next) {
    if(req.isAuthenticated() && req.user.role === 'customer') {
        return next()
    }
    else if(req.isAuthenticated() && req.user.role === 'admin') {
        return res.redirect('/admin/dashboard')
    }
    return res.redirect('/')
}

module.exports = auth