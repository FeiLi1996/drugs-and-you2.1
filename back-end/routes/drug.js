const express = require('express')
const router = express.Router();

const{
    getDrugName
}= require('../controllers/drug')


    router.post('/drugName',getDrugName)

module.exports = router;

