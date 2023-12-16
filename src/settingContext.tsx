import React, { createContext, useContext, useState, useEffect } from 'react';
import yaml from 'js-yaml';

const SettingsContext = createContext<Settings | undefined>(undefined);

interface Settings {
    baseURL: string;
    dbname: string;
    nodeExporterJobName: string;
    postgresExporterJobName: string;
    nodeExporterDefaultInterval: string;
    postgresExporterDefaultInterval: string;
}

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if(!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

type Props = {
    children?: React.ReactNode;
};

export const SettingsProvider = React.FC = ({ children }) => {
    const [settings, setSettings] = useState<Settings>();

    useEffect(() => {
        fetch('/settings.yml')
            .then(response => response.text())
            .then(data => yaml.load(data) as Settings)
            .then(loadedSettings => setSettings(loadedSettings));
    }, []);
    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
};

