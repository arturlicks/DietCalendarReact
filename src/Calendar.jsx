import { useState } from 'react';

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export default function Calendar() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const prevMonth = () => {
        setCurrentMonth((m) => (m === 0 ? 11 : m - 1));
        if (currentMonth === 0) setCurrentYear((y) => y - 1);
    };

    const nextMonth = () => {
        setCurrentMonth((m) => (m === 11 ? 0 : m + 1));
        if (currentMonth === 11) setCurrentYear((y) => y + 1);
    };

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return (
        <div style={{ maxWidth: 320, margin: '2rem auto', border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={prevMonth}>&lt;</button>
                <h3>
                    {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={nextMonth}>&gt;</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginTop: 8 }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} style={{ fontWeight: 'bold', textAlign: 'center' }}>{d}</div>
                ))}
                {days.map((d, i) =>
                    d ? (
                        <div key={i} style={{ textAlign: 'center', padding: 4 }}>{d}</div>
                    ) : (
                        <div key={i}></div>
                    )
                )}
            </div>
        </div>
    );
}