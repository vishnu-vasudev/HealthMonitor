import React from 'react';
import {AuthProvider} from '../ContextProvider/AuthProvider';
import App from '../App';

const AuthPrv = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AuthPrv;
