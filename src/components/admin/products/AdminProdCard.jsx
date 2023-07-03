import { Switch, Box, FormControlLabel, Snackbar, Alert } from '@mui/material';
import React, { useState, useContext } from 'react'
import { userContext } from '../../../context/AuthContext';
import { Card, Button, Container, Carousel, Form } from 'react-bootstrap'
import { ableProduct, disableProduct, editPrice, offerPriceProd, spotlightProduct, unSpotlightProduct } from '../../../API/Api';
import { useForm } from 'react-hook-form';
import { validationsFields } from '../../../utils/validation';
import { messages } from '../../../utils/messages';
import Swal from 'sweetalert2';


const AdminProdCard = ({ product, updateProductState}) => {

  const { token } = useContext(userContext);

  const [spotlight, setSpotlight] = useState(product.spotlight);

  const [prodStatus, setProdStatus] = useState(product.disabled);

  const [openNotification, setOpenNotification] = useState(false);

  const [openStatusNotification, setOpenStatusNotification] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState('');

  const [ableMessage, setAbleMessage] = useState('');

  const [price, setPrice] = useState(0);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const [priceInOffer, setPriceInOffer] = useState({
    price: product.price,
    offerPrice: product.offerPrice || 0,
  })

  const handleChange = (e) => {
    setPriceInOffer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  const handleChangePrice = async (data) => {

   const formData = {
    price: data.price || priceInOffer.price,
    offerPrice: data.offerPrice || priceInOffer.offerPrice,
   }

    if (token) {
      try {
        if (parseInt(formData.offerPrice) >= parseInt(formData.price)) {
          return (
            Swal.fire({
              icon: "error",
              title: "Error en la oferta",
              text: "El precio en oferta no puede ser mayor al de lista",          
            })
          )
        } else if (parseInt(formData.price) === parseInt(formData.price) && parseInt(offerPrice !== null)) {
          await offerPriceProd(token, product._id);
          setPriceInOffer({ offerPrice: formData.offerPrice });
          updateProductState(product._id, { offerPrice: formData.offerPrice });
        } else {
          await offerPriceProd(token, product._id);
          setPriceInOffer({ offerPrice: formData.offerPrice})
          updateProductState(product._id, { offerPrice: formData.offerPrice });

          await editPrice(token, product._id);
          setPriceInOffer({price: formData.price})
          updateProductState(product._id, { price: formData.price });

        }
      } catch (error) {
        console.log(error);
      }
    }
  }



  const handleSpotlightProd = async () => {
    if (token) {
      try {
        if (spotlight) {
          await unSpotlightProduct(token, product._id);       
        } else {
          await spotlightProduct(token, product._id);        
        }     
        setSpotlight(!spotlight);
        updateProductState(product._id, { spotlight: !spotlight });
        const message = spotlight ? 'Producto DESMARCADO como destacado' : 'Producto MARCADO como destacado';
        setNotificationMessage(message);
        setOpenNotification(true);
      } catch (error) {
        console.log(error);
      }
    }
  }


  const handleProdStatus = async () => {
    if (token) {
      try {
        if (prodStatus) {
          await ableProduct(token, product._id);          
        } else {
          await disableProduct(token, product._id);   
        };   
        setProdStatus(!prodStatus);
        updateProductState(product._id, { disabled: !prodStatus });
        const message = !prodStatus ? 'Producto DESABILITADO con éxito' : 'Producto HABILITADO con éxito';
        setAbleMessage(message);
        setOpenStatusNotification(true);
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <div className="admin-prod-card">
      <div className="icon-container">
        <Card.Header>
          <Card.Img
            variant="top"
            src={product.icon}
            className="prod-card-icon"
          />
        </Card.Header>
      </div>
      <Container>
        <Card className="prod-edit-card">
          <Card.Body>
            <div>
              <Carousel fade interval={null} className="carousel-container">
                <Carousel.Item interval={null}>
                  <div className="carousel-image-container">
                    <img
                      className="d-block w-100"
                      src={product.img[0]}
                      alt="First slide"
                    />
                  </div>
                </Carousel.Item>
                <Carousel.Item interval={null}>
                  <div className="carousel-image-container">
                    <img
                      className="d-block w-100"
                      src={product.img[1]}
                      alt="Second slide"
                    />
                  </div>
                </Carousel.Item>
                <Carousel.Item interval={null}>
                  <div className="carousel-image-container">
                    <img
                      className="d-block w-100"
                      src={product.img[2]}
                      alt="Third slide"
                    />
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>
            <div>
              <h5 className="text-center">Categoría: {product.category}</h5>
            </div>
            <Card.Title className="my-3 text-center">
              {product.tittle}
            </Card.Title>
            <Card.Text className="text-center">{product.description}</Card.Text>
            {price === 0 ? (
              <div className="d-flex justify-content-around">
                <div>
                  {product.offerPrice ? (
                    <div className="row">
                      <p className="common-price">
                        Precio anterior: ${product.price}
                      </p>
                      <p className="offer-price">
                        Precio en oferta: ${product.offerPrice}
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="offer-price">Precio: ${product.price}</p>
                    </>
                  )}
                </div>
                <p>Stock: {product.quantity}</p>
              </div>
            ) : (
              price === 1 && (
                <Box className="d-flex">
                  <Form className="row" onSubmit={handleSubmit(handleChangePrice)}>
                    <div className="d-flex row">
                      <div className='col-6'>
                        <Form.Label htmlFor="lastPrice">
                          Precio Anterior
                        </Form.Label>
                        <Form.Control
                          id="lastPrice"
                          size="sm"
                          type="text"
                          name="price"
                          placeholder={product.price}
                          value={priceInOffer.price}
                          className="mb-1"
                          {...register("price", {
                            required: false,
                            maxLength: 6,
                            minLength: 1,
                            pattern: validationsFields.price,
                          })}
                            onChange={(e) => {
                              handleChange(e);
                              setValue('price', e.target.value)  
                            }
                            }
                        />
                        {errors.price?.type === "maxLength" && (
                          <p className="edit-alert">
                            {messages.prodPriceMaxLengthError}
                          </p>
                        )}
                        {errors.price?.type === "minLength" && (
                          <p className="edit-alert">
                            {messages.prodPriceMinLengthError}
                          </p>
                        )}
                        {errors.price?.type === "pattern" && (
                          <p className="edit-alert">
                            {messages.prodPriceMatchError}
                          </p>
                        )}
                      </div>
                      <div className='col-6'>
                        <Form.Label htmlFor="offerPrice">
                          Precio de oferta
                        </Form.Label>
                          <Form.Control
                          id='offerPrice'
                          size="sm"
                          type="text"
                          name="offerPrice"
                          value={priceInOffer.offerPrice}
                          placeholder={product.offerPrice}
                          {...register("offerPrice", {
                            required: true,
                            maxLength: 6,
                            minLength: 1,
                            pattern: validationsFields.price,
                          })}
                            onChange={(e) => {handleChange(e);
                            setValue('offerPrice', e.target.value)}}
                        />
                        {errors.offerPrice?.type === "required" && (
                          <p className="edit-alert">
                            {messages.prodOfferPriceError}
                          </p>
                        )}
                        {errors.offerPrice?.type === "maxLength" && (
                          <p className="edit-alert">
                            {messages.prodPriceMaxLengthError}
                          </p>
                        )}
                        {errors.offerPrice?.type === "minLength" && (
                          <p className="edit-alert">
                            {messages.prodPriceMinLengthError}
                          </p>
                        )}
                        {errors.offerPrice?.type === "pattern" && (
                          <p className="edit-alert">
                            {messages.prodPriceMatchError}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-center my-1">
                      <Button type="submit" variant="success">
                        Poner en oferta
                      </Button>
                    </div>
                  </Form>
                </Box>
              )
            )}

            <div>
              <Box className="justify-content-around d-flex">
                <FormControlLabel
                  label={spotlight ? "Destacado" : "No destacado"}
                  control={
                    <Switch
                      color="warning"
                      checked={spotlight}
                      onClick={handleSpotlightProd}
                      onChange={handleSpotlightProd}
                    />
                  }
                />
                <Snackbar
                  open={openNotification}
                  autoHideDuration={2000}
                  onClose={() => setOpenNotification(false)}
                >
                  <Alert severity={spotlight ? "success" : "warning"}>
                    {notificationMessage}
                  </Alert>
                </Snackbar>
                <FormControlLabel
                  label={!prodStatus ? "Habilitado" : "Desabilitado"}
                  control={
                    <Switch
                      color="warning"
                      checked={!prodStatus}
                      onClick={handleProdStatus}
                      onChange={setProdStatus}
                    />
                  }
                />
                <Snackbar
                  open={openStatusNotification}
                  autoHideDuration={2000}
                  onClose={() => setOpenStatusNotification(false)}
                >
                  <Alert severity={!prodStatus ? "success" : "warning"}>
                    {ableMessage}
                  </Alert>
                </Snackbar>
              </Box>
            </div>
            <div>
              {price === 0 ? (
                <Button
                  className="container mb-2"
                  variant="success"
                  onClick={() => setPrice(1)}
                >
                  Poner en oferta
                </Button>
              ) : (
                <Button
                  className="container mb-2"
                  variant="danger"
                  onClick={() => setPrice(0)}
                >
                  Cancelar
                </Button>
              )}
            </div>
            <Button className="container" variant="warning">
              Editar producto
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AdminProdCard
