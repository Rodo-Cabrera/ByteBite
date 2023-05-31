import React, { useEffect, useState } from "react";
import { getAllusers } from "../../../API/Api";
import { Table, Button, Container } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const resp = async () => {
      await getAllusers()
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => console.log(error));
    };
    resp();
  }, []);

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
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.disabled ? 'Usuario Baneado' : 'Habilitado'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default UserList;
