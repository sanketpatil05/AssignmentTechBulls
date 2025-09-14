import React, { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';


export default function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(r => r.json())
            .then(setUsers)
            .catch(err => { console.error(err); setUsers([]); });
    }, []);


    return (
        <div className="page">
            <h2>Users</h2>
            <UserTable users={users} />
        </div>
    );
}