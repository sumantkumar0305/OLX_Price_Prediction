import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
const PhonePrediction = lazy(() =>
  import('./features/phone_price_prediction/PhonePredictionPage.jsx')
);
const LaptopPrediction = lazy(() =>
  import('./features/laptop_price_prediction/LaptopPredictionPage.jsx')
);
const About = lazy(() => import('./pages/About.jsx'));

// To add another working category page later (e.g. Smartwatch):
//   1. Create src/pages/<Category>Prediction.jsx (mirroring LaptopPrediction.jsx).
//   2. Add a <Route path="/predict/<category>" element={...} /> below.
//   3. Add a link for it in the navLinks of src/components/Navbar.jsx.
const App = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Suspense
          fallback={
            <Box
              role="status"
              sx={{ minHeight: '50vh', display: 'grid', placeItems: 'center' }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict/phone" element={<PhonePrediction />} />
            <Route path="/predict/laptop" element={<LaptopPrediction />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
