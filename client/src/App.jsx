import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import Register from "./page/Register";
import Login from "./page/Login";
import Logout from "./page/Logout";
import Service from "./page/Service";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminUsers from "./page/AdminUsers";
import AdminContact from "./page/AdminContact";
import AminService from "./page/AminService";
import AdminUpdate from "./page/AdminUpdate";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<AdminLayout />} >
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContact />} />
            <Route path="service" element={<AminService />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
