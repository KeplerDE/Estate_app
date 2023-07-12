import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { StyledEngineProvider } from "@mui/material";  //
import CssBaseline from '@mui/material/CssBaseline';
import { useImmerReducer } from "use-immer";




// Components
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Listings from "./Components/Listings";
import Testing from "./Components/Testing";
import Register from "./Components/Register";

//Contexts
import DispatchContext from "./Contexts/DispatchContext";
import StateContext from "./Contexts/StateContext";
function App() {
    const initialState = {
		userUsername: '',
		userEmail: '',
		userId: '',
        globalMessage: "Helloooooooooooooooooooo, i am child",
      	userToken: '',

  }
  function ReducerFunction(draft, action) {
	switch (action.type) {
		case "catchToken":
			draft.userToken = action.tokenValue;
			break;
		case "userSignsIn":
			draft.userUsername = action.usernameInfo;
			draft.userEmail = action.emailInfo;
			draft.userId = action.IdInfo;
			draft.userIsLogged = true;
			break;

  }
}


  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <StyledEngineProvider>
          <BrowserRouter>
            <CssBaseline />
            <Header />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/listings" element={<Listings />}/>
              <Route path="/testing" element={<Testing />}/>
              <Route path="/register" element={<Register />}/>
            </Routes>
          </BrowserRouter>
        </StyledEngineProvider>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;

