import axiosConfig from '../utils/clientAxios';
import { endpoints } from '../utils/endpointsConfig';


export const addUsers =async (user) =>{
    try {
      const createUser = await axiosConfig({
        url: `${endpoints.register}`,
        method: 'POST',
        data: user
      })
      return createUser
    } catch (err) {
      console.error(err.message);
    }
}

export const getUser = async (user) => {
    try {
      const getOneUser = await axiosConfig({
        url: `${endpoints.login}`,
        method: 'POST',
        data: user
      })
      return getOneUser
    } catch (err) {
      console.error(err.message);
    }

}
