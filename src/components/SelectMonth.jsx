import { useState } from "react";
import { RiArrowRightSFill } from "react-icons/ri";
import { RiArrowLeftSFill } from "react-icons/ri";

function SelectMonth({show, selectedYear, selectedMonth, setSelectedYear, setSelectedMonth, onClose}) {

  const prevYear = () => setSelectedYear((prev) => prev - 1);
  const nextYear = () => setSelectedYear((prev) => prev + 1);
  const selectMonth = (month) => {
    setSelectedMonth(month);
    onClose(); // 選完自動關閉
  };

  return <section className={`select-month-form ${show ? "show" : ""}`}>
      <p className="select-year">
          <RiArrowLeftSFill className="arrow-style" onClick={prevYear}/>
          {selectedYear}年
          <RiArrowRightSFill className="arrow-style" onClick={nextYear}/>
      </p>
      <div className="select-month">
      {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={`month ${selectedMonth === i + 1 ? "active" : ""}`}
            onClick={() => selectMonth(i + 1)}
          >
            {i + 1}月
          </span>
        ))}
    </div>
  </section>
}

export default SelectMonth