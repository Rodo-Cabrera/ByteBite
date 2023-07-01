import { Switch, Box, FormControlLabel, Snackbar, Alert } from '@mui/material';
import React, { useState, useContext } from 'react'
import { userContext } from '../../../context/AuthContext';
import { Card, Button, Container, Carousel } from 'react-bootstrap'
import { ableProduct, disableProduct, spotlightProduct, unSpotlightProduct } from '../../../API/Api';


const AdminProdCard = ({ product, updateProductState}) => {

  const { token } = useContext(userContext);

  const [spotlight, setSpotlight] = useState(product.spotlight);

  const [prodStatus, setProdStatus] = useState(product.disabled);

  const [openNotification, setOpenNotification] = useState(false);

  const [openStatusNotification, setOpenStatusNotification] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState('');

  const [ableMessage, setAbleMessage] = useState('')



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
        if (!prodStatus) {
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
            <div className="d-flex justify-content-around">
              <div>
                {product.offerPrice ? (
                  <div className='row'>
                    <p className='common-price'>Precio anterior: ${ product.price }</p>
                    <p className='offer-price'>Precio en oferta: ${product.offerPrice}</p>
                  </div>
                ) : (
                  <>
                    <p className='offer-price'>Precio: ${product.price}</p>
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
