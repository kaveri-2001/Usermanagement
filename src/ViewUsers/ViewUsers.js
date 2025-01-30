import { useEffect, useState } from "react";
import './ViewUsers.css';
import EditUser from "../EditUser/EditUser";

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null)  

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const handleDeleteUser = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: "DELETE" })
            .then(() => setUsers(users.filter((user) => user.id !== id)))
            .catch((error) => console.error("Error deleting user:", error));
    };

    const handleEditUser = (id) => {
        setSelectedUserDetails(users.find((user) => user.id === id))
    }

    const handleCloseEdit = () => {
        setSelectedUserDetails(null); // Close the EditUser form
    };

    const handleUpdateUser = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setSelectedUserDetails(null); // Close the EditUser form after saving
    };
    

    return (
        <div className="table-container">
            {selectedUserDetails ? (
                <EditUser onClose={handleCloseEdit} onUpdateUser={handleUpdateUser} selectedUserDetails={selectedUserDetails}/>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                                        {user.website}
                                    </a>
                                </td>
                                <td className="action-buttons">
                                    <button onClick={() => handleDeleteUser(user.id)} className="delete">
                                        Delete
                                    </button>
                                    <button onClick={() => handleEditUser(user.id)} className="edit">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            )}
        </div>
    );
};

export default ViewUsers;