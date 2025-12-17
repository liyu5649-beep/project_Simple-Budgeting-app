import { GrMoney } from "react-icons/gr";
import { MdOutlineRemoveRedEye } from "react-icons/md";

function ShowBalance({monthlyExpense, monthlyIncome}) {

    // 月結餘 = 收入 + 支出（支出是負數）
    const balance = monthlyIncome + -monthlyExpense;

    return <section className="round-frame">
        <div className="show-balance">
            <GrMoney style={{color: "black", marginBottom: "8px"}}/>
            <div className="month-balance">
                月結餘
                <MdOutlineRemoveRedEye />
            </div>
            <div className="amount">
                {balance >= 0 ? "+" : "-"}${Math.abs(balance).toLocaleString()}
            </div>
        </div>
    </section>

}

export default ShowBalance