import Home from './component/Home';
import Footer from './component/layout/Footer';
import Header from './component/layout/Header';
import {BrowserRouter as Router,Route, Routes, Switch} from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
    <Header />
      <Routes>     
      <Route path='/' element={<Home />} exact />
      </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default App;
