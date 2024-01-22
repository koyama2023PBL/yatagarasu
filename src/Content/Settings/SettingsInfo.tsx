import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Box, Card, CardContent, Typography} from "@mui/material";

const SettingsInfo: React.FC = () => {
  const [settingsContent, setSettingsContent] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // settings.yml ファイルの内容を取得
        const response = await axios.get('/settings.yml', {
          headers: { 'Content-Type': 'text/yaml' },
        });
        // 取得した内容をそのまま状態に保存
        setSettingsContent(response.data);
      } catch (error) {
        console.error('YAML ファイルの読み込み中にエラーが発生しました', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' , marginTop: '-5px'}}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            設定情報（設定ファイルsettings.ymlの内容）
          </Typography>
          <pre>{settingsContent}</pre>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SettingsInfo;
