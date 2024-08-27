import { jwtDecode } from "jwt-decode";
import { Outlet, Navigate } from "react-router-dom";

export function formatPrice(number) {
  const scales = [
    { value: 1e12, suffix: "T" },
    { value: 1e9, suffix: "B" },
    { value: 1e6, suffix: "M" },
    { value: 1e3, suffix: "K" },
    { value: 1, suffix: "" },
  ];

  for (const scale of scales) {
    if (number >= scale.value) {
      return (
        (number / scale.value).toFixed(2).replace(/\.00$/, "") + scale.suffix
      );
    }
  }

  return number.toString();
}

export function PrivateRoute() {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

export function AnonymousRoute() {
  return isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export function isLoggedIn() {
  const token = localStorage.stock_site_token;
  if (token == null) return false;

  let decodedToken = jwtDecode(token);
  let currentDate = new Date();

  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return false;
  } else {
    return true;
  }
}
