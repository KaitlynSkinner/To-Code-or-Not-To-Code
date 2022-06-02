const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveCourse,
  deleteCourse,
  login,
  addRecommendation,
  removeRecommendation,
  addComment,
  removeComment
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/courses').post(createUser).put(authMiddleware, saveCourse);
router.route('/recommendations').post(createUser).put(authMiddleware, addRecommendation);
router.route('/comments').post(createUser).put(authMiddleware, addComment);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);
// edit user
// delete user

router.route('/courses/:courseId').delete(authMiddleware, deleteCourse);
router.route('/recommendations/:recommendationId').delete(authMiddleware, removeRecommendation);
router.route('/comments/:commentId').delete(authMiddleware, removeComment);

module.exports = router;
