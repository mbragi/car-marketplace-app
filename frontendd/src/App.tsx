import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
// import ListCarPage from './pages/ListCarPage'; 
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketplace" element={<Home />} />
        {/* <Route path="/list" element={<ListCarPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
