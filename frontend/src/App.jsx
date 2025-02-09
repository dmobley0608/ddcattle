import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './components/Layout';
import Horses from './pages/horses/Horses';
import Cattle from './pages/Cattle';
import About from './pages/About';
import FunTools from './pages/FunTools';
import Home from './pages/Home';
import HorseDetails from './pages/horses/HorseDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/horses" element={<Horses />} />
            <Route path="/horses/:name" element={<HorseDetails />} />
            <Route path="/cattle" element={<Cattle />} />
            <Route path="/about" element={<About />} />
            <Route path="/fun-tools" element={<FunTools />} />
          </Routes>
        </Container>
      </Layout>
    </Router>
  );
}

export default App;
