import axiosConfig from '../utils/axiosConfig';
import { endpoints } from '../utils/endpointsConfig';

export const addProducts =async (user) =>{
  try {
    const addOneUser = await axiosConfig({
      url: `${endpoints.addproduct}`,
      method: 'POST',
      data: user
    })
    return addOneUser
  } catch (error) {
    console.error(error);
  }
}

export const getProductsById = async(id) =>{
  try {
    const getOneUsersId = await axiosConfig({
      url: `${endpoints.getproductid}/${id}`,
      method: 'GET',
    })
    return getOneUsersId
  } catch (error) {
    console.error(error);
  }

}

export const getProducts = async () => {
    try {
      const getAllUsers = await axiosConfig({
        url: `${endpoints.getallpoduct}`,
        method: 'GET',
      })
      return getAllUsers
    } catch (error) {
      console.error(error);
    }

}

export const editProducts = async (_id, datas) => {
  try {
    const editOneUser = await axiosConfig({
      url: `${endpoints.editproduct}/${_id}`,
      method: 'PATCH',
      data: datas
    })
    return editOneUser
  } catch (error) {
    console.error(error);
  }

}

export const deleteProducts = async (_id) => {
  try {
    const deleteOneUser = await axiosConfig({
      url: `${endpoints.deleteproduct}/${_id}`,
      method: 'DELETE',
    })
    return deleteOneUser
  } catch (error) {
    console.error(error);
  }

}