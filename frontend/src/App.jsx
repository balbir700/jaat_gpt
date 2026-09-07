import { useEffect } from "react";
import { useDispatch } from "react-redux";

import getCurrentUser from "./features/getCurrentUser";
import { setUserData } from "./redux/userSlice";

import Home from "./Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const userData = await getCurrentUser();
      dispatch(setUserData(userData));
    };

    getUser();
  }, [dispatch]);

  return <Home />;
}

export default App;
