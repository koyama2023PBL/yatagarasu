import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from './ApiService';

const DataDisplayComponent: React.FC = () => {
    type DataType = { [key: string]: any }; // APIからのレスポンスに合わせて型を定義します
    const [data, setData] = useState<DataType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchFromAPI('http://localhost:7777/database-explorer/api/visualization/processes?starttime=20230507180000&endtime=20230517200000');
            console.log(result);
            //setData();
        };
        fetchData();
    }, []);

    return (
        <div>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default DataDisplayComponent;
