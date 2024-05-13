//import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import PosMenu, { loader as food } from "./pages/PosMenu";
import { FoodCartContextProvider } from "./store/FoodContext";
import Tables, { loader as tables } from "./pages/Tables";

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
          element: <PosMenu />,
          loader: food,
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
