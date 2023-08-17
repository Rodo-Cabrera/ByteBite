import React, { useContext, useState } from 'react'
import './styles/userPanel.css'
import { Image, Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { messages } from '../../utils/messages';
import { validationsFields } from '../../utils/validation';
import { userContext } from '../../context/AuthContext';
import { editUser } from '../../API/Api';
import Swal from "sweetalert2";
import AvatarChange from './AvatarChange';



const UserPanel = ({ user, userId }) => {


  const { token } = useContext(userContext);

 

  const [showAvatarChange, setShowAvatarChange] = useState(false);
  const handleAvatarHover = (isHovering) => {
    setShowAvatarChange(isHovering)
  }


  const [editMail, setEditMail] = useState(false);
  const handleOpenEditMail = () => setEditMail(true);
  const handleCloseEditMail = () => setEditMail(false);

  const [avatarMod, setAvatarMod] = useState(false);
  const handleOpenA = () => setAvatarMod(true);
  const handleCloseA = () => setAvatarMod(false);

  const [mail, setMail] = useState({
    email: ``,
    email2: ``,
  });


  const handleMailChange = (e) => {
    setMail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [changedAvatar, setChangedAvatar] = useState(user[0].avatar)

  console.log(changedAvatar);


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onMailSubmit = async (userData) => {
    const sendEditedMail = () => editUser(token, userData, userId);
    if (token) {
      try {
        if (mail.email !== mail.email2) {
          return Swal.fire({
            icon: "error",
            title: "Error en la edición",
            text: `Los campos (${mail.email} y ${mail.email2}) no coinciden `,
          });
        } else {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success mx-1",
              cancelButton: "btn btn-danger mx-1",
            },
            buttonsStyling: false,
          });

          swalWithBootstrapButtons
            .fire({
              title: "Esperando Confirmación",
              text: `Estás seguro que quieres editar tu email anterior (${user[0]?.email}) por (${mail.email}) ? `,
              icon: `warning`,
              showCancelButton: true,
              confirmButtonText: "Sí, editar",
              cancelButtonText: "No, cancelar!",
              reverseButtons: true,
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                await sendEditedMail();            
                handleCloseEditMail();
                swalWithBootstrapButtons.fire(
                  "Edición exitosa!",
                  `Se ha enviado un email a ${mail.email} con los detalles!`,
                  "success"
                );
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                handleCloseEditMail();
                swalWithBootstrapButtons.fire(
                  "Cancelado",
                  `Tu email seguirá siendo "${user[0]?.email}"`,
                  "error"
                );
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return alert("no sos el usuario kpop");
    }
  };

  return (
    <>
      {user.length > 0 && (
        <div>
          {user[0].avatar ? (
            <div
              className="avatar-container"
              onMouseEnter={() => handleAvatarHover(true)}
              onMouseLeave={() => handleAvatarHover(false)}
            >
              <Image
                src={changedAvatar}
                alt={user[0].avatar}
                roundedCircle
                className="userAvatar my-4 user"
              />
              {showAvatarChange && (
                <Button className="change-avatar-button user" variant="success" onClick={handleOpenA}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    class="bi bi-card-image"
                    viewBox="0 0 16 16"
                    className="change-avatar-svg"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                  </svg>
                </Button>
              )}
            </div>
          ) : (
            <div
              className="avatar-container"
              onMouseEnter={() => handleAvatarHover(true)}
              onMouseLeave={() => handleAvatarHover(false)}
            >
              <Image
                src="././img/noAvatar.jpg"
                alt="No avatar"
                roundedCircle
                className="userAvatar my-4 user"
              />
              {showAvatarChange && (
                <Button className="change-avatar-button user" variant="success" onClick={handleOpenA}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    class="bi bi-card-image"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                  </svg>
                </Button>
              )}
            </div>
          )}
          <div className="userInfo mx-3">
            <p className="user">{user[0].role}</p>
            <h3 className="text-center mb-3">
              {user[0].name} {user[0].lastName}
            </h3>
            <h6>Edad: {user[0].age} años</h6>
            {!editMail ? (
              <div className="d-flex justify-content-between">
                <h6>Email: {user[0].email}</h6>
                <Button variant="outline" onClick={handleOpenEditMail}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                </Button>
              </div>
            ) : (
              <Form onSubmit={handleSubmit(onMailSubmit)} className="my-4">
                <Form.Group className="text-center my-2">
                  <Form.Label>Editar Mail</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user[0].email}
                    defaultValue={user[0].email}
                    name="email"
                    {...register("email", {
                      required: true,
                      maxLength: 100,
                      minLength: 10,
                      pattern: validationsFields.email,
                    })}
                    onChange={handleMailChange}
                  />

                  <div>
                    {errors.email?.type === "required" && (
                      <p className="alertas">{messages.emailError}</p>
                    )}
                    {errors.email?.type === "pattern" && (
                      <p className="alertas">{messages.emailPatternError}</p>
                    )}
                    {errors.email?.type === "minLength" && (
                      <p className="alertas">{messages.emailMinLengthError}</p>
                    )}
                    {errors.email?.type === "maxLength" && (
                      <p className="alertas">{messages.emailMaxLengthError}</p>
                    )}
                  </div>
                </Form.Group>
                <Form.Group className="text-center my-2">
                  <Form.Label>Repetir Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={mail.email}
                    autoComplete="off"
                    name="email2"
                    {...register("email2", {
                      required: true,
                      maxLength: 100,
                      minLength: 10,
                      pattern: validationsFields.email,
                    })}
                    onChange={handleMailChange}
                  />
                  <div>
                    {errors.email?.type === "required" && (
                      <p className="alertas">{messages.emailError}</p>
                    )}
                    {errors.email?.type === "pattern" && (
                      <p className="alertas">{messages.emailPatternError}</p>
                    )}
                    {errors.email?.type === "minLength" && (
                      <p className="alertas">{messages.emailMinLengthError}</p>
                    )}
                    {errors.email?.type === "maxLength" && (
                      <p className="alertas">{messages.emailMaxLengthError}</p>
                    )}
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-around">
                  <Button variant="warning" type="submit">
                    Aceptar
                  </Button>

                  <Button variant="danger" onClick={handleCloseEditMail}>
                    Cancelar
                  </Button>
                </div>
              </Form>
            )}

            <h6>{user[0].disabled === false && <p>Usuario activo</p>}</h6>
            <h6>{user[0].disabled === true && <p>Usuario bloqueado</p>}</h6>
          </div>
          <Button
            className="btnEdit btn-outline-success user"
            onClick={handleOpenEditMail}
          >
            Editar perfil
          </Button>
        </div>
      )}
      <Modal show={avatarMod} onHide={handleCloseA}>
        <AvatarChange userId={userId} changedAvatar={ changedAvatar } setChangedAvatar={setChangedAvatar} onClose={handleCloseA} />
      </Modal>
    </>
  );
};

export default UserPanel
