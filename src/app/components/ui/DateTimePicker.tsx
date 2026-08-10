import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateTimePickerProps {
    value: string; // ISO string or ""
    onChange: (isoString: string) => void;
    label?: string;
}

const DAYS_PT = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const MONTHS_PT = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO",
];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange, label }) => {
    const [open, setOpen] = useState(false);

    const parsed = value ? new Date(value) : null;
    const today = new Date();

    const [viewYear, setViewYear] = useState(parsed?.getFullYear() ?? today.getFullYear());
    const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? today.getMonth());
    const [selectedDate, setSelectedDate] = useState<Date | null>(parsed);
    const [hours, setHours] = useState(parsed ? String(parsed.getHours()).padStart(2, "0") : "09");
    const [minutes, setMinutes] = useState(parsed ? String(parsed.getMinutes()).padStart(2, "0") : "00");

    const daysInMonth = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewYear, viewMonth]);
    const firstDay = useMemo(() => getFirstDayOfWeek(viewYear, viewMonth), [viewYear, viewMonth]);

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const handleDayClick = (day: number) => {
        const d = new Date(viewYear, viewMonth, day, parseInt(hours), parseInt(minutes));
        setSelectedDate(d);
        onChange(d.toISOString());
    };

    const handleTimeChange = (h: string, m: string) => {
        setHours(h);
        setMinutes(m);
        if (selectedDate) {
            const d = new Date(selectedDate);
            d.setHours(parseInt(h), parseInt(m));
            setSelectedDate(d);
            onChange(d.toISOString());
        }
    };

    const handleClear = () => {
        setSelectedDate(null);
        onChange("");
        setOpen(false);
    };

    const isToday = (day: number) =>
        viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate();

    const isSelected = (day: number) =>
        selectedDate &&
        viewYear === selectedDate.getFullYear() &&
        viewMonth === selectedDate.getMonth() &&
        day === selectedDate.getDate();

    const displayValue = selectedDate
        ? selectedDate.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
        : "";

    return (
        <div className="relative">
            {label && (
                <label className="block text-[10px] uppercase font-bold tracking-widest text-black/50 mb-1">{label}</label>
            )}

            {/* TRIGGER */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full text-left bg-transparent border-b border-black/20 px-0 py-3 focus:outline-none focus:border-black transition text-sm flex items-center justify-between gap-2"
            >
                <span className={displayValue ? "text-black" : "text-black/40"}>
                    {displayValue || "Selecionar data e hora..."}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-black/40">
                    {open ? "FECHAR" : "ABRIR"}
                </span>
            </button>

            {/* CALENDAR DROPDOWN */}
            {open && (
                <div className="absolute z-50 left-0 top-full mt-2 w-full max-w-sm bg-white border border-black/10 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">

                    {/* MONTH NAV */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
                        <button type="button" onClick={prevMonth} className="hover:opacity-60 transition-opacity p-1">
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-[11px] font-black uppercase tracking-widest">
                            {MONTHS_PT[viewMonth]} {viewYear}
                        </span>
                        <button type="button" onClick={nextMonth} className="hover:opacity-60 transition-opacity p-1">
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* DAY NAMES */}
                    <div className="grid grid-cols-7 text-center text-[9px] font-bold uppercase tracking-widest text-black/40 py-2 px-2">
                        {DAYS_PT.map(d => <span key={d}>{d}</span>)}
                    </div>

                    {/* DAY GRID */}
                    <div className="grid grid-cols-7 text-center px-2 pb-3 gap-y-1">
                        {/* Empty cells before first day */}
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <span key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => handleDayClick(day)}
                                    className={`
                                        py-2 text-[12px] font-medium transition-all
                                        ${isSelected(day) ? "bg-black text-white font-bold" : "hover:bg-black/5"}
                                        ${isToday(day) && !isSelected(day) ? "underline underline-offset-4 font-bold" : ""}
                                    `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>

                    {/* TIME PICKER */}
                    <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-black/10">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-black/50">Horário</span>
                        <div className="flex items-center gap-1">
                            <select
                                value={hours}
                                onChange={e => handleTimeChange(e.target.value, minutes)}
                                className="bg-transparent text-sm font-bold appearance-none text-center focus:outline-none border border-black/10 px-2 py-1"
                            >
                                {Array.from({ length: 24 }).map((_, i) => {
                                    const h = String(i).padStart(2, "0");
                                    return <option key={h} value={h}>{h}</option>;
                                })}
                            </select>
                            <span className="text-sm font-black">:</span>
                            <select
                                value={minutes}
                                onChange={e => handleTimeChange(hours, e.target.value)}
                                className="bg-transparent text-sm font-bold appearance-none text-center focus:outline-none border border-black/10 px-2 py-1"
                            >
                                {["00", "15", "30", "45"].map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex border-t border-black/10">
                        <button
                            type="button"
                            onClick={handleClear}
                            className="flex-1 py-3 text-[10px] uppercase font-bold tracking-widest text-black/50 hover:text-black transition-colors border-r border-black/10"
                        >
                            LIMPAR
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex-1 py-3 text-[10px] uppercase font-bold tracking-widest bg-black text-white hover:opacity-80 transition-opacity"
                        >
                            CONFIRMAR
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
