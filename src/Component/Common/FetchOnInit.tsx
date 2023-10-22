import React, { useEffect, useState } from 'react';

type FetchTask = () => Promise<void>;

interface Props {
  tasks: FetchTask[];
  children: React.ReactNode;
}

export const FetchOnInit: React.FC<Props> = ({ tasks, children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // すべての非同期処理を実行
    Promise.all(tasks.map(task => task()))
        .then(() => {
          setLoaded(true);
        });
  }, [tasks]);

  if (!loaded) {
    return null;
  }

  return <>{children}</>;
};
