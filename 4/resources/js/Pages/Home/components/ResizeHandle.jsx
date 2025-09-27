// components/ResizeHandle.jsx
import React, { useState, useCallback, useEffect } from 'react';

const ResizeHandle = ({ sidebarWidth, setSidebarWidth }) => {
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = useCallback((e) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((e) => {
        if (isResizing) {
            const newWidth = e.clientX;
            if (newWidth > 200 && newWidth < 600) {
                setSidebarWidth(newWidth);
            }
        }
    }, [isResizing, setSidebarWidth]);

    useEffect(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);

        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <>
            <div
                className="w-2 bg-gray-600 hover:bg-blue-500 cursor-col-resize relative group"
                onMouseDown={startResizing}
            >
                <div className="absolute inset-y-0 left-0.5 w-0.5 bg-gray-400 group-hover:bg-blue-400"></div>
            </div>

            {isResizing && (
                <div className="fixed inset-0 z-50 cursor-col-resize" style={{ cursor: 'col-resize' }}></div>
            )}
        </>
    );
};

export default ResizeHandle;