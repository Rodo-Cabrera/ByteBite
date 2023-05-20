import axiosConfig from '../utils/axiosConfig';
import { endpoints } from '../utils/endpointsConfig';

export const addUsers =async (user) =>{
  try {
    const addOneUser = await axiosConfig({
      url: `${endpoints.adduser}`,
      method: 'POST',
      data: user
    })
    return addOneUser
  } catch (error) {
    console.error(error);
  }
}

export const getUserById = async(id) =>{
  try {
    const getOneUsersId = await axiosConfig({
      url: `${endpoints.getuserid}/${id}`,
      method: 'GET',
    })
    return getOneUsersId
  } catch (error) {
    console.error(error);
  }

}

export const getUsers = async () => {
    try {
      const getAllUsers = await axiosConfig({
        url: `${endpoints.getalluser}`,
        method: 'GET',
      })
      return getAllUsers
    } catch (error) {
      console.error(error);
    }

}

export const editUsers = async (_id, datas) => {
  try {
    const editOneUser = await axiosConfig({
      url: `${endpoints.edituser}/${_id}`,
      method: 'PATCH',
      data: datas
    })
    return editOneUser
  } catch (error) {
    console.error(error);
  }

}

export const deleteUsers = async (_id) => {
  try {
    const deleteOneUser = await axiosConfig({
      url: `${endpoints.deleteuser}/${_id}`,
      method: 'DELETE',
    })
    return deleteOneUser
  } catch (error) {
    console.error(error);
  }

}