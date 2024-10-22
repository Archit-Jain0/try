//added Navigate,Routes,Outlet in line 4....component:Component changed to element:Element in line 6...routes added line 12 and 27...Redirect changed to navigate in line 17....component changed to element in line 24....added outlet in line 34
/*import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  /*Redirect, */ /*Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading  === false && (
        <Routes>
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return <Navigate to="/login" replace />;
              }

               if (isAdmin === true && user.role !== "admin") {
                 return <Redirect to="/login" />;
               }

              return <Element {...props} />;
            }}
          />
        </Routes>
      )}
      <Outlet />
    </Fragment>
  );
};

export default ProtectedRoute;*/

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, element: Element }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message while checking authentication>
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Element />;
};

export default ProtectedRoute;
