function extrapageController() {
    return {
        viewall(req, res) {
            res.render('viewall')
        },

        termsandconditions(req,res) {
            res.render('termsandconditions')
        }
    }
}

module.exports = extrapageController