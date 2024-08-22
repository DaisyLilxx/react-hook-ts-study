import dva, { DvaOption } from "dva";
import route from './router'
import global from './model/global'
import { IGlobalState} from './type'
import './index.css'
const initialGlobalState = ()=>{
	const globalLocal = JSON.parse(localStorage.getItem("global") || '{}')
	return {
		...global.state,
		...globalLocal
	}
}
const app = dva({
	onStateChange(state:{global:IGlobalState}){
		localStorage.setItem("global",JSON.stringify(state.global))
	},
	initialState:{
		global:initialGlobalState()
	}
} as unknown as DvaOption);
app.router(route)
app.model(global)
//挂载并启动我们的项目
app.start("#root")