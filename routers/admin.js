const express = require('express');
const router = express.Router();
const bankadb = require('../memorydb/bankadb');


//Route paths start with api/v1
router.get('/customers', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'success',
        allClients: bankadb
    })
});

module.exports = router;