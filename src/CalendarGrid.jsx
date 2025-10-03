import React from 'react';
import PropTypes from 'prop-types';

export default function CalendarGrid({
    days,
    selections,
    onDayClick,
}) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginTop: 8 }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} style={{ fontWeight: 'bold', textAlign: 'center' }}>{d}</div>
            ))}
            {days.map((slot) => {
                if (!slot.day) return <div key={slot.id} />;
                const d = slot.day;
                const key = slot.id; // already a date key
                const sel = selections?.[key];
                // How many meals checked
                const lunchChecked = !!sel?.Lunch;
                const snackChecked = !!sel?.Snack;
                const dinnerChecked = !!sel?.Dinner;
                const allChecked = lunchChecked && snackChecked && dinnerChecked;
                const noneChecked = !lunchChecked && !snackChecked && !dinnerChecked;
                const someChecked = !allChecked && !noneChecked && (lunchChecked || snackChecked || dinnerChecked);
                let background = '#666666ff';
                let color;
                let border;
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
                    <button
                        key={key}
                        type="button"
                        onClick={() => onDayClick(d)}
                        style={{
                            textAlign: 'center',
                            padding: 4,
                            cursor: 'pointer',
                            background,
                            borderRadius: 4,
                            color,
                            border,
                            borderStyle: 'none',
                        }}
                        aria-label={`Day ${d}`}
                    >
                        {d}
                    </button>
                );
            })}
        </div>
    );
}

CalendarGrid.propTypes = {
    days: PropTypes.array.isRequired,
    selections: PropTypes.object,
    onDayClick: PropTypes.func.isRequired,
};