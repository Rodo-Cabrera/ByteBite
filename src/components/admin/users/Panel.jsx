import React, { useState } from "react";
import "./styles/userStyle.css";
import { Accordion, Button, Col, Row, Container } from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth";
import UserList from "./UserList";
import AdminUsers from "./AdminUsers";
import BannedUsers from "./BannedUsers";
import ActiveUsers from "./ActiveUsers";
import AllProdDatatable from "../products/AllProdDatatable";
import UsersDatatable from "./UsersDatatable";
import { Grid, Box } from "@mui/material";
import CreateProduct from "../products/CreateProduct";

const Panel = () => {
  const { actualUser } = useAuth();

  const [panel, setPanel] = useState(1);

  return (
    <>
      <div className="d-flex row">
        <div className="panel container">
          <div className="admin-container">
            <Col className="panel-col">
              <div className="user my-3 admin-container">
                {actualUser.length > 0 && (
                  <div className="my-3">
                    <img
                      className="avatar"
                      src={actualUser[0].avatar}
                      alt={actualUser[0].avatar}
                    />
                    <h1>{actualUser[0].name}</h1>
                    <p>{actualUser[0].role}</p>
                  </div>
                )}
              </div>
              <Row>
                <div className="userOptions mx-1 my-3 row justify-content-center">
                  <div className="row mb-2">
                    <Button onClick={() => setPanel(1)} variant="warning">
                      Todos los usuarios
                    </Button>
                  </div>
                  <div className="row mb-2">
                    <Button onClick={() => setPanel(2)} variant="warning">
                      Todos los productos
                    </Button>
                  </div>
                  <div className="row">
                    <Button onClick={() => setPanel(3)} variant="primary">
                      Añadir producto
                    </Button>
                  </div>
                </div>
              </Row>
            </Col>
          </div>
        </div>
      </div>
      <div className="container-fluid mb-5">
        <Col className="panel-col">
          <Grid className="d-flex flex-column" container>
            {panel === 1 ? (
              <div>
                <UsersDatatable />
              </div>
            ) : panel === 2 ? (
              <div>
              <AllProdDatatable />
            </div>
            ) : panel === 3 && (
              <div>
                <CreateProduct/>
              </div>
            )
            }
          </Grid>
        </Col>
      </div>
    </>
  );
};

export default Panel;
