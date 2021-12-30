const express = require('express')
const router = express.Router();



    router.all('*', (req, res) => {
        res.status(404).send('Resource not found')
    })
module.exports = router;