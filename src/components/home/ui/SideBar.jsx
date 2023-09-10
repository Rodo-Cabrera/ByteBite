import React, { useState } from 'react'
import { classNames } from './utils/classes';
import { VscMenu } from "react-icons/vsc";
import SideBarCard from './SideBarCard';
import SideBarItem from './SideBarItem';
import './styles/sideBar.scss'

const SideBar = ({items, card, isOpen, handleClick}) => {


  return (
    <div className={classNames('sideBarMenu', isOpen ? " expanded" : " collapsed")}>
      <div className='menuButton'>
        <button  className='burgerButton' onClick={handleClick}>
          <VscMenu />
        </button>
      </div>
      <SideBarCard card={card} isOpen={isOpen} />
      {
        items.map(item => (
          <SideBarItem key={item.id} item={item} isOpen={isOpen} />
        ))
      }
    </div>
  )
}

export default SideBar
