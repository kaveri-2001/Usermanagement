import { useState } from 'react';
import AddUser from './AddUser/AddUser';
import './App.css';
import ViewUsers from './ViewUsers/ViewUsers';


function App() {
  const [view, setView] = useState(null)
  return (
    <div className="user-management">
        <h1>User Management</h1>
        <div className="button-group">
          <button onClick={() => setView("add")}>Add User</button>
          <button onClick={() => setView("list")}>List Users</button>
        </div>
        {view === "add" && <AddUser />}
        {view === "list" && <ViewUsers />}
    </div>
  );
}

export default App;