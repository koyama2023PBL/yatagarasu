import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
    children?: ReactNode;
};

export const SettingsProvider =  ({children}: Props) => {
    const [settings, setSettings] = useState<any>();
    
    useEffect(() => {
            fetch('/settings.yml')
                .then(response => response.text())
                .then(data => yaml.load(data) as Settings)
                .then(loadedSettings => {
                    if (typeof loadedSettings === 'object' && loadedSettings !== null){
                        setSettings(loadedSettings);
                    }
                })
                .catch(err => {
                    console.log("err:", err);
                });
            // const newSettings: Settings = {
            //     baseURL: 'http://www.example.com',
            //     dbname: 'exampleDB',
            //     nodeExporterJobName: 'node_exporter',
            //     postgresExporterJobName: 'postgres_exporter',
            //     nodeExporterDefaultInterval: '15s',
            //     postgresExporterDefaultInterval: '15s',
            // };
            // setSettings(newSettings);
        }
        // fetch('/settings.yml')
        //     .then(response => response.text())
        //     .then(data => yaml.load(data) as Settings)
        //     .then(loadedSettings => setSettings(loadedSettings));
        //fetchSettings();
    );
    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
};

