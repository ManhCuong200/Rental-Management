import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export function AppSidebar({ items }) {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="mobile">
      <SidebarHeader className="pb-4 px-4">
        <div className="flex items-start justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold">RentMgr</h1>
            <p className="text-sm text-gray-500">Rental Management</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              isMobile ? setOpenMobile(false) : setOpen(false);
            }}
            className="p-2 rounded-md hover:bg-gray-200 lg:hidden mt-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </SidebarHeader>

      <Separator className="my-3" />

      <SidebarContent>
        <SidebarMenu className="px-2 mt-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.title}>
                <NavLink to={item.path} end>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      onClick={() => {
                        if (isMobile) setOpenMobile(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium 
                        ${isActive ? "bg-black text-white " : "text-gray-700"}
                      `}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? "text-white" : "text-gray-700"
                        }`}
                      />
                      {item.title}
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <Separator className="my-3" />

      <SidebarFooter className="mt-auto px-4 pb-4">
        <p className="text-sm font-semibold text-gray-600">Property Manager</p>
        <p className="text-xs text-gray-400">v1.0.0</p>
      </SidebarFooter>
    </Sidebar>
  );
}
