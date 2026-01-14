import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestGraphPage from './pages/TestGraphPage.jsx';

function App() {
  return (
    <>
      <h1 style={{ color: 'blue', fontFamily: 'Menlo', margin: 24 }}>App is rendering!</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestGraphPage />} />
          {/* Ajoute d'autres routes ici */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
