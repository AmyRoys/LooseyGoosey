import "../styles/CMS.css";
import plant8 from "../assets/plant8.png";
import plant9 from "../assets/plant9.png";
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  permissions: string[];
  roles: string[];
}

const initialUsers: User[] = [
  { id: 1, name: "User 1", permissions: [], roles: [] },
  { id: 2, name: "User 2", permissions: [], roles: [] },
];

const initialEvents = [
  { id: 1, name: "Product Exhibition", date: "2021-01-01" },
  { id: 2, name: "Startup Showcase Talk", date: "2021-01-02" },
  { id: 3, name: "Sales Pitch", date: "2021-01-03" },
];

const CMS: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [content, setContent] = useState("");
  const [dropdown, setDropdown] = useState("1");
  const [events, setEvents] = useState(initialEvents);

  const handleEventChange = (id:number, field:string, value:string) => {
    setEvents((events) =>
      events.map((event) =>
        event.id === id
          ? {
              ...event,
              [field]: value,
            }
          : event
      )
    );
  };

  const handlePermissionChange = (userId: number, permission: string) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              permissions: user.permissions.includes(permission)
                ? user.permissions.filter((p) => p !== permission)
                : [...user.permissions, permission],
            }
          : user
      )
    );
  };
  const handleRoleChange = (userId: number, role: string) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              roles: user.roles.includes(role)
                ? user.roles.filter((r) => r !== role)
                : [...user.roles, role],
            }
          : user
      )
    );
  };

  const handleSubmit = () => {
    alert("Update Successful!");
  };

  const handleContentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you can handle the submission of the content
    console.log(content);
    setContent(""); // Clear the input
  };

  return (
    <div className="a-container">
      <div className="a-box">
        <div className="a-input">
          <h1 className="text-admin">CMS</h1>
          <h2>Manage Users</h2>
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Permissions</th>
                <th>Roles</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        checked={user.permissions.includes("permission1")}
                        onChange={() =>
                          handlePermissionChange(user.id, "permission1")
                        }
                      />
                      Permission 1
                    </label>
                  </td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        checked={user.roles.includes("role1")}
                        onChange={() => handleRoleChange(user.id, "role1")}
                      />
                      Role 1
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div>
          <h2>Update Site Content</h2>
          <form className="form-container" onSubmit={handleContentSubmit}>
            <textarea
              className="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content here..."
            />
            <div>
              <select
                className="drop-down"
                value={dropdown.toString()}
                onChange={(e) => setDropdown(e.target.value)}
              >
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </div>
            <div>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </form>
          <div>
            <h2>Events Calendar</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event ID</th>
                  <th>Event Name</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <input
                        type="date"
                        value={event.date}
                        onChange={(e) =>
                          handleEventChange(event.id, "date", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={event.id}
                        onChange={(e) =>
                          handleEventChange(
                            event.id,
                            "location",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={event.name}
                        onChange={(e) =>
                          handleEventChange(
                            event.id,
                            "eventName",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
      <div>
        <img src={plant8} alt="plant2" className="plant2" />
      </div>
      <div>
        <img src={plant9} alt="plant3" className="plant3" />
      </div>
    </div>
  );
};

export default CMS;
