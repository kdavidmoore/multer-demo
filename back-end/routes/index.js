var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost:27017/dcclass';
var connection = mongoose.connect(mongoUrl);
var Student = require('../models/students');
var multer = require('multer');
var fs = require('fs');
var upload = multer({dest: 'uploads/'});
var type = upload.single('uploadedFile');


router.post('/uploads', type, function(req, res, next){
	var targetPath = 'public/images/' + req.file.originalname;
	fs.readFile(req.file.path, function(error, data){
		fs.writeFile(targetPath, data, function(error){
			if(error){
				res.json('Error: ' + error);
			} else {
				res.json('Success!');
			}
		});
	});
});


// get the students page
router.get('/students/:sortMethod', function(req, res, next) {
	var studentsArr = [];

	if (req.params.sortMethod == 'default' || req.params.sortMethod == 'reversed') {
		
		Student.find({}, function(error, results){
			for (var i=0; i<results.length; i++){
				studentsArr.push(results[i].name);
			}

			studentsArr.sort();
			
			if (req.params.sortMethod == 'reversed'){
				studentsArr.reverse();
			}
		   	res.json(studentsArr);
		});
	}
});


module.exports = router;
