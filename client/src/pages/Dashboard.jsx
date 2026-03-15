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
    {
      title: 'Stranger Things',
      image:
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Wednesday',
      image:
        'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Money Heist',
      image:
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'The Witcher',
      image:
        'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Dark',
      image:
        'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Squid Game',
      image:
        'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=800&q=80',
    },
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
                className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                <p className="absolute bottom-3 left-3 font-semibold text-white">
                  {movie.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Continue Watching</h3>
          <div className="relative bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=1200&q=80"
              alt="Continue Watching"
              className="w-full h-72 object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent flex flex-col justify-center px-6">
              <p className="text-2xl font-bold">Next up: Stranger Things</p>
              <p className="text-gray-300 mt-2">
                Episode 4 is ready for you to continue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard