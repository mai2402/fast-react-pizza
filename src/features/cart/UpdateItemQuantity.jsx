import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice"

function UpdateItemQuantity({pizzaId, currentQuantity}) {

    const dispatch=useDispatch()
    function handleDecreaseQuantity(){
        dispatch(decreaseItemQuantity(pizzaId))
    }
    return (
        <div className="flex gap-2 md:gap-3 items-center">
            <Button type='round' onClick={handleDecreaseQuantity}>-</Button>
            <span className="text-sm font-medium">{currentQuantity}</span>
            <Button type='round' onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>

        </div>
    )
}

export default UpdateItemQuantity
