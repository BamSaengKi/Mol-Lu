import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import ErrorPage from "./error-page";
import SignUp from "./pages/signup/SignUp";
import Main from "./pages/main/Main";
import SignIn from "./pages/signin/SignIn";
import Basket from "./pages/basket/Basket";
import Order from "./pages/order/Order";
import MyPage from "./pages/home/mypage/MyPage";

// const Router = () => {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route
//                     path="/"
//                     element={<Home />}
//                 />
//                 <Route
//                     path="/signup"
//                     element={<SignUp />}
//                 ></Route>
//                 <Route
//                     path="/main"
//                     element={<Main />}
//                 ></Route>
//                 <Route
//                     path="/signin"
//                     element={<SignIn />}
//                 ></Route>
//             </Routes>
//         </BrowserRouter>
//     );
// };

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/main",
        element: <Main />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "basket",
        element: <Basket />,
    },
    {
        path: "order",
        element: <Order />,
    },
    {
        path: "mypage",
        element: <MyPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={Router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
