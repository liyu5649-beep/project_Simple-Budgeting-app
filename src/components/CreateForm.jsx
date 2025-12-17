import { AiOutlineShopping } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiArrowRightSFill } from "react-icons/ri";
import { RiArrowLeftSFill } from "react-icons/ri";
import { useState, useEffect } from "react";

function CreateForm({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDate,
  setSelectedDate,
  selectedDay,
  setSelectedDay,
  addItem,
  onClose,
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // 元件剛 render 完 → 再加上 show
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  // 往前一天
  const prevDay = () => {
    const date = new Date(selectedYear, selectedMonth - 1, selectedDate - 1);
    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth() + 1);
    setSelectedDate(date.getDate());
    setSelectedDay(date.getDay());
  };
  // 往後一天
  const nextDay = () => {
    const date = new Date(selectedYear, selectedMonth - 1, selectedDate + 1);
    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth() + 1);
    setSelectedDate(date.getDate());
    setSelectedDay(date.getDay());
  };

  const [content, setContent] = useState("");
  const [cost, setCost] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = `${selectedYear}/${selectedMonth}/${selectedDate}`;
    const form = e.target;
    const contentValue = form[0].value;
    const costValue = form[1].value;

    console.log("submit cost:", costValue);

    if (!contentValue || !costValue) return;
    // 支出負數、收入正數
    const adjustedCost =
      type === "expense" ? -Math.abs(costValue) : Math.abs(costValue);
      
    addItem(contentValue, adjustedCost, date, type);
    setContent("");
    setCost("");
    onClose();
    console.log("content:", content);
    console.log("cost:", cost, typeof cost);
  };
  const [type, setType] = useState("expense"); // 預設支出

  return (
    <div className={`create-form ${visible ? "show" : ""}`}>
      <div className="create-date">
        <RiArrowLeftSFill className="arrow-style" onClick={prevDay} />
        <div className="show-today">
          <FaRegCalendarAlt
            style={{ width: "16px", height: "auto", cursor: "pointer" }}
          />
          今日 {selectedYear}/{selectedMonth}/{selectedDate} (
          {
            weekdays[
              new Date(selectedYear, selectedMonth - 1, selectedDate).getDay()
            ]
          }
          )
        </div>
        <RiArrowRightSFill className="arrow-style" onClick={nextDay} />
      </div>
      <div className="select-type">
        <span
          className={`select-expence ${type === "expense" ? "active" : ""}`}
          onClick={() => setType("expense")}
        >
          支出
        </span>
        <span
          className={`select-income ${type === "income" ? "active" : ""}`}
          onClick={() => setType("income")}
        >
          收入
        </span>
      </div>
      <form className="create-item" onSubmit={handleSubmit}>
        <AiOutlineShopping
          style={{ width: "auto", height: "100%", margin: "0 4px" }}
        />
        <input
          type="text"
          placeholder="請輸入消費項目"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setCost(e.target.valueAsNumber || "");
          }}
          style={{ borderRight: "2px solid black" }}
          required
        />
        <input
          type="number"
          placeholder="$0"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        />
        <button type="submit">完成</button>
      </form>
    </div>
  );
}

export default CreateForm;
