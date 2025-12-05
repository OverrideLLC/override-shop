import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './shared/context/CartContext';
import { ThemeProvider, useTheme } from './shared/context/ThemeContext';
import { DarkCollection } from './collections/dark';
import { LightCollection } from './collections/light';
import { useEffect } from 'react';

const ThemeRouteHandler = ({ children, mode }: { children: React.ReactNode, mode: 'light' | 'dark' }) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(mode);
  }, [mode, setTheme]);

  return <>{children}</>;
};

function App() {
  return (
    <CartProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/light" replace />} />

          {/* Light Collection Routes */}
          <Route path="/light/*" element={
            <ThemeRouteHandler mode="light">
              <LightCollection />
            </ThemeRouteHandler>
          } />

          {/* Dark Collection Routes */}
          <Route path="/dark/*" element={
            <ThemeRouteHandler mode="dark">
              <DarkCollection />
            </ThemeRouteHandler>
          } />
        </Routes>
      </ThemeProvider>
    </CartProvider>
  );
}

export default App;
