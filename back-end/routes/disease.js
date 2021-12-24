const express = require('express')

const router = express.Router();


const {
    getDiseaseName
  } = require('../controllers/disease')



router.post('/diseaseName',getDiseaseName)

    
 


module.exports = router;
