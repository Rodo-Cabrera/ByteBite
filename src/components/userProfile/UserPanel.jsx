import React from 'react'
import './styles/userPanel.css'
import { Image, Button } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';



const UserPanel = () => {


  const {actualUser} = useAuth()


  return (
    <>
      {actualUser.length > 0 && (
        <div>
          <Image
            src={actualUser[0].avatar}
            alt={actualUser[0].avatar}
            roundedCircle
            className="userAvatar my-4 user"
          />
          <div className="userInfo mx-3">
            <p className='user'>{actualUser[0].role}</p>
            <h3>
              {actualUser[0].name} {actualUser[0].lastName}
            </h3>
            <h5>Edad: {actualUser[0].age} años</h5>
            <h5>Email: {actualUser[0].email}</h5>
            <h6>{actualUser[0].disabled === false && <p>Usuario activo</p>}</h6>
            <h6>
              {actualUser[0].disabled === true && <p>Usuario bloqueado</p>}
            </h6>
          </div>
          <Button className="btnEdit btn-outline-success user">
            Editar perfil
          </Button>
        </div>
      )}
    </>
  );
}

export default UserPanel
