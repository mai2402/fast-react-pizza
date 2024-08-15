import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
   const navigation = useNavigation();
   const isLoading = navigation.state === "loading";

   return (
     <div className="flex flex-col min-h-screen">
       {isLoading && <Loader />}
       <Header />
       <main className="flex-grow max-w-full  p-4">
         
         <Outlet />
       </main>
       <CartOverview />
     </div>
   );
}

export default AppLayout;

