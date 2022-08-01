const express= require('express');
const router= express.Router();

const blogController = require('../controller/blogController');

router.get('/',blogController.blogIndex);

router.get('/create', blogController.blogCreate_get);

//post request handler
router.post('/',blogController.blogCreate_post);

router.get('/:id', blogController.blogDetails);

//delete request

router.delete('/:id', blogController.blogDelete );

module.exports = router;