import { useLoaderData } from "react-router-dom";
import {getMenu} from"../../services/apiRestaurant";
import MenuItem from "../menu/MenuItem"


// fetching menu data from an API
export async function loader(){
  const menu = await getMenu();
  return (menu)
}

  function Menu() {
  const menu= useLoaderData();
  return <ul className="divide-y divided-stone-200  ">
   { menu.map((pizza)=> <MenuItem pizza={pizza} key={pizza.id}/>)}
  </ul>
 
}

export default Menu;
