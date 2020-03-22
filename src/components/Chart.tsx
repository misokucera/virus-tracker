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
    dailyChanges: DailyChange[];
};

export function Chart({ dailyChanges }: Props) {
    const prepareData = (data: DailyChange[]) => {
        return dailyChanges.map(dailyChange => {
            return {
                ...dailyChange,
                date: new Date(dailyChange.date).toLocaleDateString()
            };
        });
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={prepareData(dailyChanges)}
                margin={{ top: 5, right: 20, left: 10, bottom: 50 }}
            >
                <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    dx={-5}
                    dy={5}
                    minTickGap={-45}
                    tick={{ fontSize: 9 }}
                />
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
