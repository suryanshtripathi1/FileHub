const File = require("../../../models/file");
const User = require("../../../models/user");
const passport = require("passport");

function custfileController() {
  return {
    createfile(req, res) {
      res.render("customers/createfile");
    },
    async postcreatefile(req, res) {
      const { title, description } = req.body;

      //Creation Validation
      if (!title || !description) {
        req.flash("error", "All fields are required!!");
        return res.redirect("/customers/createfile");
      }
      const userId = req.user._id; // Get the logged-in user ID from the request

      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/customers/createfile");
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
          return res.redirect("/customers/dashboard");
        })
        .catch((err) => {
          req.flash("error", "Something is wrong!!");
          return res.redirect("/customers/dashboard");
        });
    },

    // Render the template and pass the `files` array
    activefile(req, res) {
      // finding files for loggedIn user
      File.find({user: req.user._id}, (err,files) => {
        if(err){
            console.log(err)
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render("customers/activefile", {files});
      })
    },

    //Delete selected files
    deletefile(req,res) {
        //finding files for loggedIn user
        File.find({user: req.user._id}, (err,files) => {
            if(err){
                console.log(err)
                res.status(500).send('Internal Serval Error');
                return;
            }
        res.render("customers/deletefile", {files});
    })
  },

  async postdeletefile(req,res){
    try{
        const fileIds = req.body.fileIds; //get file id
        // Delete the files with the provided fileIds from the database
        await File.deleteMany({ _id: { $in: fileIds } });
        res.redirect("/customers/dashboard");
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  },

  }
}

module.exports = custfileController;
