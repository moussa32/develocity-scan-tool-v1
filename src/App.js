import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet, redirect } from "react-router-dom";
import { About } from "./Pages/About";
import { PrivacyPolicy } from "./Pages/PrivacyPolicy/PrivacyPolicy";
import { WelcomingModal } from "./components/Home/WelcomingModal/WelcomingModal";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { ErrorBoundary } from "react-error-boundary";
import Changelog from "./Pages/Changelog/Changelog";
import PageLoader from "./components/common/PageLoader";
import "./App.css";
import instance from "./config/axiosconfig";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
const Home = lazy(() => import("./Pages/Home/Home"));
const Tokens = lazy(() => import("./Pages/Tokens/Tokens"));
const Token = lazy(() => import("./Pages/Token/Token"));
const SelectTokenNetwork = lazy(() => import("./Pages/SelectTokenNetwork/SelectTokenNetwork"));

const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "tokens",
        element: <Tokens />,
      },
      {
        path: "Changelog",
        element: <Changelog />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/404",
        element: <NotFound />,
      },
      {
        path: "token",
        loader: ({ params }) => {
          // Access to route token without contractAddress is banned
          if (!params.contractAddress) {
            return redirect("/404");
          }
          return <Outlet />;
        },
        children: [
          {
            path: ":contractAddress",
            loader: async ({ params }) => {
              // Render this route only when valid contractAddress
              if (!params.contractAddress.startsWith("0x")) {
                return redirect("/404");
              }
              const contractNetworks = await instance(`static/getContractNetwork/${params.contractAddress}`);
              return contractNetworks;
            },
            element: <SelectTokenNetwork />,
          },
          {
            path: ":network/:contractAddress",
            element: <Token />,
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const { i18n } = useTranslation();
  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#9f4ae8",
            fontFamily: "SF Pro Display Regular",
          },
          components: {
            Button: {
              borderRadius: 2,
              colorBgContainer: "#A480F6",
              colorText: "#fff",
              colorPrimaryHover: "#fff",
            },
          },
        }}
        direction={i18n.dir()}
      >
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router} />
        </Suspense>
        <WelcomingModal />
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
