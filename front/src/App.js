import theme from './theme';
import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Theme from "./components/Theme";
import HomePage from './pages/home';
import MainPage from './pages/main';
import SettingsPage from './pages/settings';
function App () {
  return (
    <Theme theme={theme.light}>
      <Box
        id='app'
        sx={{ bgcolor: 'background.default', }}
      >
        <Routes>
          <Route path="/settings" exact={false} element={<SettingsPage />} />
          <Route path="/func" exact={false} element={<MainPage />} />
          <Route path="/*" exact={false} element={<HomePage />} />
        </Routes>
      </Box>
    </Theme >
  );
}

export default App;
