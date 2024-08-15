import {useState} from "react"
import {useNavigate} from "react-router-dom";

function SearchOrder() {
    const [query,
        setQuery] = useState('');
    // useNavigate hook to programmatically navigate from route to route
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        if (!query) 
            return;
        navigate(`/order/${query}`)
        setQuery('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="...search order #"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-full
                bg-yellow-100
                text-sm
                w-28
                px-4
                py-2
                sm:w-64
                placeholder:text-stone-400
                focus:outline-none
                focus:ring
                sm:focus:w-72
                focus:ring-yellow-500
                focus:ring-opacity-50
                transition-all duration-300
                "/>
        </form>
    )
}

export default SearchOrder
