// utils/fileTreeUtils.js
export const fileTreeUtils = {
    collapseAllFolders: (fileStructure) => {
        const collapse = (items) => {
            const result = {};
            for (const [key, value] of Object.entries(items)) {
                if (value.type === 'folder') {
                    result[key] = {
                        ...value,
                        expanded: false,
                        children: collapse(value.children)
                    };
                } else {
                    result[key] = value;
                }
            }
            return result;
        };
        return collapse(fileStructure);
    },

    expandPathToFile: (files, setFiles, filePath) => {
        const pathArray = filePath.split('/');

        const expandPath = (items, path, index = 0) => {
            const result = { ...items };

            // Collapse all folders first
            for (const [key, value] of Object.entries(result)) {
                if (value.type === 'folder') {
                    result[key] = {
                        ...value,
                        expanded: false,
                        children: fileTreeUtils.collapseAllFolders(value.children)
                    };
                }
            }

            // Expand the path to our file
            if (index < path.length - 1) {
                const currentKey = path[index];
                if (result[currentKey] && result[currentKey].type === 'folder') {
                    result[currentKey] = {
                        ...result[currentKey],
                        expanded: true,
                        children: expandPath(result[currentKey].children, path, index + 1)
                    };
                }
            }

            return result;
        };

        setFiles(expandPath(files, pathArray));
    },

    toggleFolder: (currentFiles, path, index = 0) => {
        if (index === path.length - 1) {
            const key = path[index];
            if (currentFiles[key] && currentFiles[key].type === 'folder') {
                return {
                    ...currentFiles,
                    [key]: {
                        ...currentFiles[key],
                        expanded: !currentFiles[key].expanded
                    }
                };
            }
            return currentFiles;
        }

        const key = path[index];
        return {
            ...currentFiles,
            [key]: {
                ...currentFiles[key],
                children: fileTreeUtils.toggleFolder(currentFiles[key].children, path, index + 1)
            }
        };
    },

    findFileContent: (items, pathArray, index = 0) => {
        const key = pathArray[index];
        if (index === pathArray.length - 1) {
            return items[key]?.content || '';
        }
        return fileTreeUtils.findFileContent(items[key]?.children || {}, pathArray, index + 1);
    }
};