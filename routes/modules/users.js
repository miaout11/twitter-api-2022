const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')
const {
  authenticatedUser,
  authenticated
} = require('../../middleware/api-auth')
const upload = require('../../middleware/multer')

// 查看特定使用者按過like的推文
router.get(
  '/:id/likes',
  authenticated,
  authenticatedUser,
  userController.getUserLikes
)
// 查看特定使用者發過的所有回覆
router.get(
  '/:id/replied_tweets',
  authenticated,
  authenticatedUser,
  userController.getUserReplies
)
// 查看特定使用者發過的所有推文
router.get(
  '/:id/tweets',
  authenticated,
  authenticatedUser,
  userController.getUserTweets
)

// 擁有最多追隨者的使用者 (前10名)
router.get('/top', authenticated, authenticatedUser, userController.getTopUsers)

// 查看特定使用者的追蹤者們
router.get(
  '/:id/followings',
  authenticated,
  authenticatedUser,
  userController.getFollowing
)
// 查看特定使用者的追隨者們
router.get(
  '/:id/followers',
  authenticated,
  authenticatedUser,
  userController.getFollower
)
// 查看特定使用者頁面
router.get('/:id', authenticated, authenticatedUser, userController.getUser)

// 編輯個人頁面
router.put(
  '/:id',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ]),
  authenticated,
  authenticatedUser,
  userController.putUser
)

// 登入不需要驗證登入狀態
router.post('/signin', userController.signIn)
// 註冊不需要驗證登入狀態
router.post('/', userController.signUp)

module.exports = router
