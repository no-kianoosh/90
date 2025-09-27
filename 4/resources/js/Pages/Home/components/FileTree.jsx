// components/FileTree.jsx
import React from 'react';
import FileTreeNode from './FileTreeNode';
import { fileTreeUtils } from '../utils/fileTreeUtils';

const FileTree = ({
    files,
    setFiles,
    selectedFile,
    setSelectedFile,
    setFileContent,
    openFiles,
    setOpenFiles
}) => {
    const { expandPathToFile } = fileTreeUtils;

    const handleFileClick = (filePath, content) => {
        const fullPath = filePath.join('/');
        const fileName = filePath[filePath.length - 1];

        setSelectedFile(fullPath);
        setFileContent(content);
        expandPathToFile(files, setFiles, fullPath);

        if (!openFiles.some(f => f.path === fullPath)) {
            setOpenFiles([...openFiles, { name: fileName, path: fullPath }]);
        }
    };

    const handleFolderClick = (path) => {
        const updatedFiles = fileTreeUtils.toggleFolder(files, path);
        setFiles(updatedFiles);
    };

    return (
        <div className="space-y-0">
            {Object.entries(files).map(([name, item]) => (
                <FileTreeNode
                    key={name}
                    name={name}
                    item={item}
                    path={[name]}
                    selectedFile={selectedFile}
                    onFileClick={handleFileClick}
                    onFolderClick={handleFolderClick}
                />
            ))}
        </div>
    );
};

export default FileTree;