import React from 'react'
import { Link } from 'react-router-dom'
import { useFilters } from '../../hooks/useFilters';
import { useCart } from '../../hooks/useCart';
import ('./footerStyle/footer.css');



const Footer = () => {

  const { filter } = useFilters();
  const { cart } = useCart()

  return (
    <div className="container-fluid" id="footer">
      <div className="row p-4 pb-2 text-white">
        <div className="col-sm-12 col-md-4 col-lg-4 text-center bloke">
          <Link to="/">
            <img
              src=""
              alt="logoFooter"
              className="logofooter figure-img img-fluid mx-auto mt-5"
              width="153"
              height="153"
            />
          </Link>
          {JSON.stringify(filter, null, 2)}
          {JSON.stringify(cart, null, 2)}
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 text-center mt-5">
          <div className="mb-2">
            <Link
              className="text-decoration-none juegos"
              to="./html/Error404.html"
            >
              Steam Store
            </Link>
          </div>
          <div className="mb-2">
            <Link
              className="text-decoration-none juegos"
              to="./html/Error404.html"
            >
              Epic Games store
            </Link>
          </div>
          <div className="mb-2">
            <Link
              className="text-decoration-none juegos"
              to="./html/Error404.html"
            >
              Origin store
            </Link>
          </div>
          <div className="mb-2">
            <Link className="text-decoration-none juegos" to="">
              Uplay store
            </Link>
          </div>
          <div className="mb-2">
            <Link className="text-decoration-none juegos" to="">
              Prime Games store
            </Link>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 text-center bloke">
          <p className="h5 mb-3">Nuestras redes</p>
          <div className="redes row row-cols-md-1 row-cols-sm-4">
            <div className="col mb-2">
              <Link
                to="https://www.facebook.com/rodo.cabrera.5"
                target="_blank"
              >
                <i className="fa-brands fa-facebook fa-2x fa-x1">
                  <img
                    className="figure-img img-fluid logors rounded mx-auto icon"
                    width="40"
                    src="./Redes/facebook.svg"
                    alt="logo facebook"
                  />
                </i>
              </Link>
            </div>
            <div className="col mb-2">
              <Link to="https://www.instagram.com/cabrerarodo/" target="_blank">
                <i className="fa-brands fa-instagram fa-2x fa-x1">
                  <img
                    className="figure-img img-fluid logors rounded mx-auto icon"
                    width="40"
                    src="./Redes/instagram.svg"
                    alt="logo instagram"
                  />
                </i>
              </Link>
            </div>
            <div className="col mb-2">
              <Link to="https://twitter.com/RodoC007" target="_blank">
                <i className="fa-brands fa-twitter-sqare fa-2x fa-x1">
                  <img
                    className="figure-img img-fluid logors rounded mx-auto icon"
                    width="40"
                    src="./Redes/twitter.svg"
                    alt="logo twitter"
                  />
                </i>
              </Link>
            </div>
            <div className="col mb-2">
              <Link to="https://wa.me/5493865336498" target="_blank">
                <i className="fa-brands fa-whatsapp fa-2x fa-x1">
                  <img
                    className="figure-img img-fluid logors rounded mx-auto icon"
                    width="40"
                    src="./Redes/whatsapp.svg"
                    alt="logo whatsapp"
                  />
                </i>
              </Link>
            </div>
            <div className="col mb-2">
              <Link to="https://github.com/Rodo-Cabrera" target="_blank">
                <i className="fa-brands fa-whatsapp fa-2x fa-x1">
                  <img
                    className="figure-img img-fluid logors rounded mx-auto icon"
                    width="40"
                    src="./Redes/github.svg"
                    alt="logo github"
                  />
                </i>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-12 pt-3">
          <marquee scrollamount="15">
            <p className="small text-center opacity-75">
              Copyright © 2023 AdvanTecno. Todos los derechos reservados.
            </p>
          </marquee>
        </div>
      </div>
    </div>
  );
}

export default Footer
