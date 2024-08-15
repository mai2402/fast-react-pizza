import { useSelector } from "react-redux"

function UserName() {
    const userName = useSelector(state=> state.user.UserName)
    if (!userName ) return null;
    return (
        <div className=" hidden md:block text-sm font-semibold">
            {userName}
        </div>
    )
}

export default UserName
