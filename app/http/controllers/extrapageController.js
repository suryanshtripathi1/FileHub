function extrapageController() {
    return {
        viewall(req, res) {
            res.render('viewall')
        },

        termsandconditions(req,res) {
            res.render('termsandconditions')
        },

        contactus(req,res) {
            res.render('contactus')
        }
    }
}

module.exports = extrapageController