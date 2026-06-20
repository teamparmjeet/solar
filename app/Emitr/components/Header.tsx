export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-slate-100 md:px-6">
      <div className="flex items-center">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-600 rounded-md md:hidden hover:bg-gray-100 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-sm text-gray-600 rounded hover:bg-gray-100">
          Profile
        </button>
      </div>
    </header>
  );
}