"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BlogLayoutProps {
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  children: React.ReactNode;
}

export default function BlogLayout({
  leftSidebar,
  rightSidebar,
  children,
}: BlogLayoutProps) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Close drawers on resize to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsLeftSidebarOpen(false);
        setIsRightSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine if overlay should be shown
  const shouldShowOverlay = isLeftSidebarOpen || isRightSidebarOpen;

  return (
    <div className="relative mx-auto max-w-screen-2xl">
      {/* Mobile overlay */}
      {shouldShowOverlay && (
        <div
          className="fixed inset-0 z-40 bg-gray-600/75 lg:hidden"
          onClick={() => {
            setIsLeftSidebarOpen(false);
            setIsRightSidebarOpen(false);
          }}
        />
      )}

      {/* Grid layout container */}
      <div
        className={cn(
          "grid grid-cols-1 gap-8",
          "lg:grid-cols-[minmax(0,1fr)_240px]", // Main + Right sidebar
          "xl:grid-cols-[240px_minmax(0,1fr)_240px]" // Left + Main + Right
        )}
      >
        {/* Left sidebar */}
        {leftSidebar && (
          <aside
            className={cn(
              // Base styles
              "overflow-y-auto bg-background px-4 pb-10 pt-6 border-r",
              "transition-transform duration-200",
              // Mobile: Fixed drawer
              "fixed top-[3.5rem] left-0 z-50 h-[calc(100vh-3.5rem)] w-64",
              "transform",
              isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full",
              // Desktop: Grid column
              "xl:static xl:col-span-1 xl:translate-x-0",
              "xl:sticky xl:top-[3.5rem]"
            )}
            id="left-sidebar"
            aria-label="Left sidebar"
          >
            {leftSidebar}
          </aside>
        )}

        {/* Main content */}
        <main
          className="w-full max-w-none prose prose-gray dark:prose-invert py-8 px-4 lg:px-8"
          aria-label="Main content"
        >
          {children}
        </main>

        {/* Right sidebar */}
        {rightSidebar && (
          <aside
            className={cn(
              // Base styles
              "overflow-y-auto bg-background px-4 pb-10 pt-6 border-l",
              "transition-transform duration-200",
              // Mobile: Fixed drawer
              "fixed top-[3.5rem] right-0 z-50 h-[calc(100vh-3.5rem)] w-64",
              "transform",
              isRightSidebarOpen ? "translate-x-0" : "translate-x-full",
              // Desktop: Grid column
              "lg:static lg:col-span-1 lg:translate-x-0",
              "lg:sticky lg:top-[3.5rem]"
            )}
            id="right-sidebar"
            aria-label="Right sidebar"
          >
            {rightSidebar}
          </aside>
        )}
      </div>

      {/* Mobile toggle buttons */}
      <div className="fixed bottom-4 right-4 flex gap-2 lg:hidden">
        {leftSidebar && (
          <button
            onClick={() => {
              setIsLeftSidebarOpen(!isLeftSidebarOpen);
              setIsRightSidebarOpen(false);
            }}
            className="rounded-full bg-primary p-3 text-white shadow-lg"
            aria-label="Toggle left sidebar"
            aria-controls="left-sidebar"
            aria-expanded={isLeftSidebarOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        {rightSidebar && (
          <button
            onClick={() => {
              setIsRightSidebarOpen(!isRightSidebarOpen);
              setIsLeftSidebarOpen(false);
            }}
            className="rounded-full bg-primary p-3 text-white shadow-lg"
            aria-label="Toggle table of contents"
            aria-controls="right-sidebar"
            aria-expanded={isRightSidebarOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="14" y2="12" />
              <line x1="4" y1="18" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

