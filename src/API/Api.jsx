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

export const getAllProd = async (token) => {
  try {
    return await axios.get(`${DBURL}${endPointAdmin.getProd}`, {
      headers: {
        "access-token": token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const spotlightProduct = async (token, id) => {
  try {
    return await axios.patch(`${DBURL}${endPointAdmin.spotlightProd}/${id}`, {}, {
      headers: {
        "access-token": token
      }
    })
  } catch (error) {
    console.log(error);
  }
};

export const unSpotlightProduct = async (token, id) => {
  try {
    return await axios.patch(
      `${DBURL}${endPointAdmin.unSpotlightProd}/${id}`,
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

export const ableProduct = async (token, id) => {
  try {
    return await axios.patch(`${DBURL}${endPointAdmin.ableProd}/${id}`, {},
      {
        headers: {
          "access-token": token
        }
      })
  } catch (error) {
    console.log(error);
  }
};

export const disableProduct = async (token, id) => {
  try {
    return await axios.patch(
      `${DBURL}${endPointAdmin.disableProd}/${id}`,
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

export const editProd = async (token, id, prodData) => {
  try {
    return await axios.patch(`${DBURL}${endPointAdmin.editProd}/${id}`, prodData, {
      headers: {
        'access-token': token
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export const offerProd = async (token, id) => {
  try {
    return await axios.patch(`${DBURL}${endPointAdmin.offerProd}/${id}`, {}, {
      headers: {
        'access-token': token
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export const unOfferProd = async (token, id) => {
  try {
    return await axios.patch(
      `${DBURL}${endPointAdmin.unOfferProd}/${id}`,
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

//API USERS -------------------------------




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

export const editUser = async (token, userData, id) => {
  try {
    return await axios.patch(`${DBURL}${endPointAdmin.editUser}/${id}`, userData, {
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

export const uploadAvatar = async (token, id, avatarForm) => {
  try {
    return await axios.post(
      `${DBURL}${endPointUsers.uploadAvatar}/${id}`,
      avatarForm,
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