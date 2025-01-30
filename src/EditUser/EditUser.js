import { useState } from "react";
import './EditUser.css';

function EditUser ({ onClose, onUpdateUser, selectedUserDetails }) {
    const [user, setUser] = useState(selectedUserDetails);
    const [errors, setErrors] = useState({}); // State to track errors

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation for email
        if (name === "email") {
            const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (value.match(validEmailRegex)) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "Email is Invalid" }));
            }
        }

        // Validation for phone number
        if (name === "phone") {
            const validPhoneRegex = /^\d{3}-\d{3}-\d{4}$/; // Format: xxx-xxx-xxxx
            if (value.match(validPhoneRegex)) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "Phone number is invalid. Use format xxx-xxx-xxxx" }));
            }
        }

        // Validation for name (should not contain digits or special characters)
        if (name === "name") {
            // Check if the name is empty or null
            if (!value.trim()) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "Name is required" }));
            } else {
                const validNameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
                if (value.match(validNameRegex)) {
                    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, [name]: "Name should only contain letters and spaces" }));
                }
            }
        }

        setUser({ ...user, [name]: value });
    };

    const handleSave = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((updatedUser) => {
                onUpdateUser(updatedUser); // Update the user in ViewUsers.js
                setUser(null)
                onClose(); // Close the edit form
            })
            .catch((error) => console.error("Error saving user:", error));
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-user-form">
            <h2>Edit User</h2>
            <form>
                <label>
                    Name:
                    <input
                        name="name"
                        type="text"
                        value={user.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>} {/* Show error below input */}
                </label>
                <label>
                    Email:
                    <input
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>} {/* Show error below input */}
                </label>
                <label>
                    Phone:
                    <input
                        name="phone"
                        type="text"
                        value={user.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>} {/* Show error below input */}
                </label>

                <div className="button-container">
                    <button type="button" className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="button" className="save-button" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;