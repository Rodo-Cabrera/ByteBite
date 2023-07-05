import { Switch, Box, FormControlLabel, Snackbar, Alert } from '@mui/material';
import React, { useState, useContext } from 'react'
import { userContext } from '../../../context/AuthContext';
import { Card, Button, Container, Carousel, Form } from 'react-bootstrap'
import { ableProduct, disableProduct, editProd, offerProd, spotlightProduct, unSpotlightProduct } from '../../../API/Api';
import { useForm } from 'react-hook-form';
import { validationsFields } from '../../../utils/validation';
import { messages } from '../../../utils/messages';
import Swal from 'sweetalert2';
import { useSnackbar } from 'notistack';


const AdminProdCard = ({ product, updateProductState}) => {

  const { token } = useContext(userContext);

  const [spotlight, setSpotlight] = useState(product.spotlight);

  const [prodStatus, setProdStatus] = useState(product.disabled);

  const [price, setPrice] = useState(0);

  const { enqueueSnackbar } = useSnackbar();


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [priceInOffer, setPriceInOffer] = useState({
    price: product.price,
    offerPrice: product.offerPrice || 0,
  })
  


  const handleChange = (e) => {
    setPriceInOffer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangePrice = async (prodData) => {
    console.log(priceInOffer);
    if (token) {
      try {
        if (parseInt(priceInOffer.offerPrice) >= parseInt(priceInOffer.price)) {
          return (
            Swal.fire({
              icon: "error",
              title: "Error en la oferta",
              text: "El precio de lista no puede ser menor que el de oferta",          
            })
          )
        } else {
          await editProd(token, product._id, priceInOffer);
          setPriceInOffer({ price: priceInOffer.price });
          updateProductState(product._id, prodData);
        }
      } catch (error) {
        console.log(error);
      }
    }  
  }

  const handleChangeOfferPrice = async (prodData) => {
    if (token) {
      try {
        if (parseInt(priceInOffer.offerPrice) >= parseInt(priceInOffer.price)) {
          return (
            Swal.fire({
              icon: "error",
              title: "Error en la oferta",
              text: "El precio en oferta no puede ser mayor al de lista",
            })
          )
        } else if (priceInOffer.offerPrice !== 0) {
          await editProd(token, product._id, priceInOffer);
          await offerProd(token, product._id);
          setPriceInOffer({ offerPrice: priceInOffer.offerPrice });
          updateProductState(product._id, prodData);
        }
      } catch (error) {
        console.log(error);
        }
      } 
  }

  const unOfferProd = async (prodData) => {
    if (token) {
      try {
        await unOfferProd(token, product._id);
        setPriceInOffer({offerPrice: 0})
        await editProd(token, product._id, priceInOffer);
        updateProductState(product._id, {offer: !offer})
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
        enqueueSnackbar(`${message}`, {
          variant: `${spotlight ? "warning" : "success"}`,         
        });
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
        enqueueSnackbar(`${message}`, {
          variant: `${!prodStatus ? 'warning' : 'success'}`})
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
                <Box className="d-flex justify-content-around">
                  <Form
                    className="row"
                    onSubmit={handleSubmit(handleChangePrice)}
                  >
                    <div className="col-12">
                      <div>
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
                          onChange={handleChange}
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
                      <div className="text-center my-1">
                        <Button type="submit" variant="warning">
                          Modificar precio
                        </Button>
                      </div>
                    </div>
                  </Form>
                  <Form onSubmit={handleSubmit(handleChangeOfferPrice)}>
                    <div className="col-12 container">
                      <div className="col-12">
                        <Form.Label htmlFor="offerPrice">
                          Precio de oferta
                        </Form.Label>
                        <Form.Control
                          id="offerPrice"
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
                          onChange={handleChange}
                        />
                        <div className="d-flex small text-center">
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
                              </p>)
                          } 
                        </div>
                      </div>
                      <div className="text-center my-1">
                        <Button type="submit" variant="success">
                          Poner en oferta
                        </Button>
                      </div>
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
                      onChange={setSpotlight}
                    />
                  }
                />
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
              </Box>
            </div>
            <div>
              {price === 0 ? (
                <Button
                  className="container mb-2"
                  variant="success"
                  onClick={() => setPrice(1)}
                >
                  Modificar precio
                </Button>
              ) : (
                <>
                  {product.offer ? (
                    <div className="d-flex justify-content-around mb-2">
                      <Button variant="danger" onClick={() => setPrice(0)}>
                        Cancelar
                      </Button>
                      <Button variant="danger">Quitar oferta</Button>
                    </div>
                  ) : (
                    <Button
                      variant="danger"
                      onClick={() => setPrice(0)}
                      className="container mb-2"
                    >
                      Cancelar
                    </Button>
                  )}
                </>
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
