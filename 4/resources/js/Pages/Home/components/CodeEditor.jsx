// components/CodeEditor.jsx
import React from 'react';

const CodeEditor = ({ selectedFile, fileContent, setFileContent }) => {
    if (!selectedFile) {
        return (
            <div className="flex-1 bg-gray-900 flex items-center justify-center text-gray-500">
                Select a file to start editing
            </div>
        );
    }

    return (
        <div className="flex-1 bg-gray-900 p-4">
            <div className="h-full flex flex-col">
                <div className="mb-2 text-sm text-gray-400">
                    {selectedFile}
                </div>
                <textarea
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    className="flex-1 w-full bg-gray-800 text-green-400 font-mono text-sm p-4 rounded border border-gray-700 resize-none"
                    spellCheck="false"
                />
            </div>
        </div>
    );
};

export default CodeEditor;