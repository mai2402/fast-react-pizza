import {formatCurrency} from "../../utils/helpers";
import Button from "../../ui/Button"
import {useDispatch, useSelector} from "react-redux";
import {addItem, getCurrentQuantity} from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({pizza}) {
    const {
        name,
        unitPrice,
        ingredients,
        soldOut,
        imageUrl,
        id
    } = pizza;
    const currentQuantity = useSelector(getCurrentQuantity(id))
    const isInCart = currentQuantity > 0;
    const dispatch = useDispatch();

    function handleAddItem() {

        const newItem = {
            pizzaId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1
        }

        dispatch(addItem(newItem))

    }
    return (
        <li className="flex gap-4 py-2  ">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 ${soldOut
                ? 'opacity-70 grayscale'
                : ''}`}/>
            <div className="flex flex-col grow ">
                <p className="font-medium">{name}</p>
                <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
                <div className="mt-auto flex items-center justify-between ">
                    {!soldOut
                        ? <p className="text-sm">
                                {formatCurrency(unitPrice)}</p>
                        : <p className=" uppercase text-sm text-stone-500 font-medium">
                            Sold out
                        </p>
}
                    {isInCart && <div className="flex items-center gap-3 sm:gap-8">
                        <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/>
                        <DeleteItem pizzaId={id}/>
                    </div>}
                    {!soldOut && !isInCart && <Button type="small" onClick={handleAddItem}>Add to Cart</Button>}

                </div>
            </div>
        </li>
    );
}

export default MenuItem;
