import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

function getDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function Report({ year, month, daysInMonth, selections }) {
    // Compute counts for the month
    const { completedDays, incompleteDays, partialDays } = useMemo(() => {
        let completed = 0;
        let partial = 0;
        let incomplete = 0;
        for (let d = 1; d <= daysInMonth; d++) {
            const key = getDateKey(year, month, d);
            const sel = selections[key];
            if (!sel) {
                incomplete++;
                continue;
            }
            const vals = [sel.Lunch, sel.Snack, sel.Dinner];
            const checkedCount = vals.filter(Boolean).length;
            if (checkedCount === 3) completed++;
            else if (checkedCount === 0) incomplete++;
            else partial++;
        }
        return { completedDays: completed, incompleteDays: incomplete, partialDays: partial };
    }, [year, month, daysInMonth, selections]);

    const total = daysInMonth;
    const percent = total === 0 ? 0 : Math.round((completedDays / total) * 100);

    return (
        <div style={{ marginTop: 16, padding: 12, background: '#f5f5f5', borderRadius: 6 }}>
            <h4 style={{ margin: '0 0 8px 0' }}>Monthly Report</h4>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ minWidth: 140 }}>
                    <div style={{ fontSize: 14 }}>Completed days</div>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>{completedDays}</div>
                </div>
                <div style={{ minWidth: 140 }}>
                    <div style={{ fontSize: 14 }}>Partial days</div>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>{partialDays}</div>
                </div>
                <div style={{ minWidth: 140 }}>
                    <div style={{ fontSize: 14 }}>Incomplete days</div>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>{incompleteDays}</div>
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 12, marginBottom: 6 }}>
                        Completion: {percent}% ({completedDays}/{total} full days)
                    </div>
                    <div style={{ background: '#ddd', height: 12, borderRadius: 6, overflow: 'hidden' }}>
                        <div style={{ width: `${percent}%`, height: '100%', background: '#4caf50' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

Report.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    daysInMonth: PropTypes.number.isRequired,
    selections: PropTypes.objectOf(
        PropTypes.shape({
            Lunch: PropTypes.bool,
            Snack: PropTypes.bool,
            Dinner: PropTypes.bool,
        })
    ).isRequired,
};

