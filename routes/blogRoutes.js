const express = require('express');
const router = express.Router();
const postController = require('../controllers/blogPostController');
const authMiddleware = require('../middleware/authmiddleware')

router.use(authMiddleware)
router.get('/', postController.getPosts);
router.post('/add', postController.addPost);
router.patch('/update/:id', postController.updatePost);
router.delete('/delete/:id', postController.deletePost);

module.exports = router;
