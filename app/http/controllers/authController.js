const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/dashboard' : '/customers/dashboard'
    }

    return {
        login(req, res) {
            res.render('auth/login')
        },

        postlogin(req, res, next) {
            const { cpfnumber, password, check} = req.body
            //Request validation
            if (!cpfnumber || !password) {
                req.flash('error', 'All fields are required!!')
                return res.redirect('/')
            }
            if(!check){
                req.flash('error', 'Please check Terms & Conditions')
                return res.redirect('/')
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },

        signup(req, res) {
            res.render('admin/signup')
        },

        async postsignup(req, res) {
            const { cpfnumber, password } = req.body
            //Validate request
            if (!cpfnumber || !password) {
                req.flash('error', 'All fields are required!!')
                req.flash('cpfnumber', cpfnumber)
                return res.redirect('/admin/signup')
            }
            //Email already registered
            User.exists({ cpfnumber: cpfnumber }, (err, result) => {
                if (result) {
                    req.flash('error', 'CPF number already registered!!')
                    req.flash('cpfnumber', cpfnumber)
                    return res.redirect('/admin/signup')
                }
            })
            //password hashing
            const hashedPassword = await bcrypt.hash(password, 10)

            //Register the user
            const user = new User({
                cpfnumber: cpfnumber,
                password: hashedPassword
            })

            user.save().then((user) => {
                //for login in future
                return res.redirect('/admin/signup')
            }).catch(err => {
                req.flash('error', 'Something is wrong!!')
                return res.redirect('/admin/signup')
            })
        },

        logout(req, res, next) {
            req.logout((err) => {
                if(err) {
                    return next(err);
                }
                return res.redirect('/');
            })
        }
    }
}

module.exports = authController