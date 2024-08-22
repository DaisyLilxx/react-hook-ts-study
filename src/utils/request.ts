import axios,{AxiosResponse} from "axios";
import {BaseResponse} from "../type"
import { message } from "antd";
axios.interceptors.response.use((response:AxiosResponse<BaseResponse<any>>)=>{
	console.log("yayyy",response)
	if(response.data.code != 1000){
		console.log("yayyy",response.data)
		message.error(response.data.message)
		throw new Error(response.data.message)
	}
	return response.data.data
})
axios.interceptors.request.use((config)=>{
	console.log("yayyy--config",config)
	if(config.headers){
		const globalLocal = JSON.parse(localStorage.getItem("global")||'{}')
		config.headers["Authorization"] = globalLocal.token
	}
	return config
})
export default axios