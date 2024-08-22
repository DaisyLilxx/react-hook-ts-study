// dva里面的router和我们react-router-dom 一样
// src/router.tsx
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Layout from "./layout/layout"
import Login from "./pages/login/login"
import {RouterAPI} from 'dva'
export default (api?:RouterAPI)=>{
	if(api){
		return (
		<Router history={api.history}>
			<Switch>
				<Route path="/login">
						<Login></Login>
				</Route>
				<Route path="/">
					<Layout></Layout>
				</Route>
			</Switch>
		</Router>
		
		)
	}else return {}
}
// const RouterConfig = ({ history }: any) => (
//   <Router history={history}>
//     <Switch>
// 		<Route path="/login">
// 			<Login></Login>
// 		</Route>
// 		<Route path="/">
// 			<Layout></Layout>
// 		</Route>
//       {/* Add more routes here */}
//     </Switch>
//   </Router>
// );

// export default RouterConfig;
