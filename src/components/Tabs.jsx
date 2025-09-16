import CSS from '../styles/Tabs.module.scss'

export default function Tabs({tab, setTab}) {
  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setTab('fuel')}
          className={`flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-800 ${tab === 'fuel' ? CSS.active : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M18 7V3H6v18h8a2 2 0 002-2v-5h2v3a1 1 0 002 0v-6a1 1 0 00-.293-.707L18 7zM8 5h8v2H8V5z" />
          </svg>
          Combustible
        </button>

        <button
          onClick={() => setTab('flight')}
          className={`flex min-w-8 items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${tab === 'flight' ? CSS.active : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.5 19.5l19-7.5-19-7.5v5l14 2.5-14 2.5v5z"
            />
          </svg>
          Vuelos
        </button>
      </div>
    </div>
  )
}
