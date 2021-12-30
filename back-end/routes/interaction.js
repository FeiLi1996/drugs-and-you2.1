const express = require('express')
const router = express.Router();


const {
    getInteractionDescription
} = require('../controllers/interaction')

    router.post('/interaction',getInteractionDescription)

module.exports = router;
