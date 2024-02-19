import '../styles/Admin.css';
import plant8 from '../assets/plant8.png';
import plant9 from '../assets/plant9.png';

import React, { useState } from 'react';

interface User {
    id: number;
    name: string;
    permissions: string[];
    roles: string[];
}

const initialUsers: User[] = [
    { id: 1, name: 'User 1', permissions: [], roles: [] },
    { id: 2, name: 'User 2', permissions: [], roles: [] },

];

const Admin: React.FC = () => {
    const [users, setUsers] = useState(initialUsers);


    const handlePermissionChange = (userId: number, permission: string) => {
        setUsers(users => users.map(user => user.id === userId ? {
            ...user,
            permissions: user.permissions.includes(permission)
                ? user.permissions.filter(p => p !== permission)
                : [...user.permissions, permission]
        } : user));
    };
    const handleRoleChange = (userId: number, role: string) => {
        setUsers(users => users.map(user => user.id === userId ? {
            ...user,
            roles: user.roles.includes(role)
                ? user.roles.filter(r => r !== role)
                : [...user.roles, role]
        } : user));
    };

    const handleSubmit = () => {
        alert('Permissions and Roles updated');
      };

    return (
        <div className='a-container'>
            <div className='login-box'>
                <div className='a-input'>
                    <h1 className='text-admin'>Admin Page</h1>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Permissions</th>
                                <th>Roles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={user.permissions.includes('permission1')}
                                                onChange={() => handlePermissionChange(user.id, 'permission1')}
                                            />
                                            Permission 1
                                        </label>
                                    </td>
                                    <td>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={user.roles.includes('role1')}
                                                onChange={() => handleRoleChange(user.id, 'role1')}
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
            </div>
            <div>
            <img src={plant8} alt='plant2' className='plant2'/>
            </div>
            <div>
            <img src={plant9} alt='plant3' className='plant3'/>
            </div>
        </div>
    );
}

export default Admin;