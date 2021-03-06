import express from 'express'
import userController from '../controllers/userController.js'
import { body } from 'express-validator'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, userController.getUsers)
router.post(
  '/register',
  body('email').isEmail(),
  body('password').isString().isLength({ min: 3, max: 32 }),
  userController.register
)
router.post('/login', body('password').isString(), userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

export default router
