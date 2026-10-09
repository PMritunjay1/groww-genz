import { Outlet, NavLink } from 'react-router-dom';
import { Home, BookOpen, Calculator, Target, PieChart, Settings } from 'lucide-react';

const Layout = () => {
  const navItems = [
    { to: '/', icon: <Home size={24} />, label: 'Home' },
    { to: '/learn', icon: <BookOpen size={24} />, label: 'Learn' },
    { to: '/simulator', icon: <Calculator size={24} />, label: 'Simulator' },
    { to: '/goals', icon: <Target size={24} />, label: 'Goals' },
    { to: '/portfolio', icon: <PieChart size={24} />, label: 'Portfolio' },
    { to: '/settings', icon: <Settings size={24} />, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-10 shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Groww FirstStep</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide">Educational Concept</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 relative bg-slate-50 min-h-screen">
        <div className="md:hidden p-4 bg-white shadow-sm sticky top-0 z-20 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-primary">Groww FirstStep</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide leading-none">Concept</p>
          </div>
        </div>
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around p-2 z-20 pb-safe shadow-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg ${
                isActive ? 'text-primary' : 'text-slate-400'
              }`
            }
          >
            {item.icon}
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
