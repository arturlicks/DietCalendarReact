import { useState, useMemo } from 'react';
import MealModal from './MealModal';
import CalendarGrid from './CalendarGrid';

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function Calendar() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    // Store selections per day
    const [selections, setSelections] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const [mealSelections, setMealSelections] = useState({
        Lunch: false,
        Snack: false,
        Dinner: false,
    });

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Memoize days array for performance
    const days = useMemo(() => {
        const arr = [];
        for (let i = 0; i < firstDay; i++) arr.push(null);
        for (let d = 1; d <= daysInMonth; d++) arr.push(d);
        return arr;
    }, [firstDay, daysInMonth]);

    const prevMonth = () => {
        setCurrentMonth((m) => (m === 0 ? 11 : m - 1));
        if (currentMonth === 0) setCurrentYear((y) => y - 1);
    };

    const nextMonth = () => {
        setCurrentMonth((m) => (m === 11 ? 0 : m + 1));
        if (currentMonth === 11) setCurrentYear((y) => y + 1);
    };

    // Modal handlers
    const openModal = (day) => {
        setSelectedDay(day);
        const key = getDateKey(currentYear, currentMonth, day);
        setMealSelections(selections[key] || { Lunch: false, Snack: false, Dinner: false });
    };

    const closeModal = () => {
        setSelectedDay(null);
    };

    const handleCheckboxChange = (meal) => {
        setMealSelections((prev) => ({
            ...prev,
            [meal]: !prev[meal],
        }));
    };

    const handleSave = () => {
        const key = getDateKey(currentYear, currentMonth, selectedDay);
        setSelections((prev) => ({
            ...prev,
            [key]: mealSelections,
        }));
        closeModal();
    };

    return (
        <div style={{ maxWidth: 320, margin: '2rem auto', border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={prevMonth}>&lt;</button>
                <h3>
                    {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={nextMonth}>&gt;</button>
            </div>
            <CalendarGrid
                year={currentYear}
                month={currentMonth}
                days={days}
                selections={selections}
                onDayClick={openModal}
            />
            <MealModal
                open={selectedDay !== null}
                date={
                    selectedDay
                        ? new Date(currentYear, currentMonth, selectedDay).toLocaleDateString()
                        : ''
                }
                mealSelections={mealSelections}
                onChange={handleCheckboxChange}
                onClose={closeModal}
                onSave={handleSave}
            />
        </div>
    );
}