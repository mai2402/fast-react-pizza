import {Link} from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import UserName from "../features/user/UserName"

function Header() {
    return (
        <header
            className=" flex items-center justify-between border-b border-stone-200 px-4 py-3 bg-yellow-500 uppercase sm:px-6 ">
            <Link className="tracking-widest" to="/">Fast React Pizza CO.
            </Link>
            <SearchOrder/>
            <UserName/>

        </header>
    )
}

export default Header
