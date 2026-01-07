import { Outlet } from 'react-router-dom';
import { useSmoothScroll } from './app/hooks/useSmoothScroll';

function App() {
  useSmoothScroll();

  return (
    <Outlet />
  )
}

export default App
