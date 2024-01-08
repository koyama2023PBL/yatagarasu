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
    Thresholds: Thresholds;
    statusColors: ColorCodeSet;
}

export interface ColorCodeSet {
    ok: string;
    watch: string;
    alert: string;
}

export interface Thresholds {
    cpu: {
        ok: number;
        watch: number;
    };
    memory_ratio: {
        ok: number;
        watch: number;
    };
    memory: {
        ok: number;
        watch: number;
    };
    disk: {
        ok: number;
        watch: number;
    };
    deadtuple: {
        ok: number;
        watch: number;
    };
    deadtuple_ratio: {
        ok: number;
        watch: number;
    };
    deadlocks: {
        ok: number;
        watch: number;
    };
    querycounts: {
        ok: number;
        watch: number;
    };
    queryruntime: {
        ok: number;
        watch: number;
    };
    avgquerytime_counts: {
        ok: number;
        watch: number;
    };
    slowquery: {
        ok: number;
        watch: number;
    };
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

