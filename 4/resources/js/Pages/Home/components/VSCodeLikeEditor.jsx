// components/VSCodeLikeEditor.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import EditorArea from './EditorArea';
import { initialFiles } from '../data/fileStructure';

const VSCodeLikeEditor = () => {
    const [files, setFiles] = useState(initialFiles);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [openFiles, setOpenFiles] = useState([]);
    const [sidebarWidth, setSidebarWidth] = useState(240);
    const [selectedTab, setSelectedTab] = useState("contents");

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                files={files}
                setFiles={setFiles}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setFileContent={setFileContent}
                openFiles={openFiles}
                setOpenFiles={setOpenFiles}
                sidebarWidth={sidebarWidth}
                setSidebarWidth={setSidebarWidth}
            />

            <EditorArea
                selectedFile={selectedFile}
                fileContent={fileContent}
                setFileContent={setFileContent}
                openFiles={openFiles}
                setOpenFiles={setOpenFiles}
                setSelectedFile={setSelectedFile}
                files={files}
                sidebarWidth={sidebarWidth}
            />
        </div>
    );
};

export default VSCodeLikeEditor;