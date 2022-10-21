const User = require('./../models/userModel.js')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");



dotenv.config({ path : './config.env'});

exports.checkEmail = async (req, res, next)=>{
    const user = await User.findOne({ email: req.body.email});
    if (user){
        return res.status(400).json({
                status:'fail',
                message: "Email already exists"
            });
    }
    next();          
};
exports.checkAdmin = async (req, res, next)=>{
  console.log( req.params.id)
  const user = await User.findOne({ _id: req.params.id});
  console.log(user);
  if (user.email == "admin@gmail.com"){
      return res.status(408).json({
              status:'fail',
              message: "Change on admin is prohibited! Please contact the creator."
          });
  }
  next();          
};


exports.checkEmailLogin = async (req, res, next)=>{
  const user = await User.findOne({ email: req.body.email});
  if (!user){
      return res.status(400).json({
              status:'fail',
              message: "User does not exist!"
          });
  }
  next();          
};

exports.createUser = (req, res, next) => {
    console.log( req.body.password)
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        username: req.body.username,
        mobile: req.body.mobile,
        role: req.body.role
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Invalid authentication credentials!"
          });
        });
    });
  }
  
exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(402).json({
            message: "Auth failed"
          });
        }
        
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
        
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        const token = jwt.sign(
          {email: fetchedUser.email, userId: fetchedUser._id,role: fetchedUser.role },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id
        });
      })
      .catch(err => {
        return res.status(403).json({
          message: "Invalid authentication credentials!"
        });
      });
  }  

exports.getAllUsers = (req, res, next) => {
    const userQuery = User.find();
    let fetchedUsers;
    userQuery
      .then(documents => {
        fetchedUsers = documents;
        return User.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Users fetched successfully!",
          users: fetchedUsers,
          maxUsers: count
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching users failed!"
        });
      });
  };

/*exports.getAllUsers = async (req,res)=>{
    try{
        const users = await User.find();
        console.log(users);

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (err) {
        res.status(404).json({
            status:'fail',
            message: err
        });
    };
};*/

exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        console.log(user);
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user failed!"
      });
    });
};

exports.getUserByEmail = (req, res, next) => {
  User.findOne({email: req.params.email})
    .then(user => {
      if (user) {
        console.log(user);
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user failed!"
      });
    });
};


exports.updateUser = (req, res, next) => {

  const user = new User({
    _id: req.body.id ,
    password: req.body.password,
    mobile: req.body.mobile,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role
  });
  User.updateOne({ _id: req.params.id }, user)
    .then(() => {
        res.status(200).json({ message: "Update successful!" });
      })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate user!"
      });
    });
};

exports.deleteUserById =  async (req,res)=>{
    try{
        await User.findOneAndDelete({_id: req.params.id});      
        res.status(204).json({
            status:"success",
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status:'fail',
            message: err
        });
    }
};



exports.EmailAuth = async (req,res)=>{
    try{
        const user = await User.findOne({ email: req.params.email });
        res.status(200).json({
            status:"success",
            data: {
                user
            }
        });
        bcrypt.compare(req.body.password, user.password)

    } catch (err) {
        res.status(401).json({
            status:'Auth Failed',
            message: "err"
        });
    }
};

