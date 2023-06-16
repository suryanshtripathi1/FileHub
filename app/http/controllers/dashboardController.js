function dashboardController() {
    return{
        foradmin(req,res){
            res.render('admin/dashboard')
        },
        foruser(req,res){
            res.render('customers/dashboard')
        }
    }
}

module.exports = dashboardController