import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Users from "./Users";
import Blogs from "./Blogs";
import ContactList from "./ContactList";

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  const renderTab = () => {
    switch (activeTab) {
      case "users":
        return <Users />;
      case "blogs":
        return <Blogs />;
      case "forms":
        return <ContactList />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 overflow-y-auto bg-gray-50">{renderTab()}</main>
    </div>
  );
};

export default AdminDashboard;
