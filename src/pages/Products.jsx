import { Outlet, Link } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Products</h1>

       
      </div>

      {/* Child routes render here */}
      <Outlet />
    </div>
  );
};

export default Products;
