import './App.scss';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer name="Ishan" />
    </Router>
  );
}

export default App;
