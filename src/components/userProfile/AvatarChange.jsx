import React, {useContext, useState} from 'react'
import { alertError } from '../../utils/alertCustom';
import { editUser, uploadAvatar } from '../../API/Api';
import { messages } from '../../utils/messages';
import { userContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';

const AvatarChange = ({userId}) => {

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [changeAvatar, setChangeAvatar] = useState("");

 

  const { token } = useContext(userContext);
  
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
    const userData = {avatar: changeAvatar}
    const newAvatar = () => editUser( token, userData, userId);
    console.log(userId);
    if (token) {
      try {
        await newAvatar();
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <Form onSubmit={handleSubmit(onSend)}>
       <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='text-center'>Avatar</Form.Label>
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
              <div className="imgWrapper">
                <img src={changeAvatar} alt="Avatar subido" className="img" />
              </div>
            ) : (
              <p>Esperando la carga del avatar</p>
            )}
        </div>
      </div>
      <Button type="submit" variant="success">Cambiar avatar</Button>
    </Form>
  )
}

export default AvatarChange
