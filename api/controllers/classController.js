const Class = require('../models/classModel.js')

const dotenv = require("dotenv");

dotenv.config({ path : './config.env'});


exports.createClass = (req, res, next) => {
    
      const classroom = new Class({
        classname: req.body.classname,
        description: req.body.description,
        day: req.body.day,
        time: req.body.time
      });
      
      classroom
        .save()
        .then(result => {
          res.status(201).json({
            message: "Class created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Invalid authentication credentials!"
          });
        });
   }
  

exports.getAllClasses = (req, res, next) => {
    const classQuery = Class.find();
    let fetchedClasses;
    classQuery
      .then(documents => {
        fetchedClasses = documents;
        return Class.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Classs fetched successfully!",
          classes: fetchedClasses,
          maxClasses: count
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching classs failed!"
        });
      });
  };

/*exports.getAllClasss = async (req,res)=>{
    try{
        const classs = await Class.find();
        console.log(classs);

        res.status(200).json({
            status: 'success',
            results: classs.length,
            data: {
                classs
            }
        });
    } catch (err) {
        res.status(404).json({
            status:'fail',
            message: err
        });
    };
};*/

exports.getClassById = (req, res, next) => {
  Class.findById(req.params.id)
    .then(classroom => {
      if (classroom) {
        res.status(200).json(classroom);
      } else {
        res.status(404).json({ message: "Class not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching class failed!"
      });
    });
};



exports.updateClassById = (req, res, next) => {

  const classroom = new Class({
        _id: req.body.id ,
        classname: req.body.classname,
        description: req.body.description,
        day: req.body.day,
        time: req.body.time
  });
  Class.updateOne({ _id: req.params.id }, classroom)
    .then(() => {
        res.status(200).json({ message: "Update successful!" });
      })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate class!"
      });
    });
};

exports.deleteClassById  =  async (req,res)=>{
    try{
        await Class.findOneAndDelete({_id: req.params.id});      
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



