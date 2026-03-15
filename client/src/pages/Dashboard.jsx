import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const savedUser = JSON.parse(
    localStorage.getItem('user') || sessionStorage.getItem('user')
  )

  const handleLogout = () => {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    navigate('/')
  }

  const movies = [
    'Stranger Things',
    'Wednesday',
    'Money Heist',
    'The Witcher',
    'Dark',
    'Squid Game',
  ]

  const userInitial = savedUser?.email?.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
        <h1 className="text-red-600 text-3xl font-bold tracking-widest">
          NETFLIX
        </h1>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-white">
            {userInitial}
          </div>

          <span className="text-sm text-gray-300">
            {savedUser ? savedUser.email : 'User'}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="px-8 py-10">
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-3">Welcome to Dashboard</h2>
          <p className="text-gray-400">
            You logged in successfully. Enjoy your Netflix-style homepage.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Trending Now</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-lg p-4 h-40 flex items-end shadow-lg hover:scale-105 transition"
              >
                <p className="font-semibold">{movie}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Continue Watching</h3>
          <div className="bg-zinc-900 rounded-lg p-6 shadow-lg">
            <p className="text-lg font-medium">Next up: Stranger Things</p>
            <p className="text-gray-400 mt-2">
              Episode 4 is ready for you to continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard