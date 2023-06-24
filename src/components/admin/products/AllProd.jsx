import React, {useState, useEffect, useContext} from 'react';
import { userContext } from '../../../context/AuthContext';
import { useAuth } from '../../../hooks/useAuth';
import { getAllProd } from '../../../API/Api';
import { Table, Button, Container } from "react-bootstrap";
import './styles/prodStyle.css'

const AllProd = () => {

  const [prod, setProd] = useState(null);
  const { token } = useContext(userContext);
  const { role } = useAuth();


  useEffect(() => {
    const resp = async () => {
      if (token) {
        await getAllProd(token)
          .then((response) => {
            setProd(response.data);
          })
          .catch((error) => console.log(error))
      }
    };
    resp();
  }, [])

  return (
    <>
      <div className="list-container container-fluid w-100">
        <div className="table-container">
          <Table>
            <thead className="text-center t-head">
              <th>Icon</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Oferta</th>
              <th>Destacado</th>
              <th>Status</th>
              <th>Ver</th>
            </thead>
            <tbody className="t-body text-center">
              {prod?.map((product) => (
                <tr key={product._id}>
                  <td>
                    {" "}
                    <img
                      className="prod-icon"
                      src={product.icon}
                      alt={product.icon}
                    />{" "}
                  </td>
                  <td>{product.tittle}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>{product.offer ? "Sí" : "No"}</td>
                  <td>{product.spotlight ? "Destacado" : "Common"}</td>
                  <td>{product.disabled ? "Desabilitado" : "Habilitado"}</td>
                  <td>
                    <Button className='btnWatch btn-outline-success'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default AllProd
