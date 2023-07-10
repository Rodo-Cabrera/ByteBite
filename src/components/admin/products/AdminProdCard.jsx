import { Switch, Box, FormControlLabel } from '@mui/material';
import React, { useState, useContext } from 'react'
import { userContext } from '../../../context/AuthContext';
import { Card, Button, Container, Carousel, Form, Row, Col } from 'react-bootstrap'
import { ableProduct, disableProduct, editProd, offerProd, spotlightProduct, unOfferProd, unSpotlightProduct } from '../../../API/Api';
import { useForm } from 'react-hook-form';
import { validationsFields, isValidCategory } from '../../../utils/validation';
import { messages } from '../../../utils/messages';
import Swal from 'sweetalert2';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { alertSuccess } from '../../../utils/alertCustom';


const AdminProdCard = ({ product, updateProductState}) => {

  const { token } = useContext(userContext);

  const [spotlight, setSpotlight] = useState(product.spotlight);

  const [prodStatus, setProdStatus] = useState(product.disabled);

  const [offer, setOffer] = useState(product.offer);
  
  const [editProdCard, setEditProdCard] = useState(0);

   const [prodEditData, setProdEditData] = useState({
     tittle: product.tittle,
     description: product.description,
     category: product.category,
     price: product.price,
     offerPrice: product.offerPrice
   });

  const { enqueueSnackbar } = useSnackbar();



  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  
 const handleChange = (e) => {
   setProdEditData((prev) => ({
     ...prev,
     [e.target.name]: e.target.value,
   }));
 };

  




  const handleOfferProd = async (prodData) => {
    if (token) {
      try {
        if (offer) {         
          await unOfferProd(token, product._id);
          setProdEditData((prev) => ({
            ...prev,
            offerPrice: null
          }));
          updateProductState(product._id, prodData)
        } else {
          await offerProd(token, product._id)               
        }
        await updateProductState(product._id, { offer: !offer });
        setOffer(!offer); 
        const message = offer
          ? "Producto SACADO de oferta"
          : "Producto PUESTO en oferta";
        enqueueSnackbar(`${message}`, {
          variant: `${offer ? "warning" : "success"}`,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  const handleEditProduct = async (prodData) => {
          
    const response = () => editProd(token, product._id, prodEditData);
    if (token) {
      try {
        if (offer && parseInt(prodEditData.offerPrice) >= parseInt(prodEditData.price)) {
           return Swal.fire({
             icon: "error",
             title: "Error en la oferta",
             text: "El precio en oferta no puede ser mayor al precio actual",
           });
        } else {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success mx-1",
              cancelButton: "btn btn-danger mx-1",
            },
            buttonsStyling: false,
          });

          swalWithBootstrapButtons
            .fire({
              title: 'Esperando Confirmación',
              text: `Estás seguro que quieres editar el producto "${product.tittle}"?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Sí, editar",
              cancelButtonText: "No, cancelar!",
              reverseButtons: true,
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                await response();
                await updateProductState(product._id, prodData); 
                swalWithBootstrapButtons.fire(
                  "Edición exitosa!",
                  `El producto "${product.tittle}" se ha editado correctamente!`,
                  "success"
                );
              } else if (             
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  "Cancelado",
                  `El producto "${product.tittle}" continuará como antes`,
                  "error"
                );
              }
            });
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
        await updateProductState(product._id, { spotlight: !spotlight });
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
        await updateProductState(product._id, { disabled: !prodStatus });
        const message = !prodStatus ? 'Producto DESABILITADO con éxito' : 'Producto HABILITADO con éxito';
        enqueueSnackbar(`${message}`, {
          variant: `${!prodStatus ? 'warning' : 'success'}`})
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <>
      {editProdCard === 0 ? (
        <div className="admin-prod-card">
          <Row className="admin-row-card">
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
              <Col>
                <Card className="prod-edit-card">
                  <Card.Body>
                    <div>
                      <Carousel
                        fade
                        interval={null}
                        className="carousel-container"
                      >
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
                      <h5 className="text-center">
                        Categoría: {product.category}
                      </h5>
                    </div>
                    <Card.Title className="my-3 text-center">
                      {product.tittle}
                    </Card.Title>
                    <Card.Text className="text-center">
                      {product.description}
                    </Card.Text>

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
                            <p className="offer-price">
                              Precio: ${product.price}
                            </p>
                          </>
                        )}
                      </div>
                      <p>Stock: {product.quantity}</p>
                    </div>
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
                    <Button
                      className="container"
                      variant="warning"
                      onClick={() => setEditProdCard(1)}
                    >
                      Editar producto
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Container>
          </Row>
        </div>
      ) : (
        editProdCard === 1 && (
          <div className="admin-prod-card">
            <Row className="admin-row-card">
              <div className="icon-container">
                <Card.Header>
                  <div>
                    <Card.Img
                      variant="top"
                      src={product.icon}
                      className="prod-card-icon"
                    />
                  </div>
                </Card.Header>
              </div>
              <Container>
                <Col>
                  <Card className="prod-edit-card">
                    <Card.Body>
                      <div>
                        <Carousel
                          fade
                          interval={null}
                          className="carousel-container"
                        >
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
                      <Form onSubmit={handleSubmit(handleEditProduct)}>
                        <div>
                          <Form.Group
                            name="category"
                            controlId="formGridCategory"
                            {...register("category", {
                              required: false,
                              validate: isValidCategory,
                            })}
                            onChange={handleChange}
                          >
                            <div className="text-center">
                              <Form.Label>Editar Categoría</Form.Label>

                              <Form.Select
                                defaultValue={product.category}
                                onChange={handleChange}
                                name="category"
                              >
                                <option value="">Elige una categoría</option>
                                <option value="RAM">Memoria RAM</option>
                                <option value="VGA">Placa de video</option>
                                <option value="MONITOR">Monitor</option>
                                <option value="MOUSE">Mouse</option>
                                <option value="KEYBOARD">Teclado</option>
                                <option value="COOLER">Cooler</option>
                                <option value="AUDIO">Audio</option>
                                <option value="GAMER-CHAIR">
                                  Sillón Gamer
                                </option>
                                <option value="PROCESSOR">Procesador</option>
                                <option value="CASE">Gabinete</option>
                                <option value="PWSUPPLY">Fuente</option>
                                <option value="MOTHERBOARD">Placa madre</option>
                                <option value="PC">PC Completa</option>
                              </Form.Select>
                              <div className="small">
                                {errors.category?.type === "validate" && (
                                  <p className="alertas">
                                    {messages.categoryError}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Form.Group>
                          <div className="text-center">
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label>
                                Editar título del producto
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder={product.tittle}
                                defaultValue={product.tittle}
                                name="tittle"
                                {...register("tittle", {
                                  required: false,
                                  maxLength: 40,
                                  minLength: 5,
                                })}
                                onChange={handleChange}
                              />
                              <div className="small">
                                {errors.tittle?.type === "required" && (
                                  <p className="alertas">
                                    {messages.prodError}
                                  </p>
                                )}
                                {errors.tittle?.type === "maxLength" && (
                                  <p className="alertas">
                                    {messages.prodMaxLengthError}
                                  </p>
                                )}
                                {errors.tittle?.type === "minLength" && (
                                  <p className="alertas">
                                    {messages.prodMinLengthError}
                                  </p>
                                )}
                              </div>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="text-center">
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>
                              Editar descripción del producto
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder={product.description}
                              defaultValue={product.description}
                              name="description"
                              {...register("description", {
                                required: false,
                                maxLength: 1000,
                                minLength: 20,
                              })}
                              onChange={handleChange}
                            />
                            <div className="small">
                              {errors.description?.type === "required" && (
                                <p className="alertas">
                                  {messages.prodDescError}
                                </p>
                              )}
                              {errors.description?.type === "maxLength" && (
                                <p className="alertas">
                                  {messages.prodMaxLengthError}
                                </p>
                              )}
                              {errors.description?.type === "minLength" && (
                                <p className="alertas">
                                  {messages.prodMinLengthError}
                                </p>
                              )}
                            </div>
                          </Form.Group>
                        </div>

                        <div className="d-flex justify-content-around text-center">
                          <div className="col-6">
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label>Precio del producto</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder={product.price}
                                defaultValue={product.price}
                                name="price"
                                {...register("price", {
                                  required: false,
                                  maxLength: 6,
                                  minLength: 1,
                                  pattern: validationsFields.price,
                                })}
                                onChange={handleChange}
                              />
                              <div className="small">
                                {errors.price?.type === "required" && (
                                  <p className="alertas">
                                    {messages.prodPriceError}
                                  </p>
                                )}

                                {errors.price?.type === "maxLength" && (
                                  <p className="alertas">
                                    {messages.prodPriceMaxLengthError}
                                  </p>
                                )}

                                {errors.price?.type === "minLength" && (
                                  <p className="alertas">
                                    {messages.prodPriceMinLengthError}
                                  </p>
                                )}

                                {errors.price?.type === "pattern" && (
                                  <p className="alertas">
                                    {messages.prodPriceMatchError}
                                  </p>
                                )}
                              </div>
                            </Form.Group>
                          </div>
                          {offer ? (
                            <div className='col-6'>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Precio de oferta</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder={product.offerPrice}
                                  defaultValue={product.offerPrice}
                                  name="offerPrice"
                                  {...register("offerPrice", {
                                    required: true,
                                    maxLength: 6,
                                    minLength: 1,
                                    pattern: validationsFields.price,
                                  })}
                                  onChange={handleChange}
                                />
                                <div className="small">
                                  {errors.offerPrice?.type === "required" && (
                                    <p className="alertas">
                                      {messages.prodOfferPriceError}
                                    </p>
                                  )}

                                  {errors.offerPrice?.type === "maxLength" && (
                                    <p className="alertas">
                                      {messages.prodPriceMaxLengthError}
                                    </p>
                                  )}

                                  {errors.offerPrice?.type === "minLength" && (
                                    <p className="alertas">
                                      {messages.prodPriceMinLengthError}
                                    </p>
                                  )}

                                  {errors.offerPrice?.type === "pattern" && (
                                    <p className="alertas">
                                      {messages.prodPriceMatchError}
                                    </p>
                                  )}
                                </div>
                              </Form.Group>
                            </div>
                          ) : (
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label>Precio de oferta</Form.Label>
                              <Form.Control
                                type="text"
                                disabled
                                placeholder={product.offerPrice}
                                defaultValue={product.offerPrice}
                                value={product.offerPrice}
                                name="offerPrice"
                                onChange={handleChange}
                              />
                            </Form.Group>
                          )}
                        </div>
                        <div>
                          <Box className="justify-content-around d-flex">
                            <FormControlLabel
                              label={offer ? "En oferta" : "Común"}
                              control={
                                <Switch
                                  color="warning"
                                  checked={offer}
                                  onClick={handleOfferProd}
                                  onChange={setOffer}
                                />
                              }
                            />
                          </Box>
                        </div>
                        <div className="d-flex justify-content-around">
                          <div className="container">
                            <Button
                              className="container"
                              variant="danger"
                              onClick={() => setEditProdCard(0)}
                            >
                              Cancelar
                            </Button>
                          </div>
                          <div className="container">
                            <Button
                              className="container"
                              variant="warning"
                              type="submit"
                            >
                              Editar producto
                            </Button>
                          </div>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Container>
            </Row>
          </div>
        )
      )}
    </>
  );
}

export default AdminProdCard
