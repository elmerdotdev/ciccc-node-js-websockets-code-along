import { Router } from 'express'

const router = Router()

router.get('/welcome', (req, res) => {
  res.status(200).send('Welcome to server')
})

export default router