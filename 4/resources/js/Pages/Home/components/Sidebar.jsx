// components/Sidebar.jsx
import React from 'react';
import ResizeHandle from './ResizeHandle';
import FileTree from './FileTree';

const Sidebar = ({
    selectedTab,
    setSelectedTab,
    files,
    setFiles,
    selectedFile,
    setSelectedFile,
    setFileContent,
    openFiles,
    setOpenFiles,
    sidebarWidth,
    setSidebarWidth
}) => {
    return (
        <div
            className="bg-gray-800 border-r border-gray-700 flex relative"
            style={{ width: `${sidebarWidth}px` }}
        >
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-700">
                    <div className="w-full text-black flex flex-row justify-around gap-1 text-sm">
                        <div onClick={() => setSelectedTab("contents")} className={`py-1 px-2 rounded-sm cursor-pointer ${selectedTab === "contents" ? "bg-amber-300" : "bg-gray-500"}`}>
                            Contents
                        </div>
                        <div onClick={() => setSelectedTab("workspace")} className={`py-1 px-2 rounded-sm cursor-pointer ${selectedTab === "workspace" ? "bg-amber-300" : "bg-gray-500"}`}>
                            WorkSpace
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    <div className="text-xs text-gray-400 mb-2">WORKSPACE</div>
                    <FileTree
                        files={files}
                        setFiles={setFiles}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        setFileContent={setFileContent}
                        openFiles={openFiles}
                        setOpenFiles={setOpenFiles}
                    />
                </div>
            </div>

            <ResizeHandle
                sidebarWidth={sidebarWidth}
                setSidebarWidth={setSidebarWidth}
            />
        </div>
    );
};

export default Sidebar;