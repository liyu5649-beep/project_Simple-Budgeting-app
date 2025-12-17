import { RiArrowRightSFill } from "react-icons/ri";

function CashSurpls({monthlyExpense, monthlyIncome}) {
    return <section className="monthly-summary">
        <div className="summary-expense">
            <div className="lable-expense">
            月支出
            <RiArrowRightSFill className="arrow-style"/>
            </div>
            <div className="amount">${monthlyExpense.toLocaleString()}</div>
        </div>
        <div className="summary-income">
            <div className="lable-income">
            月收入
            <RiArrowRightSFill className="arrow-style"/>
            </div>
            <div className="amount">${monthlyIncome.toLocaleString()}</div>
        </div>
    </section>
}

export default CashSurpls