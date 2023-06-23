import React, { useState } from "react";
import { alertSuccess, alertError } from "../../utils/alertCustom";
import { messages } from "../../utils/messages";
import { endPoints } from "../../utils/endpointsConfig";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ageValidator, validationsFields } from "../../utils/validation"
import { Form, Col, Row, Button, Card, Image } from "react-bootstrap";
import './styles/register.css'


const Register = () => {
  const URL_BASE = import.meta.env.VITE_URL_BASE;

   const {
     register,
     formState: { errors },
     handleSubmit
   } = useForm();

  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    lastName: "",
    age: "",
  });


  const onSend = async () => {
   
    if (userData.password !== userData.password2) {
      alertError(messages.pwMatchError, messages.logError, () => {
      });
      return;
    }
    try {
      const { data } = await axios.post(
        `${URL_BASE}${endPoints.register}`,
        userData
      );
      alertSuccess(messages.regSuccess, `Bienvenido, ${data.name}!`, () => {
        return;
        // window.location.href = 'http://localhost:3000/home'
      });
    } catch (err) {
      alertError(`${err.response.data.error[0].msg}`, "Error", () => {
        console.log(err);
      });
    }
  };


  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">
          <Form onSubmit={handleSubmit(onSend)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                {...register("email", {
                  required: true,
                  maxLength: 100,
                  minLength: 10,
                  pattern: validationsFields.email,
                })}
                onChange={handleChange}
              />
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
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                name="name"
                {...register("name", {
                  required: true,
                  maxLength: 50,
                  minLength: 2,
                  pattern: validationsFields.lastName,
                })}
                onChange={handleChange}
              />
              {errors.name?.type === "required" && (
                <p className="alertas">{messages.nameError}</p>
              )}
              {errors.name?.type === "maxLength" && (
                <p className="alertas">{messages.nameLengthError}</p>
              )}
              {errors.name?.type === "minLength" && (
                <p className="alertas">{messages.nameMinLengthError}</p>
              )}
              {errors.name?.type === "pattern" && (
                <p className="alertas">{messages.namePatternError}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                aria-describedby="emailHelp"
                name="lastName"
                {...register("lastName", {
                  required: true,
                  maxLength: 50,
                  minLength: 2,
                  pattern: validationsFields.lastName,
                })}
                onChange={handleChange}
              />
              {errors.lastName?.type === "required" && (
                <p className="alertas">{messages.lastNameError}</p>
              )}
              {errors.lastName?.type === "maxLength" && (
                <p className="alertas">{messages.lastNameLengthError}</p>
              )}
              {errors.lastName?.type === "minLength" && (
                <p className="alertas">{messages.lastNameMinLengthError}</p>
              )}
              {errors.lastName?.type === "pattern" && (
                <p className="alertas">{messages.lastNamePatternError}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Edad
              </label>
              <input
                className="form-control"
                id="age"
                aria-describedby="emailHelp"
                name="age"
                {...register("age", {
                  required: true,
                  maxLength: 3,
                  minLength: 2,
                  validate: ageValidator,
                  pattern: validationsFields.age,
                })}
                onChange={handleChange}
              />
              {errors.age?.type === "required" && (
                <p className="alertas">{messages.ageError}</p>
              )}
              {errors.age?.type === "validate" && (
                <p className="alertas">{messages.ageValidateError}</p>
              )}
              {errors.age?.type === "maxLength" && (
                <p className="alertas">{messages.ageMaxLengthError}</p>
              )}
              {errors.age?.type === "minLength" && (
                <p className="alertas">{messages.ageMinLengthError}</p>
              )}
              {errors.age?.type === "pattern" && (
                <p className="alertas">{messages.agePatternError}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                {...register("password", {
                  required: true,
                  maxLength: 100,
                  minLength: 5,
                  pattern: validationsFields.password,
                })}
                onChange={handleChange}
              />
              {errors.password?.type === "required" && (
                <p className="alertas">{messages.pwError}</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="alertas">{messages.pwMaxLengthError}</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="alertas">{messages.pwMinLengthError}</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="alertas">{messages.pwPatternError}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Repetir contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                name="password2"
                {...register("password2", {
                  required: true,
                  maxLength: 100,
                  minLength: 5,
                  pattern: validationsFields.password,
                })}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
