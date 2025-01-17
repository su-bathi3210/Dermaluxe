import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Admin from './components/Admin/Admin';
import AdminRoute from './components/Admin/AdminRoute';
import AdminConsultation from './components/Admin/AdminConsultation';
import Consultation from './components/Customer/Consultation';
import Expert from './components/User/Expert';
import Login from './components/Logins/Login';
import { About } from './components/User/About';
import AppOrder from './components/User/AppOrder';
import Contact from './components/User/Contact';
import Footer from './components/User/Footer';
import Home from './components/User/Home';
import Offers from './components/User/Offers';
import { Reward } from './components/User/Reward';
import Shipping from './components/User/Shipping';

function App() {
  const shouldShowFooter = window.location.pathname !== '/login'
    && window.location.pathname !== '/admin'
    && window.location.pathname !== '/adminconsultation';

  return (
    <Router>
      <Routes>
        {/* Customer routes wrapped in Route */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/expert' element={<Expert />} />
        <Route path='/Apporder' element={<AppOrder />} />
        <Route path='/Offers' element={<Offers />} />
        <Route path='/Reward' element={<Reward />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/consultation' element={<Consultation />} />
        <Route path='/login' element={<Login />} />

        {/* Admin routes wrapped in AdminRoute */}
        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<Admin />} />
          <Route path='/adminconsultation' element={<AdminConsultation />} />
        </Route>
      </Routes>

      {shouldShowFooter && <Footer />}
    </Router>
  );
}

export default App;
