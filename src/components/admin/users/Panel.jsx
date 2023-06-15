import React, {useState, useEffect, useContext} from 'react'
import './styles/userStyle.css'
import { getOneUser } from '../../../API/Api'
import { Accordion, Button } from 'react-bootstrap'

const Panel = (props) => {

  const { id, token } = props;

  const [actualUser, setActualUser] = useState([]);

  
  useEffect(() => {
    
    const resp = async () => {
      if (token) {
        await getOneUser(token, id)
          .then((response) => {
            setActualUser([response.data]);
          })
          .catch((error) => console.log(error))
      }
    };
        resp()
  }, [id, token])
  

  return (
    <div className="panel">
      <div className="user">
        {actualUser?.map((user) => (
          <div className="my-3">
            <img className="avatar" src={user.avatar} alt={user.avatar} />
            <h1>{user.name}</h1>
            <p>{user.role}</p>
          </div>
        ))}
      </div>

      <div className="userOptions mx-1">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Usuarios</Accordion.Header>
            <Accordion.Body className="row">
              <Button>Todos los usuarios</Button>
              <Button>Activos</Button>
              <Button>Baneados</Button>
              <Button>Administradores</Button>
              <Button>Propietarios</Button>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="my-2">
            <Accordion.Header>Productos</Accordion.Header>
            <Accordion.Body className="row">
              <Button>Todos los productos</Button>
              <Button>Ofertas</Button>
              <Button>Desabilitados</Button>
              <Accordion>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Categorías</Accordion.Header>
                  <Accordion.Body className='row'>
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
    </div>
  );
}

export default Panel
