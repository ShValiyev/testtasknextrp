var express = require('express');
var User = require('../models/user');
var log = require('../lib/log')(module);
var ObjectID = require('mongodb').ObjectID;

var router = express.Router();

router.post('/', function(req, res, next) {
  if(!req.body.fullName || !req.body.birthday || req.body.fullName.length > 100){
    log.info('Response status from /users[post]: 400');
    return res.sendStatus(400);
  }
  User.addUser(req.body, function(err){
    if(err){
      log.error(err);
      return res.sendStatus(500);
    }
    log.info('Response status from /users[post]: 200');
    res.sendStatus(200); 
  });
});

router.get('/', function(req, res, next) {
  User.findUsers(function(err, users){
    if(err){
      log.error(err);
      return res.sendStatus(500);
    }
    res.send(users);
  });
});

router.put('/', function(req, res, next) {
  if(!req.body.id || !req.body.fullName || !req.body.birthday || req.body.fullName.length > 100){
    log.info('Response status from /users[put]: 400');
    return res.sendStatus(400);
  }
  try {
    var id = new ObjectID(req.body.id);
  } catch(err) {
    log.error(err);
    return res.sendStatus(401);
  }
  User.updateUser(id, req.body, function(err){
    if(err){
      log.error(err);
      return res.sendStatus(500);
    }
    log.info('Response status from /users[put]: 200');
    res.sendStatus(200); 
  });
});

router.delete('/', function(req, res, next) {
  if(!req.body.id){
    log.info('Response status from /users[delete]: 400');
    return res.sendStatus(400);
  }
  try {
    var id = new ObjectID(req.body.id);
  } catch(err) {
    log.error(err);
    return res.sendStatus(400);
  }
  User.deleteUser(id, function(err){
    if(err){
      log.error(err);
      return res.sendStatus(500);
    }
    log.info('Response status from /users[delete]: 200');
    res.sendStatus(200); 
  });
});

module.exports = router;
