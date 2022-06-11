import React from 'react';
import { createRoot } from 'react-dom/client';
import { InverGo } from './InverGo';
import './index.css';

import { LangProvider } from './context/langContext';
import { ThemeProvider } from './context/theme/ThemeContext';
import Background from './context/theme/Background';

createRoot(
  document.getElementById('root')
).render(
  <LangProvider>
    <ThemeProvider>
      <Background >
        <div className='text-indigo-200 dark:text-gray-900'>-</div>
        <div className='app'>
          <InverGo />
        </div>
      </Background>
    </ThemeProvider>
  </LangProvider>
)