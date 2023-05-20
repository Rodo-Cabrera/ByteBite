import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {Image, Card} from "react-bootstrap"
import { messages } from "../../utils/messages";
import { validationsFields, isValidCountry } from "../../utils/validation";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';
import './style/form.css'


const ContactForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  const [data, setData] = useState({
    email: "",
    name: "",
    address: "",
    address2: "",
    city: "",
    country: "",
    message: "",
  });
  
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const refForm = useRef();

  const onSend = async () => {
    
    console.log(refForm.current);
    const serviceId = import.meta.env.VITE_EMAILJS_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const apiKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    

    setTimeout(()=> {
      emailjs.sendForm(serviceId, templateId, refForm.current, apiKey)
        .then(result => console.log(result.text))
        .catch(error => console.error(error))
    }, 5000);

    Swal.fire(
      'Tu mensaje se envió con éxito!!',
      'Te contestaremos en menos de 48hs.',
      'success'
    )
  };

  return (
    <>
      <Col>
        <Form
          onSubmit={handleSubmit(onSend)}
          ref={refForm}
          className="formContainer"
        >
          <Card className="justify-content-center">
            <Image src="" alt="advanTecnoLogo" className="logoForm" />
          </Card>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingresa tu email"
                {...register("email", {
                  required: true,
                  maxLength: 50,
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
            </Form.Group>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Juan Pérez"
                {...register("name", {
                  required: true,
                  maxLength: 50,
                  minLength: 6,
                  pattern: validationsFields.name,
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
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="address"
              placeholder="Calle siempreviva 123"
              {...register("address", {
                required: true,
                maxLength: 50,
                minLength: 10,
              })}
              onChange={handleChange}
            />
            {errors.address?.type === "required" && (
              <p className="alertas">{messages.addressError}</p>
            )}
            {errors.address?.type === "minLength" && (
              <p className="alertas">{messages.addressMinLengthError}</p>
            )}
            {errors.address?.type === "maxLength" && (
              <p className="alertas">{messages.addressMaxLengthError}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Referencias (opcional)</Form.Label>
            <Form.Control
              name="address2"
              placeholder="Piso, Oficina o alguna referencia útil"
              {...register("address2", {
                required: false,
                maxLength: 50,
              })}
              onChange={handleChange}
            />
            {errors.address2?.type === "maxLength" && (
              <p className="alertas">{messages.addressMaxLengthError}</p>
            )}
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                name="city"
                {...register("city", {
                  required: true,
                  maxLength: 20,
                  minLength: 6,
                })}
                onChange={handleChange}
              />
              {errors.city?.type === "required" && (
                <p className="alertas">{messages.cityError}</p>
              )}
              {errors.city?.type === "maxLength" && (
                <p className="alertas">{messages.cityMaxLengthError}</p>
              )}
              {errors.city?.type === "minLength" && (
                <p className="alertas">{messages.cityMinLengthError}</p>
              )}
            </Form.Group>

            <Form.Group
              as={Col}
              name="country"
              controlId="formGridCountry"
              {...register("country", {
                required: true,
                validate: isValidCountry,
              })}
              onChange={handleChange}
            >
              <Form.Label>País</Form.Label>

              <Form.Select
                defaultValue="Elige un país"
                onChange={handleChange}
                name="country"
              >
                <option>Elige un país</option>
                <option>Argentina</option>
                <option>Uruguay</option>
                <option>Brasil</option>
                <option>Bolivia</option>
                <option>Paraguay</option>
                <option>Chile</option>
              </Form.Select>
              {errors.country?.type === "validate" && (
                <p className="alertas">{messages.countryError}</p>
              )}
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formGridMsg">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                name="message"
                {...register("message", {
                  required: true,
                  maxLength: 350,
                })}
                onChange={handleChange}
              />
              {errors.message?.type === "maxLength" && (
                <p className="alertas">{messages.msgError}</p>
              )}
            </Form.Group>
          </Row>
          <Button
            variant="primary"
            type="submit"
            className="my-3 container-fluid"
          >
            Enviar
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default ContactForm;
