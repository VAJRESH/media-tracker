import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Loading from './component/Preloader/Loading';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);