import { Route, Routes } from 'react-router-dom';
import Layout from "./components/layout/Layout.jsx";
import NotFoundPage from './pages/customer/notFound/NotFound.jsx';
import ExamplesAdminPage from './pages/admin/example/Example.jsx';
import CategoriesAdminPage from './pages/admin/category/Category.jsx';
import ProductsAdminPage from './pages/admin/product/Product.jsx';
import UsersAdminPage from './pages/admin/user/User.jsx';
import OrdersAdminPage from './pages/admin/order/Order.jsx';
import Login from './pages/authentification/Login.jsx';
import Signup from './pages/authentification/Signup.jsx';
import './App.css';
import PrivateRoute from './components/privateRoute/PrivateRoute.jsx';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          
        <Route path="/" element={<h1>Home Page</h1>} /></Route>

        {/* Admin route */}
        <Route path="/admin/examples" element={<ExamplesAdminPage />} />
        <Route path="/admin/categories" element={<CategoriesAdminPage />} />
        <Route path="/admin/products" element={<ProductsAdminPage />} />
        <Route path="/admin/users" element={<UsersAdminPage />} />
        <Route path="/admin/orders" element={<OrdersAdminPage />} />
        

        {/* Public route */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
