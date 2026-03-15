import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    try {
      setLoading(true)

      const response = await axios.post(
        'https://netflix-login-backend-dp7p.onrender.com/login',
        formData
      )

      if (response.data.success) {
        navigate('/dashboard')
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#3a0000] via-[#120000] to-black text-white">
      <div className="px-12 py-6">
        <h1 className="text-red-600 text-4xl font-bold tracking-widest">
          NETFLIX
        </h1>
      </div>

      <div className="flex items-center justify-center h-[80vh]">
        <div className="bg-black/60 backdrop-blur-lg shadow-2xl shadow-black/50 p-12 rounded-lg w-112.5 border border-red-900/20">
          <h2 className="text-3xl font-semibold mb-8">Sign In</h2>

          {serverError && (
            <div className="bg-red-700/80 text-white p-2 mb-4 rounded text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email or phone number"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none transition"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none transition"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition duration-200 p-3 rounded font-semibold"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="flex justify-between text-sm text-gray-400 mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <span>Need help?</span>
          </div>

          <p className="text-gray-400 mt-8">
            New to Netflix? <span className="text-white">Sign up now.</span>
          </p>

          <p className="text-xs text-gray-500 mt-4 leading-5">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login