import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductsForm from "./ProductsForm";
import ProductsList from "./ProductsList";
import Search from "./Search";

function ProductsManagement() {
  //State quản lý danh sách sản phẩm
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Iphone",
      type: "VietNam",
      description: "nhỏ gọn",
      image: "img",
      price: "1000",
    },
  ]);

  //State quản lý sp đang được chọn
  const [selectedProduct, setSelectedProduct] = useState({});

  //State quản lý giá trị tìm kiếm
  const [searchByName, setSearchByName] = useState("");

  //hàm call API để lấy danh sách các sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://63e864175f3e35d898f01f49.mockapi.io/api/products-phone",
        {
          params: {
            name: searchByName || undefined,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchByName]);

  //hàm xử lý nhận vào object user và thêm hoặc cập nhật sp qua API
  const handleSubmit = async (product) => {
    const { id, ...payload } = product;

    try {
      if (id) {
        // Cập nhật
        await axios.put(
          `https://63e864175f3e35d898f01f49.mockapi.io/api/products-phone/${id}`,
          payload
        );
      } else {
        await axios.post(
          "https://63e864175f3e35d898f01f49.mockapi.io/api/products-phone",
          payload
        );
      }

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  //hàm xử lý nhận vào Id và xoá sản phẩm qua API
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://63e864175f3e35d898f01f49.mockapi.io/api/products-phone/${productId}`
      );
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  //hàm xử lý nhận vào object product, và lưu vào state selectedProduct
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSearch = (searchString) => {
    setSearchByName(searchString);
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-primary">Product management</h1>

      <div className="card">
        <div className="card-header bg-dark text-white">Product Form</div>
        <div className="card-body">
          <ProductsForm
            onSubmit={handleSubmit}
            product={selectedProduct}
            onReset={() => setSelectedProduct({})}
          />
        </div>
      </div>

      <div className="mt-4">
        <Search onSearch={handleSearch} />
      </div>

      <div className="mt-4">
        <ProductsList
          products={products}
          onDeleteProduct={handleDeleteProduct}
          onSelectProduct={handleSelectProduct}
        />
      </div>
    </div>
  );
}

export default ProductsManagement;
