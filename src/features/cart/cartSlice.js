import { createSlice } from "@reduxjs/toolkit"



const initialState={
    cart:[],
  
}


const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem(state,action){
            //payload = new item
        state.cart.push(action.payload)
        },
        deleteItem(state,action){
            //payload = pizza id
            state.cart =
            state.cart.filter((item)=> item.pizzaId !== action.payload)

        },
        increaseItemQuantity(state,action){
          const item = state.cart.find((item)=>item.pizzaId === action.payload)
                item.quantity++
                item.totalPrice = item.quantity * item.unitPrice
            
        },
        decreaseItemQuantity(state,action){
          const item =  state.cart.find((item)=>item.pizzaId === action.payload)
            item.quantity--
            item.totalPrice=item.quantity * item.unitPrice

            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state,action)
        },
        clearCart(state){
            state.cart=[]
        }
    }
})

export const {addItem,increaseItemQuantity,decreaseItemQuantity,deleteItem,clearCart} = cartSlice.actions

export default  cartSlice.reducer

export const getCart = (state)=> state.cart.cart;

export const  getTotalPizzaNum =(state)=>(state.cart.cart.reduce((sum,item)=>sum+item.quantity,0))

export const getTotalPizzaPrice=(state)=>(state.cart.cart.reduce((sum,item)=>sum +item.totalPrice,0))

export const getCurrentQuantity = (id)=>(state)=>(state.cart.cart.find(item=>(item.pizzaId === id))?.quantity??0)