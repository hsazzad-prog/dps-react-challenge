import React from 'react';
import { User } from '../interface/UserInterface';


interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Birthday</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>{user.address.city}</td>
                        <td>{user.birthDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
