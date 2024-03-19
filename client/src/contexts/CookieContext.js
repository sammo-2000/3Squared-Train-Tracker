import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const themeFromCookie = Cookies.get('theme');
    setUsername(themeFromCookie);
  }, []);

  return (
    <CookieContext.Provider value={{ theme }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => useContext(CookieContext);