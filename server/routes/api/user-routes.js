const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  saveCourse,
  deleteCourse,
  login,
  addComment,
  removeComment,
  addRecommendation,
  removeRecommendation
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveBook);
router.route('/courses').post(createUser).put(authMiddleware, saveCourse);
router.route('/comments').post(createUser).put(authMiddleware, addComment);
router.route('/recommendations').post(createUser).put(authMiddleware, addRecommendation);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);
// edit user
// delete user

router.route('/books/:bookId').delete(authMiddleware, deleteBook);
router.route('/courses/:courseId').delete(authMiddleware, deleteCourse);
router.route('/comments/:commentId').delete(authMiddleware, removeComment);
router.route('/recommendations/:recommendationId').delete(authMiddleware, removeRecommendation);


module.exports = router;
