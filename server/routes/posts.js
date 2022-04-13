import express from 'express'
import { fetchPosts } from '../controllers/posts.js'
const router = express.Router()

router.get('/', fetchPosts)

export default router
