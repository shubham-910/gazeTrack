import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const GraphComp = ({ data }) => {
    // Prepare the data for Recharts
    const chartData = [
        { name: 'Gaze on left side', value: data.left_count },
        { name: 'Gaze on right side', value: data.right_count }
    ];

    // Define colors for the chart sections
    const COLORS = ['#0088FE', '#00C49F'];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    isAnimationActive={true}
                    outerRadius={100}
                    fill="#8884d8"
                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default GraphComp;
