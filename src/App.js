import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestGraphPage from './pages/TestGraphPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestGraphPage />} />
        {/* Ajoute d'autres routes ici */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
