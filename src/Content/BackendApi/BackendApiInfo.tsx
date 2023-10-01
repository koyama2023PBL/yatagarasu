import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const BackendApiInfo = () => {
  return (
    <SwaggerUI url="/api.yaml" />
  );
};

export default BackendApiInfo;