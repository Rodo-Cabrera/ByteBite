import React, { useContext, useState } from "react";
import { alertError } from "../../utils/alertCustom";
import { editUser, uploadAvatar } from "../../API/Api";
import { messages } from "../../utils/messages";
import { userContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { Button, Form, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import "./styles/userPanel.css";
import { useAuth } from "../../hooks/useAuth";

const AvatarChange = ({ userId, changedAvatar, setChangedAvatar, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [changeAvatar, setChangeAvatar] = useState("");

  const { token, handleUpdateUser } = useContext(userContext);


  const handleAvatarChange = async (e) => {
    const file = e.target.files;
    const fileArray = Array.from(file);
    if (fileArray.length !== 1) {
      reset();
      return alertError(messages.avatarError);
    }
    const avatarForm = new FormData();
    avatarForm.append("avatar", e.target.files[0]);
    if (token) {
      try {
        await uploadAvatar(token, userId, avatarForm)
          .then((response) => {
            setChangeAvatar(response.data.url);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSend = async () => {
    const userData = { avatar: changeAvatar };
    const newAvatar = () => editUser(token, userData, userId);
    console.log(userId);
    if (token) {
      try {
        await newAvatar();
        setChangedAvatar(changeAvatar);
        handleUpdateUser();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const swalSubmit = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-warning mx-1",
        cancelButton: "btn btn-danger mx-1",
      },
      buttonsStyling: false,
    });

    const styled = `userAvatar my-4 user`;

    const avatarHtml = `<Image width='100px' class='swal-avatar' src=${changedAvatar} />`;
    const newAvatarHtml = `<Image width='100px' class='swal-avatar'  src=${changeAvatar} />`;
    const middle = `<p class='mx-5'> POR </p>`;

    const firstAlert = `
    <div class='d-flex justify-content-center align-items-center'>  
      <Image width='100px' class='swal-avatar' src=${changedAvatar} /> 
          <h5 class='mx-5'> 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
             <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>      
         </h5>
      <Image width='100px' class='swal-avatar'  src=${changeAvatar} />
    </div>`;

    swalWithBootstrapButtons
      .fire({
        title: "Cambiar ávatar?",
        html: `${firstAlert}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Aceptado!",
            "Tu foto de perfil se cambió con éxito!",
            "success"
          );
          onSend();
          onClose();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Se mantendrá tu foto de perfil anterior",
            "error"
          );
          onClose();
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit(swalSubmit)}>
      <div className="container-fluid p-2">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <div className="text-center">
            <h3>Cambiar ávatar</h3>
          </div>
          <Form.Label className="small">
            Selecciona una imagen
          </Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/jpeg, image/png, image/webp"
            placeholder="Nuevo ávatar"
            name="avatar"
            {...register("avatar", {
              required: true,
            })}
            onChange={handleAvatarChange}
          />
          {errors.avatar?.type === "required" && (
            <p className="alertas">{messages.avatarEmptyError}</p>
          )}
        </Form.Group>
        <div className="imgContainer">
          {changeAvatar !== "" ? (
            <div className="imgWrapper my-3">
              <img src={changeAvatar} alt="Avatar subido" className="img swal-avatar" />
            </div>
          ) : (
            <p>Esperando la carga del avatar</p>
          )}
        </div>
      <Button type="submit" variant="success" className="container">
        Cambiar avatar
      </Button>
      </div>
    </Form>
  );
};

export default AvatarChange;
