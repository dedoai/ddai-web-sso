import { useEffect } from 'react';

import AuthModal from '@/components/AuthModal';

const THEME_MAPPER = {
  d: 'dark',
  l: 'light',
};

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const theme = urlParams.get('t');

    document.body.classList.add(THEME_MAPPER[theme] || 'light');
  }, []);

  return <AuthModal isOpen />;
};

export default App;
