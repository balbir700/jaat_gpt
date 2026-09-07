import { Auth, googleProvider } from "../utils/firebase.js";
import { signInWithPopup } from "firebase/auth";
import { api } from "../utils/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      dispatch(setUserData(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(Auth, googleProvider);

      const token = await result.user.getIdToken();

      await handleLogin(token);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!userData && (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
          {/* Navbar */}
          <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
            <h1 className="text-2xl font-bold tracking-wide">
              My<span className="text-green-400">App</span>
            </h1>

            <button
              onClick={googleLogin}
              className="rounded-lg border border-gray-700 px-5 py-2 text-sm font-medium
                     transition hover:border-green-400 hover:text-green-400"
            >
              Sign In
            </button>
          </nav>

          {/* Hero Section */}
          <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6">
            <div className="max-w-3xl text-center">
              <div
                className="mb-6 inline-block rounded-full border border-green-400/30
                          bg-green-400/10 px-4 py-2 text-sm text-green-400"
              >
                Welcome to MyApp
              </div>

              <h2 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
                Build something
                <span className="block text-green-400">amazing.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
                A simple and modern application built with React, Firebase
                authentication, Redux and a powerful backend.
              </p>

              {/* Google Login */}
              <button
                onClick={googleLogin}
                className="mt-10 flex mx-auto items-center gap-3 rounded-xl
                       bg-white px-7 py-4 font-semibold text-gray-900
                       shadow-lg transition duration-300
                       hover:-translate-y-1 hover:bg-gray-100 hover:shadow-green-400/20"
              >
                {/* Google Logo */}
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.26Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 21.72c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.72Z"
                    fill="#34A853"
                  />
                  <path
                    d="M6.54 13.81A5.85 5.85 0 0 1 6.23 12c0-.63.11-1.24.31-1.81V7.66H3.3A9.73 9.73 0 0 0 2.28 12c0 1.57.38 3.05 1.02 4.34l3.24-2.53Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 6.16c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.25 14.63 2.28 12 2.28a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53c.77-2.31 2.92-4.03 5.46-4.03Z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="mt-5 text-sm text-gray-600">
                Secure authentication powered by Firebase
              </p>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default Home;
