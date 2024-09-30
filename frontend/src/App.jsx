import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import bg from "./assets/bg.jpg"; 

function App() {
	const { authUser } = useAuthContext();

	
	const backgroundStyle = {
		backgroundImage: `url(${bg})`, 
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		height: "100vh", 
		margin: 0, 
	};

	return (
		<div className='p-4 h-screen flex items-center justify-center' style={backgroundStyle}>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
