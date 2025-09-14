import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


const ChartBar = React.memo(function ChartBar({ data }) {
return (
<div className="card">
<h3>Monthly Sales</h3>
<div style={{ width: '100%', height: 300 }}>
<ResponsiveContainer>
<BarChart data={data}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="month" />
<YAxis />
<Tooltip />
<Bar dataKey="sales" />
</BarChart>
</ResponsiveContainer>
</div>
</div>
);
});


export default ChartBar;