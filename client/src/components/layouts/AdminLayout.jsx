import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaRegUser, FaPhoneAlt } from "react-icons/fa";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {

  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <h1>Loading.....</h1>
  }


  if (!user.isAdmin) {

    return <Navigate to="/" />

  }


  return (
    <>
      <header className="bg-light border-bottom">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <NavLink className="navbar-brand" to="/admin">
              Admin Panel
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/users">
                    <FaRegUser className="mr-2" />
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/contacts">
                    <FaPhoneAlt className="mr-2" />
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/service">
                    <FaPhoneAlt className="mr-2" />
                    Service                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    <FaPhoneAlt className="mr-2" />
                    Logout                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mt-4">
        <Outlet />
      </div>

    </>
  );
};

export default AdminLayout;
