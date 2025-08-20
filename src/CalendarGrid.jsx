import React from 'react';

function getDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function CalendarGrid({
    year,
    month,
    days,
    selections,
    onDayClick,
}) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginTop: 8 }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} style={{ fontWeight: 'bold', textAlign: 'center' }}>{d}</div>
            ))}
            {days.map((d, i) => {
                if (!d) return <div key={i}></div>;
                const key = getDateKey(year, month, d);
                const sel = selections[key];
                // All meals checked
                const allChecked = sel && sel.Lunch && sel.Snack && sel.Dinner;
                return (
                    <div
                        key={i}
                        style={{
                            textAlign: 'center',
                            padding: 4,
                            cursor: 'pointer',
                            background: allChecked ? '#4caf50' : '#666666ff',
                            borderRadius: 4,
                            color: allChecked ? '#fff' : undefined,
                            border: allChecked ? '2px solid #388e3c' : undefined,
                        }}
                        onClick={() => onDayClick(d)}
                    >
                        {d}
                    </div>
                );
            })}
        </div>
    );
}