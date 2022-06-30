import express from 'express'
import userController from '../controllers/userController.js'
import { body } from 'express-validator'

const router = express.Router()

router.get('/', userController.getUsers)
router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.register
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

export default router
