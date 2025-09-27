// components/StatusBar.jsx
import React from 'react';

const StatusBar = () => {
    return (
        <div className="bg-blue-600 px-4 py-1 text-sm flex justify-between">
            <span>Line: 1, Column: 1</span>
            <span>UTF-8</span>
            <span>JavaScript React</span>
        </div>
    );
};

export default StatusBar;