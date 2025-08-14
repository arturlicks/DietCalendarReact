import React from 'react';

export default function MealModal({ open, date, mealSelections, onChange, onClose, onSave }) {
    if (!open) return null;
    return (
        <div
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
                style={{
                    background: '#555',
                    padding: 24,
                    borderRadius: 8,
                    minWidth: 240,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h4>
                    {date}
                </h4>
                <form>
                    {['Lunch', 'Snack', 'Dinner'].map((meal) => (
                        <div key={meal}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={mealSelections[meal]}
                                    onChange={() => onChange(meal)}
                                />
                                {meal}
                            </label>
                        </div>
                    ))}
                </form>
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    );
}