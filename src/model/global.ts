import { Model, routerRedux } from "dva";
import type {IPayload,LoginResponse} from '../type'
export default {
	namespace: 'global',
	state:{},
	// 里面只能放纯函数，不能有副作用的函数
	reducers:{
		save(state,action: Partial<IPayload<any>>){
			return {...state,...action.payload}
		}
	},
	// 可以做异步操作，不能直接修改state，要修改state必须使用put调用reducers的方法
	effects:{
		*setUserInfo({payload}: Partial<IPayload<LoginResponse>>,{put}){
			yield put({
				type:'save',
				payload
			})
			yield put(routerRedux.push('/activityManage'))
		}
	},
	subscriptions:{
		setup({history}){
			history.listen((router)=>{
				const global = JSON.parse(localStorage.getItem("global") || '{}')
				const ignoreUrls = ['/login']
				if(!global.token && !ignoreUrls.includes(router.pathname)){
					history.push('/login')
				}
			})
			
		}
	}
} as Model