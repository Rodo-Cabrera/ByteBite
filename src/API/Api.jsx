import axios from 'axios';
import { endPoints, productEndpoints } from '../utils/endpointsConfig';
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
    return await axios.post(`${DBURL}${productEndpoints.uploadImage}`, imgForm)
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
}