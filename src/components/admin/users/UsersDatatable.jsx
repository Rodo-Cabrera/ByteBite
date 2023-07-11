import React, { useState, useEffect, useContext } from "react";
import MUIDataTable from "mui-datatables";
import {
  getAllusers,
  disableUser,
  ableUser,
  adminUser,
  clientUser,
} from "../../../API/Api";
import { Button } from "react-bootstrap";
import { userContext } from "../../../context/AuthContext";
import { useAuth } from "../../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import "./styles/userStyle.css";
import { Grid } from "@mui/material";
import 'styled-components'

const UsersDatatable = () => {
  const [users, setUsers] = useState([]);

  const { token } = useContext(userContext);

  const { role } = useAuth();



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
  }, []);

   const handleChange = () => {
     setUsers([]);
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
   };


  const handleDisableUser = async (id) => {
    if (token) {
      try {
        await disableUser(token, id);
        handleChange();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUnbanUser = async (id) => {
    if (token) {
      try {
        await ableUser(token, id);
        handleChange();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAdminUser = async (id) => {
    if (token) {
      try {
        await adminUser(token, id);
        handleChange();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClientUser = async (id) => {
    if (token) {
      try {
        await clientUser(token, id);
        handleChange();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRowClick = (rowData, rowMeta) => {
    const selectedRowData = users[rowMeta.dataIndex];
    return [selectedRowData, rowData]
  }

  const options = {
    fixedHeader: true,
    tableBodyHeight: "500px",
    selectableRows: "none",
    responsive: "simple",
    onRowClick: handleRowClick,
    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    },
  };

  const columns = [
    {
      name: "name",
      label: "NOMBRE",
    },
    {
      name: "lastName",
      label: "APELLIDO",
    },
    {
      name: "age",
      label: "EDAD",
    },
    {
      name: "email",
      label: "EMAIL",
    },
    {
      name: "role",
      label: "ROL",
    },
    {
      name: "status",
      label: "STATUS",
      options: {
        customBodyRender: (value, tableMeta) => {
          const isDisabled = users[tableMeta.rowIndex].disabled === true;
          return isDisabled ? "Desabilitado" : "Habilitado";
        },
      },
    },
    {
      name: "Editar",
      label: "EDITAR",
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <Button
              className="btnEdit btn-outline-primary"
              data-tooltip-id="editUserTt"
              data-tooltip-content="Editar usuario"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
                data-tooltip-id="editUserTt"
                data-tooltip-content="Editar usuario"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </Button>
          );
        },
      },
    },
    {
      name: "status",
      label: "BAN/ABLE",
      options: {
        customBodyRender: (value, tableMeta) => {
          const userId = users[tableMeta.rowIndex]._id;
          const isDisabled = users[tableMeta.rowIndex].disabled === true;

          return (
            <>
              <Tooltip id="editUserTt" type="info" />
              {isDisabled ? (
                <Button
                  className="btnAble btn-outline-success"
                  onClick={() => handleUnbanUser(userId)}
                  data-tooltip-id="editUserTt"
                  data-tooltip-content="Habilitar usuario"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check2-square"
                    viewBox="0 0 16 16"
                    data-tooltip-id="editUserTt"
                    data-tooltip-content="Habilitar usuario"
                  >
                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                  </svg>
                </Button>
              ) : (
                <Button
                  className="btnDelete btn-outline-danger"
                  onClick={() => handleDisableUser(userId)}
                  data-tooltip-id="editUserTt"
                  data-tooltip-content="Desabilitar usuario"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x-square"
                    viewBox="0 0 16 16"
                    data-tooltip-id="editUserTt"
                    data-tooltip-content="Desabilitar usuario"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </Button>
              )}
            </>
          );
        },
      },
    },
    {
      name: "role",
      label: "OWNER",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          const userId = users[tableMeta.rowIndex]._id;
          const userRole = users[tableMeta.rowIndex].role;

          if (role === "owner") {
            return (
              <>
                {userRole === "client" ? (
                  <Button
                    className="btnAble btn-outline-success"
                    onClick={() => handleAdminUser(userId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                      data-tooltip-id="editUserTt"
                      data-tooltip-content="Hacer administrador"
                      data-tooltip-place="bottom"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    className="btnAble btn-outline-danger"
                    onClick={() => handleClientUser(userId)}
                    data-tooltip-id="editUserTt"
                    data-tooltip-content="Hacer cliente"
                    data-tooltip-place="bottom"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                      data-tooltip-id="editUserTt"
                      data-tooltip-content="Hacer cliente"
                      data-tooltip-place="bottom"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  </Button>
                )}
              </>
            );
          } else {
            return null;
          }
        },
      },
    },
  ];



  return (
    <div>
      <Grid className="container my-2 text-center" justifyContent="flex-end">
        <MUIDataTable
          title={"Todos los Usuarios"}
          data={users}
          columns={columns}
          options={options}
          className="custom-table"
        />
      </Grid>
    </div>
  );
};

export default UsersDatatable;
