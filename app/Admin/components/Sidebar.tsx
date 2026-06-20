import Link from "next/link";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  return (
    <>
      {/* Mobile Overlay: Darkens the background when the menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-xl font-bold">Admin</span>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/" className="block p-2 rounded hover:bg-gray-100">
            Home
          </Link>
          <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100">
            Dashboard
          </Link>
          <Link href="/settings" className="block p-2 rounded hover:bg-gray-100">
            Settings
          </Link>
        </nav>
      </aside>
    </>
  );
}