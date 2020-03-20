import React from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis
} from 'recharts';
import { DailyChange } from '../services/dataService';

type Props = {
    data: DailyChange[];
};

export function Chart({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="date" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                    type="monotone"
                    dataKey="confirmed"
                    stroke="#ff7300"
                    yAxisId={0}
                />
                <Line
                    type="monotone"
                    dataKey="recovered"
                    stroke="#387908"
                    yAxisId={0}
                />
                <Line
                    type="monotone"
                    dataKey="deaths"
                    stroke="#FF0000"
                    yAxisId={0}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
