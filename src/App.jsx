import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import ProtectedRoute from "./auth/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import { Toaster } from "react-hot-toast"
import AdminLayout from "./layout/AdminLayout"
import Users from "./pages/Users"
import Products from "./pages/Products"
import Category from "./pages/Category"
import ProductList from "./components/Productlist"
import AddProduct from "./pages/AddProduct"
import EditProduct from "./pages/EditProduct"
import Orders from "./pages/OrderList"
import OrderDetails from "./pages/OrderDetails"
import OrdersLayout from "./layout/OrderLayout"
import AddCategory from "./pages/AddCategory"
import EditCategory from "./pages/EditCategory"
import CategoryLayout from "./layout/CategoryLayout"
import Offers from "./pages/Offers.jsx"
import AddOffers from "./pages/AddOffers"
import OfferCard from "./components/OfferCard.jsx"
import OfferDetails from "./components/OfferDetail.jsx"
import CategoryProduct from "./components/CategoryProduct"
import Sliders from "./pages/Sliders.jsx"
import SliderCard from "./components/SliderCard.jsx"
import CreateSlider from "./components/CreateSlider.jsx"
import EditSlider from "./components/EditSlider.jsx"
import Inventory from "./pages/Inventory"



function App() {

  return (
  <BrowserRouter>
  
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />

      <Routes>
  <Route path="/admin/login" element={<Login />} />
 
 <Route element={<AdminLayout/>}>
 
 <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN","USER_ADMIN","PRODUCT_ADMIN"]} />}>
    <Route path="/admin/dashboard" element={<Dashboard />} />
  </Route>

  <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN","USER_ADMIN"]} />}>
    <Route path="/admin/users" element={<Users/>} />
  </Route>

  <Route
    element={
      <ProtectedRoute allowedRoles={["SUPER_ADMIN","PRODUCT_ADMIN"]} />
    }
  >
    <Route path="/admin/products" element={<Products />}>
      <Route index element={<ProductList />} />
      <Route path="add" element={<AddProduct />} />
      <Route path="edit/:id" element={<EditProduct />} />
    </Route>
  </Route>



     <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN","PRODUCT_ADMIN"]} />}>
    <Route path="/admin/categories" element={<CategoryLayout />}>
    <Route index element={<Category/>}/>
    <Route path="add"element={<AddCategory/>}/>
    <Route path="products/:categoryId" element={<CategoryProduct />} />

    <Route path="edit/:id" element={<EditCategory/>}/>

    </Route>
  </Route>


 <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN","ORDER_ADMIN"]} />}>
  <Route path="/admin/orders" element={<Orders />} />
  <Route path="/admin/orders/:id" element={<OrderDetails />} />
</Route>



<Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN","USER_ADMIN","PRODUCT_ADMIN"]} />}>
    <Route path="/admin/offers" element={<Offers />} >
    <Route index element={<OfferCard/>}/>
    <Route path=":id" element={<OfferDetails/>}/>
    <Route path="add" element={<AddOffers/>}/>

    </Route>
  </Route>



<Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN","PRODUCT_ADMIN"]}/>}>
<Route path="/admin/sliders" element={<Sliders/>}>
<Route index element={<SliderCard/>}/>
<Route path="create" element={<CreateSlider/>}/>
<Route path="edit/:id" element={<EditSlider/>}/>
</Route>
</Route>


<Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN","PRODUCT_ADMIN"]}/>}>
<Route path="/admin/inventory" element={<Inventory/>}/>

</Route>

  </Route>
</Routes>


  </BrowserRouter>
  )
}

export default App
