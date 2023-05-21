import React, { useState, useForm } from "react";
import { alertSuccess, alertError } from "../../utils/alertCustom";
import { messages } from "../../utils/messages";
import { endPoint } from "../../utils/endpointsConfig";
import clientAxios from "../../utils/clientAxios";
import { validationsFields } from "../../utils/validation";

const Login = () => {

  // const {
  //   register,
  //   formState : {errors}
  // } = useForm();



  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await clientAxios.post(`${endPoint.login}`, userData);
      console.log(data);
      localStorage.setItem("token", data?.token);
      alertSuccess(messages.logSuccess, data.msg, () => {
        // window.location.href = "http://localhost:3000/home";
      });
    } catch (err) {
      alertError(`${err.message}`, "Error al iniciar sesión", () => {
        console.log(err);
      });
    }
  };

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8">
          <form onSubmit={handleSubmit}>
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
                // {...register("email", {
                //   required: true,
                //   maxLength: 100,
                //   minLength: 10,
                //   pattern: validationsFields.email,
                // })}
                onChange={handleChange}
              />
              {/* {errors.email?.type === "required" && (
                <p className="alertas">{messages.emailError}</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="alertas">{messages.emailPatternError}</p>
              )} */}
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
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              LogIn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
