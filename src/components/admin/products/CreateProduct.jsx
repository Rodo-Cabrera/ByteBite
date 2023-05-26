import React, { useState, useEffect } from "react";
import { createProduct, uploadIcon, uploadImage } from "../../../API/Api";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";


const CreateProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [iconUrl, setIconUrl] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [prodData, setProdData] = useState({
    tittle: "",
    icon: "",
    description: "",
    img: "",
    category: "",
    price: null,
    quantity: null,
  });

  const handleIconChange = async (e) => {
    const iconForm = new FormData();
    iconForm.append("icon", e.target.files[0]);
    await createProduct(iconForm)
      .then(response => { setIconUrl(response.data.url) })
      .catch(error => console.log(error))
  };

  const handleImageChange = async (e) => {
    const imgForm = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      imgForm.append("image", e.target.files[i]);
    }
    await createProduct(imgForm)
      .then((response) => {
        const urls = response.data.map((result) => result.url);
        setImageUrl(urls);
      })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    if (iconUrl !== "") {
      prodData.icon = iconUrl;
    }
  }, [iconUrl]);

  useEffect(() => {
    if (imageUrl.length !== 0) {
      prodData.img = imageUrl;
    }
  }, [imageUrl]);

  const handleChange = (e) => {
    setProdData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSend = async () => {

    try {
      await createProduct(prodData)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }


  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSend)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del producto"
            name="tittle"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ícono</Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/jpeg, image/png, image/webp"
            placeholder="ícono del producto"
            name="icon"
            onChange={handleIconChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descripción del producto</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descripción del producto"
            name="description"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Imagen del producto</Form.Label>

          <Form.Control
            type="file"
            multiple
            accept="image/jpeg, image/png, image/webp"
            placeholder="Imagen del producto"
            name="img"
            onChange={handleImageChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            placeholder="Categoría del producto"
            name="category"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Precio del producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Precio del producto"
            name="price"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Stock de producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Cantidades disponibles del producto"
            name="quantity"
            onChange={handleChange}
          />
        </Form.Group>
        <div>
          <button type="submit" className="btn btn-primary">
            Crear producto
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreateProduct;
