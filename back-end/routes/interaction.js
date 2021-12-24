const express = require('express')
const router = express.Router();
const fetch =require("node-fetch")
const cheerio = require('cheerio')

const {
    getInteractionDescription
} = require('../controllers/interaction')

    router.post('/interaction',getInteractionDescription)

module.exports = router;
