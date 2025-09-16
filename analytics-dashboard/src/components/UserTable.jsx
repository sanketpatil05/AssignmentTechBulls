// src/components/UserTable.jsx
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import UserModal from './UserModal';
import { exportToCSV } from '../common/commonFunction';





const UserTable = React.memo(function UserTable({ users }) {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages,settotalPages]=useState(users.length)
    const [selected, setSelected] = useState(null);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    const perPage = 5;

    const updateDisplayed = () => {

        //  console.log("query",query)
        const q = query.toLowerCase().trim();

        // filter users
        const filtered = q
            ? users.filter(
                (u) =>
                    u.name.toLowerCase().includes(q) 
            )
            : users;

                    //  console.log("filtered",filtered)


        // paginate
        const maxpages = Math.max(1, Math.ceil(filtered.length / perPage));
        settotalPages(maxpages)
        const safePage = Math.min(page, maxpages); // keep page in bounds
        const start = (safePage - 1) * perPage;
        const current = filtered.slice(start, start + perPage);

        setDisplayedUsers(current);
    };


    useEffect(() => {
        updateDisplayed();
    }, [query, page, users]);

    const handleNext = () => setPage((p) => p + 1);
    const handlePrev = () => setPage((p) => Math.max(1, p - 1));


    const onExport = useCallback(() => {
        const rows = users.map((u) => ({
            name: u.name,
            email: u.email,
            company: u.company?.name || "",
        }));

        console.log("rows",rows)
        exportToCSV(rows,"users.csv");
    }, [users]);





    return (
        <div className="card">
            <div className="table-controls">
                <input placeholder="Search users..." value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} />
                <div>
                    <button className="btn" onClick={onExport}>Export CSV</button>
                </div>
            </div>
            <table className="user-table">
                <thead>
                    <tr><th>Name</th><th>Email</th><th>Company</th></tr>
                </thead>
                <tbody>
                    {displayedUsers.map((u) => (
                        <tr
                            key={u.id}
                            className="clickable"
                            onClick={() => setSelected(u)}
                        >
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.company?.name}</td>
                        </tr>
                    ))}
                    {displayedUsers.length === 0 && (
                        <tr>
                            <td colSpan="3">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button className="btn btn-ghost"  onClick={handlePrev} disabled={page === 1}>Prev</button>
                <span>Page {page} / {totalPages}</span>
                <button className="btn btn-ghost"  onClick={handleNext} disabled={page === totalPages}>Next</button>
            </div>
            <UserModal user={selected} onClose={() => setSelected(null)} />
        </div>
    );
});


export default UserTable;