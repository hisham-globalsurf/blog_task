import React from "react";
import { Users, FileText, ChevronLeft, ChevronRight, Contact } from "lucide-react";
import classNames from "classnames";
import { useSelector } from "react-redux";

const Sidebar = ({ collapsed, setCollapsed, activeTab, setActiveTab }) => {
  const { user } = useSelector((state) => state.auth);
  const navItems = [
    { key: "users", label: "Users", icon: <Users size={20} /> },
    { key: "blogs", label: "Blogs", icon: <FileText size={20} /> },
    { key: "forms", label: "Forms", icon: <Contact size={20} /> },
  ];

  return (
    <aside
      className={classNames(
        "h-full bg-white border-r shadow-sm transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="text-[18px] font-bold">{user?.name}</h2>}
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex flex-col p-2 space-y-4">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={classNames(
              "flex items-center px-3 py-2 rounded hover:bg-gray-100 transition",
              activeTab === item.key ? "font-medium border-l-4 border-l-cyan-500" : "font-medium border-l-4 border-l-white"
            )}
          >
            {item.icon}
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
