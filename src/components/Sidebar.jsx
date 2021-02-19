import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();
  const section = location.pathname.split("/")[1];

  return (
    <div className="sidebar">
      <Link to="/" className="logo">stratako</Link>

      <div className="links">
        <Link to="/operations/" className={section === "operations" ? "selected" : ""}>
          <svg stroke="#cbd4db" height="512" viewBox="0 0 468 468" width="512" strokeWidth="2" fill="#cbd4db" >
            <g><path d="m127.49 43.446-107.055-41.457c-9.671-3.742-20.435 3.613-20.435 13.971v164.34h30.015v-71.166l97.474-37.747c12.449-4.821 12.459-23.115.001-27.941zm-97.475 33.544v-39.147l50.545 19.574z"/><path d="m458.66 330.146-107.055-41.457c-9.671-3.74-20.435 3.612-20.435 13.971v164.34h30.015v-71.166l97.474-37.747c12.449-4.822 12.459-23.116.001-27.941zm-97.474 33.544v-39.147l50.545 19.573z"/><g><path d="m73.038 133.349h31.016v29.969h-31.016z"/><path d="m333.171 133.349h-201.103v29.969h201.103c22.619 0 41.021 18.373 41.021 40.957s-18.402 40.957-41.021 40.957h-224.115c-39.17 0-71.037 31.817-71.037 70.926s31.867 70.926 71.037 70.926h162.516l-16.463 18.051 22.055 20.448 40.021-43.227c5.337-5.772 5.303-14.649-.079-20.381l-40.021-42.607-21.897 20.26 16.641 17.487h-162.773c-22.619 0-41.021-18.373-41.021-40.957s18.402-40.957 41.021-40.957h224.115c39.17 0 71.037-31.817 71.037-70.926s-31.867-70.926-71.037-70.926z"/></g></g>
          </svg>
          Operations
        </Link>
        <Link to="/projects/" className={section === "projects" ? "selected" : ""}>
          <svg stroke="#cbd4db" strokeWidth="2" height="512" viewBox="0 0 511.927 511.927" width="512">
            <g><path d="m496.899.063c-107.348.099-212.523 45.282-288.585 123.979l-27.046 27.046-28.754-28.754-84.879 23.958-67.635 67.634 59.212 59.214-.001.001 3.062 3.061-27.853 57.46 18.359 18.359-44.905 44.906 21.213 21.213 44.905-44.905 21.717 21.719-95.096 95.094 21.213 21.213 95.096-95.095 21.717 21.717-44.907 44.907 21.213 21.213 44.907-44.907 18.359 18.36 57.462-27.853 62.274 62.274 67.629-67.626 24.041-84.809-28.831-28.829 27.045-27.045c37.509-36.154 68.597-80.734 89.905-128.928 40.467-91.521 33.292-165 34.191-174.591zm-413.585 172.975 60.422-17.054 16.317 16.316-79.629 79.628-37.999-38.002zm101.018 268.113-113.607-113.609 14.002-28.884 128.492 128.491zm171.619-72.946-17.108 60.354-40.896 40.894-38-37.999 79.625-79.625zm10.966-86.145-27.343 27.343-.003-.003-100.835 100.836-137.097-137.095c10.108-10.107 91.088-91.086 100.842-100.84 3.156-3.156-10.724 10.725 27.322-27.325 66.815-69.171 157.838-110.413 251.764-114.566-4.149 93.993-45.421 184.971-114.65 251.65z"/><path d="m367.495 241.092c26.69-26.69 26.711-70.097.048-96.76-12.895-12.895-30.061-19.997-48.336-19.997-37.725 0-68.393 30.4-68.384 68.355.005 18.283 7.111 35.455 20.01 48.354 26.409 26.407 69.855 26.856 96.662.048zm-48.288-86.757c10.262 0 19.895 3.981 27.123 11.21 14.966 14.967 14.944 39.341-.048 54.334-7.181 7.18-16.792 11.134-27.064 11.134-21.466 0-38.389-17.211-38.395-38.332-.003-10.26 17.372-38.346 38.384-38.346z"/></g>
          </svg>
          Projects
        </Link>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  
};

export default Sidebar;