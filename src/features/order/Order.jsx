import {  useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "../order/OrderItem"
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";







// fetching the order data 
export async function loader({params}){
   // Fetch the order data based on the orderId from the URL parameters
  const order = await getOrder(params.orderId)
  return (order);
}


function Order() {

  // using  useLoaderData hook by react-router to use the data in the Ui
  const order= useLoaderData()
 

  const fetcher = useFetcher();

  useEffect(()=>{
    if (!fetcher.data && fetcher.state === 'idle')
           fetcher.load('/menu')
  },[fetcher])


  console.log(fetcher.data,"data")

  // Everyone can search for all orders,
  //  so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  
  
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2"> 
        <h2 className="text-xl font-semibold"> Order #{id} Status</h2>

        <div className="space-x-2 ">
          {priority &&  <span className= " text-red-50 tracking-wide bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold"> Priority </span>}
          <span className= "text-red-50 tracking-wide bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 py-5 px-6">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="dive-stone-200 divide-y border-b">
        {cart.map(item=> 
        <OrderItem item={item} 
                   key={item.pizzaId} 
                   ingredients={fetcher?.data?.find(el=>el.id === item.pizzaId)?.ingredients??[]}
                    isLoadingIngredients={fetcher.state==="loading"}/>
                   )}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p  className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
        { !priority && <UpdateOrder order={order}/>}
    </div>
  );
}

export default Order;
