import React, { useState } from 'react'
import './styles/userStyle.css'
import { Accordion, Button, Col, Row, Container } from 'react-bootstrap'
import { useAuth } from '../../../hooks/useAuth'
import UserList from './UserList'
import AdminUsers from './AdminUsers'
import BannedUsers from './BannedUsers'
import ActiveUsers from './ActiveUsers'
import AllProd from '../products/AllProd'
import UsersDatatable from './UsersDatatable'

const Panel = () => {


  const { actualUser } = useAuth();

  const [panel, setPanel] = useState(1);
  

  return (
    <>
      <div className="d-flex row">
        <div className="panel container">
          <div className="admin-container">
            <Col className="panel-col">
              <div className="user my-3 admin-container">
                {actualUser.length > 0 && (
                  <div className="my-3">
                    <img
                      className="avatar"
                      src={actualUser[0].avatar}
                      alt={actualUser[0].avatar}
                    />
                    <h1>{actualUser[0].name}</h1>
                    <p>{actualUser[0].role}</p>
                  </div>
                )}
              </div>
              <Row>
                <div className="userOptions mx-1 my-3">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Usuarios</Accordion.Header>
                      <Accordion.Body className="row">
                        <Button onClick={() => setPanel(1)}>
                          Todos los usuarios
                        </Button>
                        <Button onClick={() => setPanel(4)}>Activos</Button>
                        <Button onClick={() => setPanel(3)}>Baneados</Button>
                        <Button onClick={() => setPanel(2)}>
                          Administradores
                        </Button>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className="my-2">
                      <Accordion.Header>Productos</Accordion.Header>
                      <Accordion.Body className="row">
                        <Button onClick={() => setPanel(5)}>
                          Todos los productos
                        </Button>
                        <Button>Ofertas</Button>
                        <Button>Desabilitados</Button>
                        <Accordion>
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>Categorías</Accordion.Header>
                            <Accordion.Body className="row">
                              <Button>Memorias Ram</Button>
                              <Button>Placas de Video</Button>
                              <Button>Monitores</Button>
                              <Button>Mouses</Button>
                              <Button>Teclados</Button>
                              <Button>Coolers</Button>
                              <Button>Audio</Button>
                              <Button>Sillones gamer</Button>
                              <Button>Procesadores</Button>
                              <Button>Gabinetes</Button>
                              <Button>Fuentes</Button>
                              <Button>Placas madre</Button>
                              <Button>PC Completas</Button>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Row>
            </Col>
          </div>
        </div>
      </div>
      <div className="container-fluid mb-5">
        <Col className="panel-col">
          <div className="d-flex flex-column">
            {panel === 1 ? (
              <div>
                <UsersDatatable/>
                {/* <div className="list-tittle">
                  <h1 className="text-center">Todos los usuarios</h1>
                </div>
                <div className="right-container">
                  <UserList />
                </div> */}
              </div>
            ) : panel === 2 ? (
              <div>
                <div className="list-tittle">
                  <h1 className="text-center">Administradores</h1>
                </div>
                <div className="right-container">
                  <AdminUsers />
                </div>
              </div>
            ) : panel === 3 ? (
              <div>
                <div className="list-tittle">
                  <h1 className="text-center">Usuarios baneados</h1>
                </div>
                <div className="right-container">
                  <BannedUsers />
                </div>
              </div>
            ) : panel === 4 ? (
              <div>
                <div className="list-tittle">
                  <h1 className="text-center">Usuarios activos</h1>
                </div>
                <div className="right-container">
                  <ActiveUsers />
                </div>
              </div>
            ) : panel === 5 ? (
              <div>
                 <div className='list-tittle'>
                       <h1 className='text-center' >Todos los productos</h1>
                  </div> 
                  <div>
                     <AllProd />
                 </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </div>
    </>
  );
}

export default Panel
