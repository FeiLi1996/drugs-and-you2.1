const express = require('express')
const fetch =require("node-fetch")
const cheerio = require('cheerio')
const router = express.Router();

const{
    getDrugName
}= require('../controllers/drug')


    router.post('/drugName',getDrugName)

module.exports = router;

