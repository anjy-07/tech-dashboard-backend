const express = require('express');
const fs = require('fs');
const path = require('path');
var router = require('express').Router();

router.get('/',function(req,res) {
  try {
    const data = fs.readFileSync(path.join(__dirname, './stats.json'));
    const stats = JSON.parse(data);
    end(stats)
  } catch (e) {
    next(e);
  }
});


module.exports = router;