// resources/js/hooks/useConsole.js
import { useState, useCallback } from 'react';

export const useConsole = () => {
    const [logs, setLogs] = useState([]);

    const addLog = useCallback((log) => {
        setLogs(prevLogs => [...prevLogs, {
            ...log,
            id: Date.now() + Math.random(),
            timestamp: new Date().toISOString()
        }]);
    }, []);

    const clearLogs = useCallback(() => {
        setLogs([]);
    }, []);

    return {
        logs,
        addLog,
        clearLogs
    };
};