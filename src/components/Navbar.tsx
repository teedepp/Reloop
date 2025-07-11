import useStore from '../store'

const Navbar = () => {
  const { user } = useStore()

  return (
    <nav className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <div className="text-xl text-lime-700 font-bold" style={{ fontFamily: 'Basique, sans-serif' }}>
        Welcome Back 👋
      </div>

      <div className="flex items-center space-x-4">
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          {user.ecoPoints} Eco Points
        </div>
        <img
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
          alt="avatar"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </nav>
  )
}

export default Navbar
