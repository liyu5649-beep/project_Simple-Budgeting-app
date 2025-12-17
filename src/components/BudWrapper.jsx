import { MdRestaurantMenu } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import CashSurpls from "./CashSurpls";
import ShowBalance from "./ShowBalance";
import CreateForm from "./CreateForm";
import { useRef, useState } from "react";
import Transaction from "./Transaction";
import SelectMonth from "./SelectMonth";

function BudWrapper() {
  // 日期 icon 選擇
  const dateInputRef = useRef(null);
  const openDatePicker = () => {
    dateInputRef.current?.showPicker();
  };

  const [showSelectMonth, setSelectMonth] = useState(false);
  // 存目前年月日
  const [selectedYear, setSelectedYear] = useState(() =>
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    () => new Date().getMonth() + 1
  );
  const [selectedDate, setSelectedDate] = useState(() => new Date().getDate());
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDay());
  // 將 getDay() 回傳的數字轉中文
  const [today, setToday] = useState(() => {
    const today = new Date();
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    return weekdays[today.getDay()];
  });

  // 呼叫 CreateForm 表單
  const [showForm, setShowForm] = useState(false);

  // 單一陣列存所有交易
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved
      ? JSON.parse(saved)
      : [
          {
            content: "午餐",
            cost: -150,
            date: "2025/12/15",
            type: "expense",
            id: Math.random(),
          },
          {
            content: "晚餐",
            cost: -250,
            date: "2025/12/15",
            type: "expense",
            id: Math.random(),
          },
        ];
  });
  // 新增交易項目
  const addItem = (content, cost, date, type) => {
    setItems((prev) => {
      const newItems = [
        ...prev,
        { content, cost, date, type, id: Math.random() },
      ];
      localStorage.setItem("items", JSON.stringify(newItems));
      return newItems;
    });
  };
  const deleteItem = (id) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      localStorage.setItem("items", JSON.stringify(newItems));
      return newItems;
    });
  };
  // 計算當月支出
  const monthlyExpense = items
    .filter((t) => t.type === "expense")
    .filter((t) => {
      const [y, m] = t.date.split("/").map(Number);
      return y === selectedYear && m === selectedMonth;
    })
    .reduce((sum, t) => sum + Math.abs(t.cost), 0);

  // 計算當月收入
  const monthlyIncome = items
    .filter((t) => t.type === "income")
    .filter((t) => {
      const [y, m] = t.date.split("/").map(Number);
      return y === selectedYear && m === selectedMonth;
    })
    .reduce((sum, t) => sum + t.cost, 0);

  return (
    <section className="wrapper">
      <header className="head">
        <MdRestaurantMenu
          className="head-icons"
          style={{ marginLeft: "16px" }}
        />
        <div className="date" onClick={() => setSelectMonth(true)}>
          {selectedYear}年{selectedMonth}月
          <RiArrowDownSFill style={{ width: "24px", height: "auto" }} />
        </div>
        <div>
          <FaRegBell className="head-icons" />
          <FaRegCalendarAlt
            className="head-icons"
            style={{ margin: "0 16px" }}
            onClick={() => openDatePicker()}
          />
        </div>
        {showSelectMonth && (
          <div className="overlay" onClick={() => setSelectMonth(false)}></div>
        )}
        <SelectMonth
          show={showSelectMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          onClose={() => setSelectMonth(false)}
        />
        <input ref={dateInputRef} type="date" style={{ display: "none" }} />
      </header>

      <CashSurpls
        monthlyExpense={monthlyExpense}
        monthlyIncome={monthlyIncome}
      />
      <ShowBalance
        monthlyExpense={monthlyExpense}
        monthlyIncome={monthlyIncome}
      />
      <Transaction
        items={items}
        deleteItem={deleteItem}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
      {showForm && (
        <CreateForm
          className="show"
          onClose={() => setShowForm(false)}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          today={today}
          setToday={setToday}
          addItem={addItem}
        />
      )}
      {!showForm && (
        <button className="addBT" onClick={() => setShowForm(true)}>
          &#43;
        </button>
      )}
    </section>
  );
}

export default BudWrapper;
