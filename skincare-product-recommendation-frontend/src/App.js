import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/User/Home';
import Footer from './components/User/Footer';
import { About } from './components/User/About';
import Contact from './components/User/Contact';
import AppOrder from './components/User/AppOrder';
import Offers from './components/User/Offers';
import { Reward } from './components/User/Reward';
import Shipping from './components/User/Shipping';
import Expert from './components/Customer/Expert';
import Consultation from './components/Customer/Consultation';

function App() {
  const shouldShowFooter = true;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/expert' element={<Expert />} />
        <Route path='/Apporder' element={<AppOrder />} />
        <Route path='/Offers' element={<Offers />} />
        <Route path='/Reward' element={<Reward />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/consultation' element={<Consultation />} />

      </Routes>


      {shouldShowFooter && <Footer />}
    </Router>
  );
}

export default App;
