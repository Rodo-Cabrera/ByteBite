import Swal from "sweetalert2";

export const alertSuccess = (message, tittle, action) => {
  Swal.fire({
    title: tittle,
    text: message,
    icon: "success",
    confirmButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      action();
    }
  });
};

export const alertError = (message, tittle, action) => {
  Swal.fire({
    title: tittle,
    text: message,
    icon: "error",
    confirmButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      action();
    }
  });
};
