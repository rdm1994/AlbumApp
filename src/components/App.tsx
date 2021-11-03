import React, { FunctionComponent } from 'react';
import { Header } from 'components/header';
import { AppProvider } from 'contexts/AppProvider';
import { Home } from './home';

const App: FunctionComponent = () => {
  return (
    <AppProvider>
      <div className="w-screen h-screen">
        <Header />
        <Home />
      </div>
    </AppProvider>
  );
};

export default App;
