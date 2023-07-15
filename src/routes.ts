import { lazy } from "react";

const routes = [
  { path: "/login", component: lazy(() => import("pages/Login")), exact: true },
  {
    path: "/login/fail",
    component: lazy(() => import("pages/Login/LoginFail")),
    exact: true,
  },
  {
    path: "/logout",
    component: lazy(() => import("pages/Login/Logout")),
    exact: true,
  },
  {
    path: "/",
    component: lazy(() => import("pages/Home/RedirectToHome")),
    exact: true,
  },
  {
    path: "/invite/:roomId",
    component: lazy(() => import("pages/Invite")),
    exact: true,
  },
  {
    path: ["/home", "/home/:roomId"],
    component: lazy(() => import("pages/Home")),
    exact: true,
  },
  {
    path: "/event/:eventName",
    component: lazy(() => import("pages/Event")),
    exact: true,
  },
  {
    path: "/search",
    component: lazy(() => import("pages/Search")),
    exact: true,
  },
  {
    path: "/addroom",
    component: lazy(() => import("pages/Addroom")),
    exact: true,
  },
  {
    path: ["/myroom", "/myroom/:roomId"],
    component: lazy(() => import("pages/Myroom")),
    exact: true,
  },
  {
    path: "/mypage",
    component: lazy(() => import("pages/Mypage")),
    exact: true,
  },
  {
    path: "/chatting/:roomId",
    component: lazy(() => import("pages/Chatting")),
    exact: true,
  },
  {
    path: "*",
    component: lazy(() => import("pages/Error/PageNotFound")),
  },
];

export default routes;
