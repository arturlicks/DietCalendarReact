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
                // How many meals checked
                const lunchChecked = sel && sel.Lunch;
                const snackChecked = sel && sel.Snack;
                const dinnerChecked = sel && sel.Dinner;
                const allChecked = lunchChecked && snackChecked && dinnerChecked;
                const noneChecked = !lunchChecked && !snackChecked && !dinnerChecked;
                const someChecked = !allChecked && !noneChecked && (lunchChecked || snackChecked || dinnerChecked);
                let background = '#666666ff';
                let color = undefined;
                let border = undefined;
                if (allChecked) {
                    background = '#4caf50'; // all checked (green)
                    color = '#fff';
                    border = '2px solid #388e3c';
                } else if (someChecked) {
                    background = '#ffd600'; // some checked (yellow)
                    color = '#222';
                    border = '2px solid #ffea00';
                }
                return (
                    <div
                        key={i}
                        style={{
                            textAlign: 'center',
                            padding: 4,
                            cursor: 'pointer',
                            background,
                            borderRadius: 4,
                            color,
                            border,
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