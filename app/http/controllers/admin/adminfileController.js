const File = require("../../../models/file");
const User = require("../../../models/user");
const passport = require("passport");

function adminfileController() {
    return{
        activefile(req,res){
            //find files for all users
            File.find({}, (err, files) => {
                if (err) {
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                  return;
                }
                res.render("admin/activefile", { files });
              });
        },

        createfile(req,res){
            res.render('admin/createfile');
        },
        async postcreatefile(req, res) {
            const { title, description } = req.body;
      
            //Creation Validation
            if (!title || !description) {
              req.flash("error", "All fields are required!!");
              return res.redirect("/admin/createfile");
            }
            const userId = req.user._id; // Get the logged-in user ID from the request
      
            // Find the user
            const user = await User.findById(userId);
            if (!user) {
              req.flash("error", "User not found");
              return res.redirect("/admin/createfile");
            }
      
            // Iterate through the text data received and create a file for each entry
            const file = new File({
              user: user._id,
              title: title,
              description: description,
            });
      
            file
              .save()
              .then((file) => {
                return res.redirect("/admin/dashboard");
              })
              .catch((err) => {
                req.flash("error", "Something is wrong!!");
                return res.redirect("/admin/dashboard");
              });
          },

          deletefile(req,res){
            //find files for all users
            File.find({}, (err, files) => {
                if (err) {
                  console.log(err);
                  res.status(500).send('Internal Server Error');
                  return;
                }
                res.render("admin/deletefile", { files });
              });
          },

          async postdeletefile(req,res){
            try{
                const fileIds = req.body.fileIds; //get file id
                // Delete the files with the provided fileIds from the database
                await File.deleteMany({ _id: { $in: fileIds } });
                res.redirect("/admin/dashboard");
            }catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
          },
    }
}

module.exports = adminfileController;