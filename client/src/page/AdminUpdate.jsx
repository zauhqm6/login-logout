import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";



const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: ""
    })

    const params = useParams()

    const { authToken } = useAuth()

    // eslint-disable-next-line no-unused-vars
    const getSingleUserData = async (id) => {

        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authToken
                }
            });

            if (response.ok) {

                const userData = await response.json();
                console.log(userData.data[0])
                setData(userData.data[0]); // Set the fetched data
            }
        } catch (error) {
            console.log(error)
        }


    };


    useEffect(() => {
        getSingleUserData()
    }, [])

    const handleInput = (e) => {
        let name = e.target.name
        let value = e.target.value


        setData({
            ...data,
            [name]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:5000/api/admin//users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authToken
                },
                body: JSON.stringify(data)

            });
            if (response.ok) {

                toast.success("User updated successfully")
            }
            else {
                toast.error("Not Updated")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="container-fluid bg-background">
                <div className="row justify-content-center align-items-center p-4">

                    <div className="col-12 bg-card text-card-foreground p-4 p-md-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Update Data</h2>
                        <div className="col-12 col-md-8">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input onChange={handleInput} type="text" id="username" name="username" placeholder="Your Name" className="form-control" value={data.username} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input onChange={handleInput} value={data.email} type="email" id="email" name="email" placeholder="Your Email" className="form-control" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="form-label">
                                        phone
                                    </label>
                                    <input onChange={handleInput} value={data.phone} type="phone" id="phone" name="phone" placeholder="Your phone" className="form-control" />
                                </div>

                                <button type="submit" className="btn btn-primary w-50 py-2 rounded-lg">
                                    Update Data
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminUpdate