import React from 'react'
import { classNames } from './utils/classes';
import './styles/sideBarItem.scss';

const SideBarItem = ({item, isOpen}) => {
  
  
  
  return (
    <div className="SideBarItem">
      <a href={item.url}>
        <div className={classNames("itemContent", isOpen ? "" : " collapsed")}>
          <div className="icon">
            <item.icon size="25" />
          </div>
          <span className="label mx-5">{item.label}</span>
        </div>
      </a>
      {!isOpen ? <div className="sideTooltip"> {item.label} </div> : ""}
    </div>
  );
}

export default SideBarItem
