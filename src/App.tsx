import { Outlet, useLocation } from 'react-router-dom';
import { useSmoothScroll } from './app/hooks/useSmoothScroll';
import { Header } from './app/components/layout/Header';
import { Footer } from './app/components/layout/Footer';

function App() {
  useSmoothScroll();
  const location = useLocation();
  const hideLayout = location.pathname === '/admin' || location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Header />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  )
}

export default App

