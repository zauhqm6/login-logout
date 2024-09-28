import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";
import svg from "../assets/register.svg";
import { useAuth } from "../store/auth";

const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const [userDataFetched, setUserDataFetched] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user && !userDataFetched) {
            setContact({
                username: user.username || "",
                email: user.email || "",
                message: "",
            });
            setUserDataFetched(true); // Ensure this only runs once
        }
    }, [user, userDataFetched]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(user)
        try {
            const response = await fetch(`http://localhost:5000/api/form/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            })

            if (response.ok) {
               
                const responseData = await response.json();
                console.log('Success:', responseData);
                setContact({
                    username: "",
                    email: "",
                    message: "",

                })

            } else {
          
                const errorData = await response.json();
                console.error('Error:', errorData);

            }


        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <Navbar />
            <div className="container-fluid bg-background">
                <div className="row justify-content-center align-items-center p-4">
                    <div className="col-12 col-md-6 mb-4 mb-md-0">
                        <img alt="registration-svg" src={svg} className="img-fluid" />
                    </div>
                    <div className="col-12 col-md-6 bg-card text-card-foreground p-4 p-md-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
                        <div className="col-12 col-md-8">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input onChange={handleInput} type="text" id="username" name="username" placeholder="Your Name" className="form-control" value={contact.username} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input onChange={handleInput} value={contact.email} type="email" id="email" name="email" placeholder="Your Email" className="form-control" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label">
                                        Enter Your Message
                                    </label>
                                    <textarea onChange={handleInput} value={contact.message} id="message" name="message" placeholder="Your message" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-2 rounded-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
