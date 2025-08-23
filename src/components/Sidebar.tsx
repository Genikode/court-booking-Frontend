type SidebarProps = {
  onSelect: (section: string) => void;
  selected: string;
};

import { useRouter } from 'next/navigation';

const Sidebar = ({ onSelect, selected }: SidebarProps) => {
  const router = useRouter();

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 font-bold text-xl border-b border-gray-800">Creek Dashboard</div>
      <nav className="flex-1 p-4 space-y-2">
          <button
              className={`w-full text-left px-4 py-2 rounded ${selected === 'dashboard' ? 'bg-pink-600' : ''}`}
              onClick={() => onSelect('dashboard')}
          >
              Dashboard
          </button>
        <button
          className={`w-full text-left px-4 py-2 rounded ${selected === 'court' ? 'bg-pink-600' : ''}`}
          onClick={() => onSelect('court')}
        >
          Tennis Courts
        </button>
        <button
          className={`w-full text-left px-4 py-2 rounded ${selected === 'field' ? 'bg-pink-600' : ''}`}
          onClick={() => onSelect('field')}
        >
          Football Field
        </button>
        <button
          className={`w-full text-left px-4 py-2 rounded ${selected === 'members' ? 'bg-pink-600' : ''}`}
          onClick={() => onSelect('members')}
        >
          Employee CRUD
        </button>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button className="w-full bg-gray-700 py-2 rounded mb-2" onClick={() => onSelect('account')}>Account</button>
        <button className="w-full bg-red-600 py-2 rounded" onClick={() => router.push('/login')}>Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;