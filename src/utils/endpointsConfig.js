export const endPoints = {
  login: '/api/login',
  register: '/users/create-user',
  createProduct: '/prod/create-product'
};

export const productEndpoints = {
  uploadImage: '/prod/upload-img',
  uploadIcon: '/prod/upload-icon',
}

export const endPointUsers = {
  register: "/users",
  login: "/login",
  getUser: "/users/get-user-by-id",
  uploadAvatar: "/users/upload-avatar"
};

export const endPointAdmin = {

  //Users

  getAllUsers: "/users/get-users",
  editUser: "/users/edit-user",
  disableUser: "/users/disable-user",
  ableUser: "/users/unban-user",
  adminUser: "/users/user-admin",
  clientUser: "/users/user-client",
  getAdminUsers: "/users/get-admin-users",
  getBannedUsers: "/users/get-banned-users",
  getActiveUsers: "/users/get-active-users",

  // Products

  getProd: "/prod/get-products",
  getDisabledProd: "/prod/get-disabled-products",
  editProd: "/prod/edit-product",
  spotlightProd: "/prod/spotlight-product",
  unSpotlightProd: "/prod/unspotlight-product",
  offerProd: "/prod/offer-product",
  unOfferProd: "/prod/unoffer-product",
  disableProd: "/prod/disable-product",
  ableProd: "/prod/able-product",
  deleteProd: "/prod/delete-product",
  prodOfferPrice: "/prod/set-offer-price",
  editPrice: "/prod/edit-price",

};