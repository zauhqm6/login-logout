import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminContact = () => {
    const [contact, setContacts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const { authToken, API } = useAuth();

    const getAllContacts = async () => {
        try {
            const response = await fetch(`${API}/api/admin/contacts`, {
                method: "GET",
                headers: {
                    Authorization: authToken,
                },
            });
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Data has been fetched, so stop loading
        }
    };

    useEffect(() => {
        getAllContacts();
    }, []);

    const deleteUser = async (id) => {
        try {
            const response = await fetch(
                `${API}/api/admin/contacts/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: authToken,
                    },
                }
            );

            if (response.ok) {
                toast.success("User Deleted Successfully");
                getAllContacts(); // Re-fetch contacts on success
            } else {
                toast.error("Failed to Delete User");
            }
        } catch (error) {
            toast.error(error.message || "Error Deleting User");
        }
    };

    return (
        <>
            <div className="container-fluid bg-background">
                <div className="p-4">
                    <div className="col-12 bg-card text-card-foreground p-4 p-md-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Submitted Information</h2>
                        <div className="row justify-content-between align-items-start g-3">
                            {/* Display skeletons while loading */}
                            {loading
                                ? Array(6) // Render 6 skeletons
                                    .fill()
                                    .map((_, index) => (
                                        <div className="col-12 col-md-6 col-lg-4" key={index}>
                                            <div className="card shadow-sm border-0 rounded-lg h-100">
                                                <div className="card-header bg-primary text-white rounded-top">
                                                    <Skeleton width={150} height={20} />
                                                </div>
                                                <div className="card-body">
                                                    <Skeleton height={20} />
                                                    <Skeleton height={20} />
                                                    <Skeleton height={20} />
                                                </div>
                                                <div className="card-footer text-end bg-light rounded-bottom">
                                                    <Skeleton width={80} height={30} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                : contact.map((curr, index) => (
                                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                                        <div className="card shadow-sm border-0 rounded-lg h-100">
                                            <div className="card-header bg-primary text-white rounded-top">
                                                <h5 className="mb-0">Contact Details</h5>
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-title font-weight-bold">
                                                    Username
                                                </h6>
                                                <p className="card-text text-muted">
                                                    {curr.username}
                                                </p>

                                                <h6 className="card-title font-weight-bold">Email</h6>
                                                <p className="card-text text-muted">{curr.email}</p>

                                                <h6 className="card-title font-weight-bold">
                                                    Message
                                                </h6>
                                                <p className="card-text text-muted">{curr.message}</p>
                                            </div>
                                            <div className="card-footer text-end bg-light rounded-bottom">
                                                <button
                                                    onClick={() => deleteUser(curr._id)}
                                                    className="btn btn-outline-primary btn-sm text-black"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminContact;
