import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/', userController.getUsers)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

export default router
