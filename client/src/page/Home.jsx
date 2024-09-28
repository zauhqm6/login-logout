import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../store/auth";

const Home = () => {

  const [username, setUsername] = useState('')


  const { user } = useAuth()


  useEffect(() => {

    if (user && user.username) {
      setUsername(user.username)
    }

  }, [user, username])
  return (
    <>
      <Navbar />

      <div>
        <h1>
          hi {username}
       </h1>
    </div>
    </>
  );
};

export default Home;
