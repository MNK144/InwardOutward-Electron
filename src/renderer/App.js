import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import InwardPrint from "./components/Sections/CustomerInward/InwardPrint";
import OutwardPrint from "./components/Sections/CustomerOutward/OutwardPrint";
import PaymentPrint from "./components/Sections/PaymentRegister/PaymentPrint";
import AppMain from "./AppMain";

export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/CustomerInward/Print" element={<InwardPrint/>} />
      <Route path="/CustomerOutward/Print" element={<OutwardPrint/>} />
      <Route path="/PaymentRegister/Print" element={<PaymentPrint/>} />
      <Route path="*" element={<AppMain/>}/>
    </Routes>
    </Router>
  );
}

