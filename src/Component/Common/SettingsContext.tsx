import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';

// コンテキストの作成
const SettingsContext = createContext(null);

// @ts-ignore
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await axios.get('/settings.yml');
        const settingsData = yaml.load(res.data);
        // @ts-ignore
        setSettings(settingsData);
      } catch (error) {
        console.error('設定ファイルの読み込みに失敗しました:', error);
      }
    };

    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

// コンテキストを使用するためのカスタムフック
export const useSettings = () => useContext(SettingsContext);

export default SettingsContext;
