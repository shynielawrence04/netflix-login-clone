const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const mockUser = {
  email: 'test@netflix.com',
  password: '123456',
}

app.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    })
  }

  if (email === mockUser.email && password === mockUser.password) {
    return res.status(200).json({
      success: true,
      message: 'Login successful',
    })
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password',
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})