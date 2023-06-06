import React, { useContext, useEffect, useState } from "react";
import { getAllusers, disableUser, ableUser } from "../../../API/Api";
import { Table, Button, Container } from "react-bootstrap";
import { userContext } from "../../../context/AuthContext";
import './styles/userStyle.css'
const DBURL = import.meta.env.VITE_URL_BASE;


const UserList = () => {
  const [users, setUsers] = useState(null);

  const { token } = useContext(userContext)
  
 
  useEffect(() => {
    const resp = async () => {
      if (token) {       
        await getAllusers(token)
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => console.log(error));
      }
    };
    resp();

    // const interval = setInterval(resp, 5000);
    // return () => {
    //   clearInterval(interval)
    // }
  }, []);

  const handleDisableUser = async (id) => {
    if (token) {
      try {        
        await disableUser(token, id);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleUnbanUser = async (id) => {
    if (token) {
      try {
        await ableUser(token, id);
      } catch (error) {
        console.log(error);
      }
    }
  };


  const handleChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <h2>Lista de usuarios</h2>
      <div>
        <Table>
          <thead>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Email</th>
            <th>Role</th>
            <th>Banned</th>
            <th>Editar</th>
            <th>Banear</th>
            <th>Habilitar</th>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.disabled ? "Usuario Baneado" : "Habilitado"}
                </td>
                <td>
                  <Button className="btnEdit btn-outline-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </Button>
                </td>
                <td>
                  <Button
                    className="btnDelete btn-outline-danger"
                    onClick={() => handleDisableUser(user._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </Button>
                </td>
                <td>
                  <Button
                    className="btnAble btn-outline-success"
                    onClick={() => handleUnbanUser(user._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check2-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                      <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default UserList;
