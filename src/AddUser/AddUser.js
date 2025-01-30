import { useState, useCallback } from 'react';
import './AddUser.css';

function AddUser() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });

  // Memoized handler to avoid unnecessary re-renders
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    setErrors((prevErrors) => {
      let errorMessage = "";

      if ((name === "firstName" || name === "lastName") && !/^[A-Za-z\s]+$/.test(value)) {
        errorMessage = "Name is Invalid";
      } else if (name === "email") {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+.com/;
        if (!validRegex.test(value)) {
          errorMessage = "Email is Invalid";
        }
      }

      return { ...prevErrors, [name]: errorMessage };
    });
  }, []);

  const handleAddUser = useCallback(() => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => setUsers((prevUsers) => [...prevUsers, ...users, { ...form }]))
      .then(() => alert("success"))
      .catch((error) => console.error("Error adding user:", error));

    // Clear form after submission
    setForm({ firstName: "", lastName: "", email: "", department: "" });
  }, [form, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddUser();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={form.firstName}
          required
        />
        {errors.firstName && <span className="error-msg">{errors.firstName}</span>}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={form.lastName}
          required
        />
        {errors.lastName && <span className="error-msg">{errors.lastName}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}

        <input
          type="text"
          name="department"
          placeholder="Department"
          onChange={handleChange}
          value={form.department}
          required
        />

        <button type="submit" disabled={Object.values(errors).some((err) => err)}>
          Add User
        </button>
      </form>
    </>
  );
}

export default AddUser;