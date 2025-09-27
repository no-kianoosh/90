// components/EditorTabs.jsx
import React from 'react';
import { fileTreeUtils } from '../utils/fileTreeUtils';

const EditorTabs = ({
    openFiles,
    setOpenFiles,
    selectedFile,
    setSelectedFile,
    setFileContent,
    files
}) => {
    const { expandPathToFile, findFileContent } = fileTreeUtils;

    const handleTabClick = (file) => {
        const content = findFileContent(files, file.path.split('/'));
        setSelectedFile(file.path);
        setFileContent(content);
        expandPathToFile(files, () => { }, file.path);
    };

    const closeFile = (filePath, e) => {
        e.stopPropagation();
        const newOpenFiles = openFiles.filter(file => file.path !== filePath);
        setOpenFiles(newOpenFiles);

        if (selectedFile === filePath) {
            if (newOpenFiles.length > 0) {
                handleTabClick(newOpenFiles[newOpenFiles.length - 1]);
            } else {
                setSelectedFile(null);
                setFileContent('');
            }
        }
    };

    return (
        <div className="bg-gray-800 border-b border-gray-700">
            <div className="flex">
                {openFiles.map(file => (
                    <button
                        key={file.path}
                        onClick={() => handleTabClick(file)}
                        className={`flex items-center space-x-2 px-4 py-2 border-r border-gray-700 ${selectedFile === file.path ? 'bg-gray-900' : 'bg-gray-800'
                            }`}
                    >
                        <span>📄</span>
                        <span className="text-sm">{file.name}</span>
                        <button
                            onClick={(e) => closeFile(file.path, e)}
                            className="hover:bg-gray-700 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                        >
                            ×
                        </button>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EditorTabs;