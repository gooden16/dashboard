import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CanvasDetail from './pages/CanvasDetail';
import { OnboardingProvider } from './context/OnboardingContext';
import { CanvasProvider } from './context/CanvasContext';
import CanvasActivation from './pages/CanvasActivation';

function App() {
  return (
    <BrowserRouter>
      <CanvasProvider>
        <OnboardingProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/canvas/:id" element={<CanvasDetail />} />
            <Route path="/activation/:id" element={<CanvasActivation />} />
          </Routes>
        </OnboardingProvider>
      </CanvasProvider>
    </BrowserRouter>
  );
}

export default App;