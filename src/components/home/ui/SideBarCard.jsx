import React from 'react'
import { classNames } from './utils/classes';
import { useAuth } from '../../../hooks/useAuth';
import './styles/sideBarCard.scss'

const SideBarCard = ({ isOpen }) => {
  
  const { actualUser } = useAuth();


  return (
    <div>
      {actualUser.map((user) => (
        <div className="sideBarCard">
          <img className="profile" src={user.avatar} width="100%" />
          <div className={classNames("profileInfo", isOpen ? "" : " collapsed")}>
            <div className="name">{user.name}</div>
            <div className="title">{user.role}</div>
            <div className="url">
              <a href={user.email}>Perfil</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SideBarCard
