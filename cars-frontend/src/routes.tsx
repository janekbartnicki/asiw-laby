import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import App from "./App";
import CarsList from "./components/cars-list";
import CarDetails from "./components/car-details";
// import CarForm from "./components/car-form";
import NotFound from "./components/not-found";
import Home from "./components/home";
import { CarEdit } from "./components/car-edit";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home /> },
            { path: 'cars', element: <CarsList /> },
            { path: 'cars/:id', element: <CarDetails /> },
            { path: 'edit/:id', element: <CarEdit /> },
            { path: 'not-found', element: <NotFound /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
]

export const router = createBrowserRouter(routes);