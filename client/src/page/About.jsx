import Navbar from "../components/Navbar";
import { useAuth } from "../store/auth";

const About = () => {
    const { user } = useAuth();


    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <>
            <Navbar />
            <h1>About</h1>

            {user ? (
                <h1>Hi {user.username}</h1>

            ) :
            
                (
                    <h1>
                        Welcome to our website
                    </h1>
            )}

        </>
    );
};

export default About;
