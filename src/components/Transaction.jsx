import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

function Transaction({ items, deleteItem, selectedYear, selectedMonth }) {
  // 過濾當前選擇的月份
  const filteredItems = items.filter((t) => {
    const [y, m] = t.date.split("/").map(Number);
    return y === selectedYear && m === selectedMonth;
  });
  
    // 依日期分組
  const grouped = filteredItems.reduce((acc, t) => {
    if (!acc[t.date]) acc[t.date] = [];
    acc[t.date].push(t);
    return acc;
  }, {});
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="transaction">
      {Object.entries(grouped).map(([date, items]) => {
        // ⭐ 計算當天總金額
        const total = items.reduce((sum, item) => sum + item.cost, 0);

        return (
          <div key={date} className="transaction-day">
            <div className="transaction-date">
              {date}
              <span style={{ color: "#FFD306" }}>${total}</span>
            </div>

            {items.map((item) => (
              <div key={item.id} className="transaction-row">
                {/* 內容區 */}
                <div
                  className={`transaction-item ${
                    activeId === item.id ? "active" : ""
                  }`}
                  onClick={() =>
                    setActiveId(activeId === item.id ? null : item.id)
                  }
                >
                  <p>{item.content}</p>
                  <p
                    style={{
                      color: item.cost < 0 ? "#FFD306" : "#46A3FF",
                    }}
                  >
                    {item.cost > 0 ? "+" : ""}${Math.abs(item.cost)}
                  </p>
                  {/* 刪除按鈕 */}
                  <FaRegTrashAlt
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Transaction;
