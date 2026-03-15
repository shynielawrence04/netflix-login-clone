import { useEffect, useState } from 'react'
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
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    const savedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user')

    if (savedUser) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
        const userData = {
          email: response.data.user.email,
        }

        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData))
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData))
        }

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

      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-black/60 backdrop-blur-lg shadow-2xl shadow-black/50 p-12 rounded-lg w-full max-w-112.5 border border-red-900/20">
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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 pr-16 rounded bg-zinc-900 border border-zinc-700 focus:border-red-600 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-300 hover:text-white"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 transition duration-200 p-3 rounded font-semibold disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="flex justify-between text-sm text-gray-400 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
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