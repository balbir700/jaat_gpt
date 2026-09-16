import { useEffect } from "react";
import { useDispatch } from "react-redux";

import getCurrentUser from "./features/getCurrentUser";
import { setUserData } from "./redux/userSlice";

import Home from "./Home";
import Sidebar from "./components/Sidebar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const userData = await getCurrentUser();
      dispatch(setUserData(userData));
    };

    getUser();
  }, [dispatch]);

  return (
    <div>
      <Home />
      <Sidebar />
    </div>
  );
}

export default App;
