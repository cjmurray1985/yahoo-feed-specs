"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AnnouncementBar from "@/components/AnnouncementBar";

export default function LayoutShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <div className="sticky top-0 z-50 flex flex-col">
                <AnnouncementBar />
                <Header onToggleLeftMenu={toggleSidebar} />
            </div>
            <div className="flex min-h-screen">
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                <main className="flex-1 min-w-0">
                    <div className="max-w-[1400px] p-8">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
