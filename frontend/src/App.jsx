//import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import PosMenu, { loader as food } from "./pages/PosMenu";
import { FoodCartContextProvider } from "./store/FoodContext";
import Tables, { loader as tables } from "./pages/Tables";
import Payments from "./pages/Payments";
import Sales, { loader as sales } from "./pages/Sales";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <p>Error</p>,
      children: [
        {
          index: true,
          element: <Tables />,
          loader: tables,
        },
        {
          path: "menu/:tableid",
          id: "table-id",
          loader: food,
          children: [
            {
              index: true,
              element: <PosMenu />,
            },
            {
              path: "payments",
              element: <Payments />,
            },
          ],
        },
        {
          path: "sales",
          id: "sales",
          element: <Sales />,
          loader: sales,
        },
      ],
    },
  ]);
  return (
    <>
      <FoodCartContextProvider>
        <RouterProvider router={router} />
      </FoodCartContextProvider>
    </>
  );
}

export default App;
