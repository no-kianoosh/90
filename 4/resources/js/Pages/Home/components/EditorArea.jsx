// components/EditorArea.jsx
import React from 'react';
import EditorTabs from './EditorTabs';
import CodeEditor from './CodeEditor';
import StatusBar from './StatusBar';

const EditorArea = ({
    selectedFile,
    fileContent,
    setFileContent,
    openFiles,
    setOpenFiles,
    setSelectedFile,
    setFileContent: setGlobalFileContent,
    files,
    sidebarWidth
}) => {
    return (
        <div
            className="flex-1 flex flex-col"
            style={{ width: `calc(100% - ${sidebarWidth}px)` }}
        >
            <EditorTabs
                openFiles={openFiles}
                setOpenFiles={setOpenFiles}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setFileContent={setGlobalFileContent}
                files={files}
            />

            <CodeEditor
                selectedFile={selectedFile}
                fileContent={fileContent}
                setFileContent={setFileContent}
            />

            <StatusBar />
        </div>
    );
};

export default EditorArea;