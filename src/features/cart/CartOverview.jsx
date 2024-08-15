import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPizzaNum } from "./cartSlice";
import { getTotalPizzaPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPizzaNum =useSelector(getTotalPizzaNum)
  const totalPizzaPrice =useSelector(getTotalPizzaPrice)

  if(!totalPizzaNum ) return null;
  return (
    <div className="flex justify-between items-center text-sm sm:text-base sm:px-6 px-4 py-4 bg-stone-800 text-stone-200 uppercase">
      <p className=" space-x-4 sm:space-x-6 text-stone-300 font-semibold">
        <span>{totalPizzaNum} pizzas</span>
        <span>{formatCurrency(totalPizzaPrice)}</span>
      </p>
      <Link  to="/cart" >Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
