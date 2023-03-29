import React, { useState, useEffect } from "react";

function ProductsForm({ product, onSubmit, onReset }) {
  // state quản lý giá trị của các input trong form
  const [values, setValues] = useState({
    id: "",
    name: "",
    type: "",
    description: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    setValues(product);
  }, [product]);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    // Chặn hành vi submit mặc định của form
    evt.preventDefault();

    // Gọi prop onSubmit và truyền vào object values (API)
    onSubmit(values);

    //Gọi hàm handResetForm để reset giá trị trên các input về rỗng
    handleResetForm();
  };

  const handleResetForm = () => {
    setValues({
      id: "",
      name: "",
      type: "",
      description: "",
      image: "",
      price: "",
    });
    onReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Type</label>
        <input
          type="text"
          name="type"
          className="form-control"
          value={values.type}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="text"
          name="image"
          className="form-control"
          value={values.image}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="text"
          name="price"
          className="form-control"
          value={values.price}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-success me-2">
        Submit
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleResetForm}
      >
        Reset
      </button>
    </form>
  );
}

export default ProductsForm;
