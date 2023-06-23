import axios from 'axios';
import { endPoints, productEndpoints, endPointAdmin, endPointUsers } from '../utils/endpointsConfig';
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

export const getAdminUsers = async (token) => {
  try {
    return await axios.get(`${DBURL}${endPointAdmin.getAdminUsers}`, {
      headers: {
        "access-token": token
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export const getBannedUsers = async (token) => {
  try {
    return await axios.get(`${DBURL}${endPointAdmin.getBannedUsers}`, {
      headers: {
        "access-token": token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getActiveUsers = async (token) => {
  try {
    return await axios.get(`${DBURL}${endPointAdmin.getActiveUsers}`, {
      headers: {
        "access-token": token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};



export const getOneUser = async (token, id) => {
  try {
    return await axios.get(`${DBURL}${endPointUsers.getUser}/${id}`, {
      headers: {
        "access-token": token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (token) => {
  try {
    return await axios.patch(`${DBURL}${endPointAdmin.editUser}`, {}, {
      headers: {
        "access-token": token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const disableUser = async (token, id) => {
  try {
    return await axios.patch(`${DBURL}${endPointAdmin.disableUser}/${id}`,{}, {
      headers: {
        "access-token": token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const ableUser = async (token, id) => {
  try {
    return await axios.patch(
      `${DBURL}${endPointAdmin.ableUser}/${id}`,
      {},
      {
        headers: {
          "access-token": token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const adminUser = async (token, id) => {
  try {
    return await axios.patch(
      `${DBURL}${endPointAdmin.adminUser}/${id}`,
      {},
      {
        headers: {
          "access-token": token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const clientUser = async (token, id) => {
  try {
    return await axios.patch(
      `${DBURL}${endPointAdmin.clientUser}/${id}`,
      {},
      {
        headers: {
          "access-token": token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};