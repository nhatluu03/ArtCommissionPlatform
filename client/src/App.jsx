import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/scss/base.scss";
import "boxicons";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";



// Pages
import Artworks from "./pages/artworks/Artworks";
import Artpieces from "./pages/artpieces/Artpieces";
import Artwork from "./pages/artwork/Artwork";
import Challenges from "./pages/challenges/Challenges";
import Challenge from "./pages/challenge/Challenge";
import Talents from "./pages/talents/Talents";
// import Messenger from "./pages/messenger/Messenger";
import Commissions from "./pages/commissions/Commissions";
import Layout from "./Layout";
import Pay from "./pages/pay/Pay";
import Order from "./pages/order/Order";

// import Success from "./pages/success/Success";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout showSidebar={true}></Layout>,
      children: [
        {
          path: "/talents/:id",
          element: <Artpieces />,
        },
        {
          path: "/talents/:id/commissions",
          element: <Commissions />,
        },
      ],
    },
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "/artworks",
          element: <Artworks />,
        },
        {
          path: '/order',
          element: <Order/>
        },
        {
          path: '/order/pay',
          element: <Pay/>
        },
        // {
        //   path: "/messenger",
        //   element: <Messenger />,
        // },
        {
          path: "/artworks/:id",
          element: <Artwork />,
        },
        {
          path: "/challenges",
          element: <Challenges />,
        },
        {
          path: "/challenges/:id",
          element: <Challenge />,
        },
        {
          path: "/talents",
          element: <Talents />,
        },
        // {
        //   path: "/talents/:id",
        //   element: <Talent />,
        // },
        // {
        //   path: "/talents/:id/commissions",
        //   element: <Commissions />,
        // },
      ],
    },
  ]);

  // return <RouterProvider router={router} />;
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
