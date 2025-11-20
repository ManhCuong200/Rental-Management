import React from "react";
import { useSidebar } from "@/components/ui/sidebar";

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="border-b border-border bg-card h-16 flex items-center px-4 lg:px-8 w-full">
      <button
        onClick={toggleSidebar}
        className="
          inline-flex items-center justify-center gap-2 
          whitespace-nowrap rounded-md text-sm font-medium 
          transition-all 
          disabled:pointer-events-none disabled:opacity-50 
          outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0
          hover:bg-accent hover:text-accent-foreground
          dark:hover:bg-accent/50
          w-9 h-9 lg:hidden mr-2
        "
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
          className="lucide lucide-menu w-5 h-5"
        >
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
      </button>
      <h2 className="text-sm lg:text-lg font-semibold text-foreground truncate">
        Welcome to Rental Management System
      </h2>
    </div>
  );
};

export default Header;
