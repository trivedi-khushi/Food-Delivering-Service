import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Error from './components/Error';
import Cart from './components/Cart';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import RestaurantMenu from './components/RestaurantMenu';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
  return (
    <Provider store={appStore}>
    <div>
      <Navbar />
      <Outlet />
    </div>
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
])

export default appRouter;
