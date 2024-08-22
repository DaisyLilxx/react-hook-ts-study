import request from '../utils/request'
import {LoginParams,LoginResponse,ActivityParam,IActivity,IBasePagination,reqResponse,RegisterParam,RegisterRes} from "../type"
export default {
	login(data:LoginParams){
		return request.post<LoginParams,LoginResponse>('/admin/base/open/login',data)
	},
	// 获取活动列表
	getActivitys(data:ActivityParam){
		return request.post<ActivityParam,IBasePagination<IActivity>>('/admin/base/activityManage/page',data)
	},
	//  /admin/base/activityManage/delete  删除接口 参数 ids:[]
	activitysDelete(ids:React.Key[]){
		return request.post<React.Key[],reqResponse>('/admin/base/activityManage/delete',ids)
	},
	//  /admin/base/activityManage/delete  删除接口 参数 ids:[]
	activitysAdd(data:IActivity){
		console.log("add=data",data)
		return request.post<IActivity,reqResponse>('/admin/base/activityManage/add',data)
	},
	activitysUpdate(data:IActivity){
		return request.post<IActivity,reqResponse>('/admin/base/activityManage/update',data)
	},
	activitysDetail(id:string){
		return request.post<string,IActivity>('/admin/base/activityManage/detail',{id})
	},
	registerData(data:RegisterParam){
		return request.post<RegisterParam,IBasePagination<RegisterRes>>('/admin/base/user/page',data)
	},
	registerApply(id:string){
		return request.post<string,{}>('/admin/base/user/update',{id})
	},
	checkUser(data:Pick<RegisterRes,'checkStatus'|'id'>){
		return request.post<Pick<RegisterRes,'checkStatus'|'id'>,{}>('/admin/base/user/update',data)
	},
}