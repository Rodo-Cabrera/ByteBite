import React, { useState, useEffect, useContext } from "react";
import MUIDataTable from "mui-datatables";
import {
  getAllProd
} from "../../../API/Api";
import { Button, Modal, Col } from "react-bootstrap";
import { userContext } from "../../../context/AuthContext";
import { useAuth } from "../../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import "./styles/prodStyle.css";
import { Grid } from "@mui/material";
import "styled-components";
import AdminProdCard from "./AdminProdCard";

const AllProdDatatable = () => {
  const [prod, setProd] = useState([]);

  const { token } = useContext(userContext);

  const { role } = useAuth();

   const resp = async () => {
     if (token) {
       try {
        await getAllProd(token).then((response) => {
          setProd(response.data);
        });
       } catch (error) {
        console.log(error);
       }     
     }
   };

  useEffect(() => {
    resp();
  }, []);

  const [prodMod, setProdMod] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null)

  const handleOpenProd = (rowData) => {
    setSelectedProd(rowData)
    setProdMod(true)
  };
   const handleCloseProd = () => setProdMod(false);

  const updateProdState = (productId, updatedState) => {
    const updatedProd = prod.map((product) => {
      if (product._id === productId) {
        return {...product, ...updatedState};
      }
      return product;
    });
    setProd(updatedProd);
  }

  const options = {
    fixedHeader: true,
    tableBodyHeight: "500px",
    selectableRows: "none",
    responsive: "simple",
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
      name: "icon",
      label: "ICONO",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const icon = prod[tableMeta.rowIndex].icon;
          return (
            <>
              <img src={icon} alt={icon} className="prod-icon" />
            </>
          );
        },
      },
    },
    {
      name: "tittle",
      label: "TÍTULO",
      options: {
        sort: false,
      },
    },
    {
      name: "price",
      label: "PRECIO",
      options: {
        customBodyRender: (value, tableMeta) => {
          const price = prod[tableMeta.rowIndex].price;
          const offerPrice = prod[tableMeta.rowIndex].offerPrice;
          return (
            <div>
              {offerPrice ? (
                <div>
                  <p className="common-price">$ {price}</p>
                  <p className="offer-price">$ {offerPrice}</p>
                </div>
              ) : (
                <div>
                  <p className="offer-price">$ {price}</p>
                </div>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "category",
      label: "CATEGORÍA",
      options: {
        sort: false,
      },
    },
    {
      name: "quantity",
      label: "CANTIDAD",
      options: {
        sort: false,
      },
    },
    {
      name: "status",
      label: "STATUS",
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const isDisabled = prod[tableMeta.rowIndex].disabled;
          return isDisabled ? "Desabilitado" : "Habilitado";
        },
      },
    },
    {
      name: "spotlight",
      label: "VISUALIZACIÓN",
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const isSpotlight = prod[tableMeta.rowIndex].spotlight;
          return isSpotlight ? "Destacado" : "Común";
        },
      },
    },
    {
      name: "ver",
      label: "VISUALIZAR",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <Button
              className="btnWatch btn-outline-success"
              onClick={() => handleOpenProd(prod[tableMeta.rowIndex])}
            >
              <Tooltip id="viewProdTt" type="info" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eye"
                viewBox="0 0 16 16"
                data-tooltip-id="viewProdTt"
                data-tooltip-content="Visualizar"
                data-tooltip-place="bottom"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </Button>
          );
        },
      },
    },
  ];

  return (
    <>
      <div>
        <Col xl={12} xs={6} className="row">
          <Grid
            className="container my-2 text-center"
            justifyContent="flex-end"
          >
            <MUIDataTable
              title={"Productos"}
              data={prod}
              columns={columns}
              options={options}
              className="custom-table"
            />
          </Grid>
        </Col>
      </div>
      <Modal show={prodMod} onHide={handleCloseProd} className="prod-modal">
        {selectedProd && (
          <AdminProdCard
            product={selectedProd}
            updateProductState={updateProdState}
          />
        )}
      </Modal>
    </>
  );
};

export default AllProdDatatable;
