import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";

function Routes() {
	return(
	<>
		<Route exact path="/accounts/profile" component={Profile} />		
		<Route exact path="/accounts/login"   component={Login}   />	
		<Route exact path="/accounts/signup"  component={Signup} />	
	</>
	)
}

export default Routes;
