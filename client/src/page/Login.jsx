import Navbar from "../components/Navbar"
import svg from "../assets/register.svg"; // Adjust the path according to your project structure
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

import { toast } from "react-toastify";


const Login = () => {
    let [user, setUser] = useState({
        email: "",
        password: "",
    })
    const handleInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUser({
            ...user,
            [name]: value
        })
    }

    const { storeTokenInLs } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(user)
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const responseData = await response.json();

            if (response.ok) {


                storeTokenInLs(responseData.token)

                toast.success("You are logged In")

                navigate("/")
                console.log('Success:', responseData);



            } else {


                console.error('Error:', responseData);
                toast.error(responseData.message)


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
                        <h2 className="text-2xl font-bold mb-4">Login Now</h2>
                        <div className="col-12 col-md-8">
                            <form onSubmit={handleSubmit}>

                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input onChange={handleInput} value={user.email} type="email" id="email" name="email" placeholder="Your Email" className="form-control" />
                                </div>



                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input onChange={handleInput} value={user.password} type="password" id="password" name="password" placeholder="Your Password" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-2 rounded-lg">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
