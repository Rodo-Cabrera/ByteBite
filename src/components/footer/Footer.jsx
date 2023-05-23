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
            <a
              className="text-decoration-none juegos"
              href="./html/Error404.html"
            >
              Steam Store
            </a>
          </div>
          <div className="mb-2">
            <a
              className="text-decoration-none juegos"
              href="./html/Error404.html"
            >
              Epic Games store
            </a>
          </div>
          <div className="mb-2">
            <a
              className="text-decoration-none juegos"
              href="./html/Error404.html"
            >
              Origin store
            </a>
          </div>
          <div className="mb-2">
            <a className="text-decoration-none juegos" href="">
              Uplay store
            </a>
          </div>
          <div className="mb-2">
            <a className="text-decoration-none juegos" href="">
              Prime Games store
            </a>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 text-center bloke">
          <p className="h5 mb-3">Nuestras redes</p>
          <div className="redes row row-cols-md-1 row-cols-sm-4">
            <div className="col mb-2">
              <a href="./html/Error404.html">
                <i className="fa-brands fa-facebook fa-2x fa-x1">
                  <img
                    className="figure-img img-fluid logors rounded mx-auto icon"
                    width="40"
                    src="./Redes/facebook.svg"
                    alt="logo facebook"
                  />
                </i>
              </a>
            </div>
            <div className="col mb-2">
              <a href="./html/Error404.html">
                <i className="fa-brands fa-instagram fa-2x fa-x1">
                  <img
                    className="figure-img img-fluid logors rounded mx-auto icon"
                    width="40"
                    src="./Redes/instagram.svg"
                    alt="logo instagram"
                  />
                </i>
              </a>
            </div>
            <div className="col mb-2">
              <a href="./html/Error404.html">
                <i className="fa-brands fa-twitter-sqare fa-2x fa-x1">
                  <img
                    className="figure-img img-fluid logors rounded mx-auto icon"
                    width="40"
                    src="./Redes/twitter.svg"
                    alt="logo twitter"
                  />
                </i>
              </a>
            </div>
            <div className="col mb-2">
              <a href="./html/Error404.html">
                <i className="fa-brands fa-whatsapp fa-2x fa-x1">
                  <img
                    className="figure-img img-fluid logors rounded mx-auto icon"
                    width="40"
                    src="./Redes/whatsapp.svg"
                    alt="logo whatsapp"
                  />
                </i>
              </a>
            </div>
            <div className="col mb-2">
              <a href="./html/Error404.html">
                <i className="fa-brands fa-whatsapp fa-2x fa-x1">
                  <img
                    className="figure-img img-fluid logors rounded mx-auto icon"
                    width="40"
                    src="./Redes/github.svg"
                    alt="logo github"
                  />
                </i>
              </a>
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
