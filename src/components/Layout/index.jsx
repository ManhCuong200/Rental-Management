import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { LayoutDashboard, Home, Users, FileText, Settings } from "lucide-react";
import Header from "../Header";
import {Separator} from "@/components/ui/separator";

const Layout = () => {
  const items = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Rooms", icon: Home, path: "rooms" },
    { title: "Tenants", icon: Users, path: "tenants" },
    { title: "Bills", icon: FileText, path: "bills" },
    { title: "Settings", icon: Settings, path: "setting" },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar items={items} />       
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header  />
          <Separator className="w-full self-stretch" />
          <main className="flex-1 p-6 overflow-y-auto bg-white">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
