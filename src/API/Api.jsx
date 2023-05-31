import axios from 'axios';
import { endPoints, productEndpoints, endPointAdmin } from '../utils/endpointsConfig';
const DBURL = import.meta.env.VITE_URL_BASE;

export const createProduct = async (prodData) => {
  try {
    return await axios.post(`${DBURL}${endPoints.createProduct}`, prodData)
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (imgForm) => {
  try {
    return await axios.post(`${DBURL}${productEndpoints.uploadImage}`, imgForm,
      {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    
  } catch (error) {
    console.log(error);
  }
};

export const uploadIcon = async (iconForm) => {
  try {
    return await axios.post(`${DBURL}${productEndpoints.uploadIcon}`, iconForm)
  } catch (error) {
    console.log(error);
  }
};


export const getAllusers = async (token) => {
  try {
    return await axios.get(`${DBURL}${endPointAdmin.getAllUsers}`, {
      headers: {
        "access-token": token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};