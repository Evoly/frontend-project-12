import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Init from './init.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Init />
  </StrictMode>,
);
