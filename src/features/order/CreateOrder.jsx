import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import {createOrder} from"../../services/apiRestaurant"
import Button from "../../ui/Button";
import {  useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPizzaPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
 import store from "../../store"
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const {username,
         position ,
         status:addressStatus,
         address,
         error: errorAddress,
  }= useSelector(state=>state.user)
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalPizzaPrice = useSelector(getTotalPizzaPrice)
  const priorityPrice= withPriority? 0.2 * totalPizzaPrice:0;
  const totalPrice= totalPizzaPrice+priorityPrice;
  const dispatch = useDispatch();

  // useNavigation hook by react-router to get the state of the form submitting 
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoadingAddress = addressStatus === 'loading'
  // useActionData hook by react-router to get access to form errors that happened to be able to display it
  const formErrors = useActionData();

 if (!cart) return <EmptyCart/>
  return (
    <div className="px-4 py-6">

      <h2 className="mb-8  text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input"  type="text"  defaultValue={username} name="customer" required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center"> 
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input"  type="tel" name="phone" required />
          </div>
          {/* displaying the error we got access to thru the useActionData hook*/ }
          {formErrors?.phone && <p className="text-xs text-red-700 bg-red-100 rounded-md mt-2 p-2">{formErrors.phone}</p>}
        </div>

        <div className="relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
             className="input" 
             type="text"
             name="address"
             defaultValue={address}
             required />
              
          {addressStatus === 'error' && 
          <p className="text-xs text-red-700 bg-red-100 rounded-md mt-2 p-2">
            {errorAddress}</p>}
        </div>
         { !position.latitude && ! position.longitude &&
         (
           <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
           <Button type="small" disabled={isLoadingAddress}
                   onClick={(e)=>{
            e.preventDefault();
            dispatch(fetchAddress())}}>
            get location</Button>
           </span>
        )}
        </div>

        <div className="mb-12 flex items-center gap-5 ">
          <input
          className="w-6 h-6 accent-yellow-400 focus:ring-offset-2 focus:ring-yellow-400 focus:outline-none focus:ring"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/*using a hidden input for now till we actually use the real cart stringify it because it`s an object  */ }
          <input type="hidden" value={JSON.stringify(cart)} name="cart"/>
          < input type="hidden" 
                  value={position.latitude && position.longitude ?
                 `${position.latitude},${position.longitude}`: ''}/>
          <Button  type="primary" disabled={isSubmitting} >
          {isSubmitting ? "placing your order.....":` Order now for ${formatCurrency(totalPrice)}`}
            </Button>
        </div>
      </Form>
    </div>
  );
}

 export async function action({request}){
 // Extract form data from the request
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Create an order object from the form data
  const order={
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  }

  console.log(order,"blah")
  // handling form errors in react-router way 
  const errors={}
  // Validate the phone number
  if(!isValidPhone(order.phone))errors.phone =
  "please enter your correct phone number. we might need to contact you."
  // checking if the errors obj has an error already an return the error if yes before creating the order
  if(Object.keys(errors).length>0) return errors;
    const newOrder=  await createOrder(order)
   // DO NOT USE THIS A LOT AS IT AFFECTS PERFORMANCE OPT. IN THE PAGE
    store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`)
 }

export default CreateOrder;
