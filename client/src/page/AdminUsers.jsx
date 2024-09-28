import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import './table.css'
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const AdminUsers = () => {


  const [users, setUsers] = useState([])
  const { authToken } = useAuth()
  // toast.success('authToken:', authToken)
  // console.log(authToken:', authToken); // Add this to check if authToken is set


  const getAllUsersData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        method: "GET",
        headers: {
          Authorization: authToken
        }
      })

      const data = await response.json()
      // console.log(`User data ${data}`)
      setUsers(data)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllUsersData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const deleteUser = async (id) => {
    toast.promise(
      // eslint-disable-next-line no-async-promise-executor
      new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: authToken
            }
          });

          if (response.ok) {
            resolve("User Deleted Successfully");
            getAllUsersData(); // Re-fetch users on success
          } else {
            reject("Failed to Delete User");
          }
        } catch (error) {
          reject(error.message || "Error Deleting User");
        }
      }),
      {
        pending: "Deleting user...", // Loading message
        success: "User deleted successfully!", // Success message
        error: "Error deleting user" // Error message
      }
    );
  };




  return (
    <>


      <div className="container">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8"><h2>USer <b>Details</b></h2></div>

              </div>
            </div>
            <table className="table custom-table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((curr, index) => {
                  return (
                    <tr key={index}>
                      <td>{curr.username}</td>
                      <td>{curr.email}</td>
                      <td>{curr.phone}</td>
                      <td>
                        < Link className="btn btn-edit" to={`/admin/users/${curr._id}/edit`}>
                          <FaRegEdit />
                          Edit
                        </ Link>
                      </td>
                      <td>
                        <button className="btn btn-delete" title="Delete" onClick={() => deleteUser(curr._id)}>
                          <MdDeleteOutline />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>
        </div>
      </div>


    </>
  )
}

export default AdminUsers
