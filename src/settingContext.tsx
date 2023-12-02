import React, { createContext, useContext, useState, useEffect } from 'react';
import yaml from 'js-yaml';

const SettingsContext = createContext({});

interface Settings {
    baseURL: string;
    dbname: string;
    nodeExporterJobName: string;
    postgresExporterJobName: string;
    nodeExporterDefaultInterval: string;
    postgresExporterDefaultInterval: string;
    }


export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({});


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

export const useSettings = () => useContext(SettingsContext);