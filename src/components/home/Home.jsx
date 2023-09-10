import React, { useState } from 'react'
import Landing from './landing/Landing';
import './styles/homeStyle.css'
import SideBar from './ui/SideBar';
import Shop from '../shop/Shop';
import {FaMemory, FaGamepad} from 'react-icons/fa'
import {FaComputer} from 'react-icons/fa6'
import {GiProcessor, GiSoundWaves, GiPowerLightning} from 'react-icons/gi'
import {FiMonitor} from 'react-icons/fi'
import {BsMouse, BsFillKeyboardFill, BsMotherboard} from 'react-icons/bs'
import {PiThermometerColdFill, PiOfficeChairFill, PiComputerTowerDuotone} from 'react-icons/pi'

const Home = () => {


  const items = [
    {
      id: "1",
      label: "Memorias Ram",
      icon: FaMemory,
      url: "/",
    },
    {
      id: "2",
      label: "Game Pads",
      icon: FaGamepad,
      url: "/",
    },
    {
      id: "3",
      label: "Procesadores",
      icon: GiProcessor,
      url: "/",
    },
    {
      id: "4",
      label: "Monitores",
      icon: FiMonitor,
      url: "/",
    },
    {
      id: "5",
      label: "Mouses",
      icon: BsMouse,
      url: "/",
    },
    {
      id: "6",
      label: "Teclados",
      icon: BsFillKeyboardFill,
      url: "/",
    },
    {
      id: "7",
      label: "Refrigeración",
      icon: PiThermometerColdFill,
      url: "/",
    },
    {
      id: "8",
      label: "Audio",
      icon: GiSoundWaves,
      url: "/",
    },
    {
      id: "9",
      label: "Sillones",
      icon: PiOfficeChairFill,
      url: "/",
    },
    {
      id: "10",
      label: "Gabinetes",
      icon: PiComputerTowerDuotone,
      url: "/",
    },
    {
      id: "11",
      label: "Fuentes",
      icon: GiPowerLightning,
      url: "/",
    },
    {
      id: "12",
      label: "Placas Madre",
      icon: BsMotherboard,
      url: "/",
    },
    {
      id: "13",
      label: "PC Completa",
      icon: FaComputer,
      url: "/",
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className='container'>
      <div className='sideBar-container'>
        <SideBar items={items} isOpen={isOpen} handleClick={handleClick}/>
      </div>
      <div className={`homeContainer ${isOpen ? 'opened' : ''}`}>
        <div className="carouselContainer">
          <p>Destacado de la semana</p>
          <Landing />
        </div>
        <div>         
          <Shop />           
      </div>
      </div>  
    </div>
  );
};



export default Home