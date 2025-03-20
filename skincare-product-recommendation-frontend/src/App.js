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
import Dermaluxe from './components/AI/Dermaluxe';
import { Quiz } from './components/AI/Quiz';
import AdminAI from './components/Admin/AdminAI';
import { Community } from './components/User/Community';
import AdminQuery from './components/Admin/AdminQuery';
import Feedback from "./components/User/Feedback";
import AdminFeedback from "./components/Admin/AdminFeedback";
import Gallery from './components/User/Gallery';
import AdminGallery from './components/Admin/AdminGallery';
import Review from './components/User/Review';
import Blog from './components/User/Blog';
import Service from './components/User/Service';
import Register from './components/Logins/Register';
import Customer from './components/Customer/Customer';
import CustomerStartPage from './components/Customer/CustomerStatPage';


function App() {
  const shouldShowFooter = window.location.pathname !== '/login'
    && window.location.pathname !== '/admin'
    && window.location.pathname !== '/adminAI'
    && window.location.pathname !== '/adminconsultation'
    && window.location.pathname !== '/admindashboard'
    && window.location.pathname !== '/adminquery'
    && window.location.pathname !== '/admingallery'
    && window.location.pathname !== '/register'
    && window.location.pathname !== '/adminfeedback';

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
        <Route path='/skin-dermaluxe' element={<Dermaluxe />} />
        <Route path='/skin' element={<Quiz />} />
        <Route path='/community' element={<Community />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/review' element={<Review />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/skincare-services' element={<Service />} />
        <Route path='/register' element={<Register />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/CustomerDashboard' element={<CustomerStartPage />} />


        {/* Admin routes wrapped in AdminRoute */}
        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<Admin />} />
          <Route path='/adminconsultation' element={<AdminConsultation />} />
          <Route path='/adminAI' element={<AdminAI />} />
          <Route path='/adminquery' element={<AdminQuery />} />
          <Route path='/adminfeedback' element={<AdminFeedback />} />
          <Route path='/admingallery' element={<AdminGallery />} />
        </Route>
      </Routes>

      {shouldShowFooter && <Footer />}
    </Router>
  );
}

export default App;
