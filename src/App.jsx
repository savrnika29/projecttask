
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers,addUser,updateUser,deleteUser} from "./features/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.users);

  const [form, setForm] = useState({ id: "", name: "", email: "" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateUser(form));
      setEditMode(false);
    } else {
      dispatch(addUser({ ...form }));
    }

    setForm({ id: "", name: "", email: "" });
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setForm(user);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD with API + Axios + Redux Toolkit</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <button onClick={handleSubmit}>
        {editMode ? "Update User" : "Add User"}
      </button>

      <hr />

   {loading ? (
  <h3>Loading...</h3>
) : (
  <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ background: "#f0f0f0" }}>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {list.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          
          <td>
            <button 
              onClick={() => handleEdit(user)} 
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            <button 
              onClick={() => dispatch(deleteUser(user.id))}
              style={{ background: "red", color: "white" }}
            >
              Delete
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

export default App;
