// components/FileTreeNode.jsx
import React from 'react';

const FileTreeNode = ({
    name,
    item,
    path,
    selectedFile,
    onFileClick,
    onFolderClick
}) => {
    const isSelected = selectedFile === path.join('/');

    if (item.type === 'folder') {
        return (
            <div className="ml-2">
                <div
                    className="flex items-center space-x-1 hover:bg-gray-700 px-1 py-1 rounded cursor-pointer"
                    onClick={() => onFolderClick(path)}
                >
                    <span className="w-4 text-center">
                        {item.expanded ? '📂' : '📁'}
                    </span>
                    <span className="text-blue-400 text-sm">{name}</span>
                </div>

                {item.expanded && item.children && (
                    <div className="ml-4 border-l border-gray-600 pl-2">
                        {Object.entries(item.children).map(([childName, childItem]) => (
                            <FileTreeNode
                                key={childName}
                                name={childName}
                                item={childItem}
                                path={[...path, childName]}
                                selectedFile={selectedFile}
                                onFileClick={onFileClick}
                                onFolderClick={onFolderClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={`flex items-center space-x-1 px-1 py-1 rounded cursor-pointer ml-2 ${isSelected ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
            onClick={() => onFileClick(path, item.content)}
        >
            <span className="w-4 text-center">📄</span>
            <span className={`text-sm ${isSelected ? 'text-white' : 'text-yellow-400'
                }`}>
                {name}
            </span>
        </div>
    );
};

export default FileTreeNode;