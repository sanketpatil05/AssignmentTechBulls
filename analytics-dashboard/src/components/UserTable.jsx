// src/components/UserTable.jsx
import React, { useState, useMemo, useCallback } from 'react';
import UserModal from './UserModal';


function exportToCSV(rows, filename = 'export.csv') {
if (!rows || !rows.length) return;
const keys = Object.keys(rows[0]);
const csv = [keys.join(',')]
.concat(rows.map(r => keys.map(k => `"${(r[k] ?? '').toString().replace(/"/g, '""')}"`).join(',')))
.join('\n');
const blob = new Blob([csv], { type: 'text/csv' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = filename;
a.click();
URL.revokeObjectURL(url);
}


const UserTable = React.memo(function UserTable({ users }) {
const [query, setQuery] = useState('');
const [page, setPage] = useState(1);
const [selected, setSelected] = useState(null);
const perPage = 5;


const filtered = useMemo(() => {
const q = query.toLowerCase().trim();
if (!q) return users;
return users.filter(u => (
u.name.toLowerCase().includes(q) ||
u.email.toLowerCase().includes(q) ||
u.company?.name.toLowerCase().includes(q)
));
}, [users, query]);


const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
const current = useMemo(() => filtered.slice((page-1)*perPage, page*perPage), [filtered, page]);


const goto = useCallback((p) => setPage(p), []);
const onExport = useCallback(() => {
const rows = filtered.map(u => ({ name: u.name, email: u.email, company: u.company?.name || '' }));
exportToCSV(rows, 'users.csv');
}, [filtered]);


return (
<div className="card">
<div className="table-controls">
<input placeholder="Search users..." value={query} onChange={e=>{setQuery(e.target.value); setPage(1);}} />
<div>
<button className="btn" onClick={onExport}>Export CSV</button>
</div>
</div>
<table className="user-table">
<thead>
<tr><th>Name</th><th>Email</th><th>Company</th></tr>
</thead>
<tbody>
{current.map(u => (
<tr key={u.id} onClick={()=>setSelected(u)} className="clickable">
<td>{u.name}</td>
<td>{u.email}</td>
<td>{u.company?.name}</td>
</tr>
))}
</tbody>
</table>
<div className="pagination">
<button className="btn btn-ghost" onClick={()=>goto(Math.max(1, page-1))} disabled={page===1}>Prev</button>
<span>Page {page} / {totalPages}</span>
<button className="btn btn-ghost" onClick={()=>goto(Math.min(totalPages, page+1))} disabled={page===totalPages}>Next</button>
</div>
<UserModal user={selected} onClose={()=>setSelected(null)} />
</div>
);
});


export default UserTable;