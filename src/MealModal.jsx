import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function MealModal({ open, date, mealSelections, onChange, onClose, onSave }) {
    useEffect(() => {
        function onKey(e) {
            if (e.key === 'Escape') onClose();
        }
        if (open) {
            window.addEventListener('keydown', onKey);
            return () => window.removeEventListener('keydown', onKey);
        }
        return undefined;
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                role="document"
                style={{
                    background: '#555',
                    padding: 24,
                    borderRadius: 8,
                    minWidth: 240,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h4 style={{ textAlign: 'center', marginBottom: 20 }}>
                    {date}
                </h4>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                        alignItems: 'center', // Center align items horizontally
                    }}
                >
                    {['Lunch', 'Snack', 'Dinner'].map((meal) => (
                        <label
                            key={meal}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                minWidth: 120,
                                fontSize: 16,
                                fontFamily: 'inherit',
                                justifyContent: 'center', // Center content in label
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={!!mealSelections[meal]}
                                onChange={() => onChange(meal)}
                                style={{ marginRight: 8 }}
                            />
                            <span style={{ width: 60, display: 'inline-block', textAlign: 'center' }}>{meal}</span>
                        </label>
                    ))}
                </form>
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

MealModal.propTypes = {
    open: PropTypes.bool.isRequired,
    date: PropTypes.string,
    mealSelections: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};