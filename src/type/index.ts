import {AnyAction} from "redux"
import type { FormInstance  } from 'rc-field-form';
import { Moment } from 'moment'
export interface BaseResponse<T>{
	code:number
	message:string
	data:T
}
export interface reqResponse{
	code:number
	message:string
}
export interface LoginParams {
	username:string,
	password:string
}
export enum Role {
	USERMANAGE = 'userManage',
	ACTIVITYMANAGE = 'activityManage'
}
export interface LoginResponse {
	token:string
	roles: Role[]
}
export interface IPayload<T extends Partial<AnyAction>>{
	payload:T
}
export interface IGlobalState extends LoginResponse{
	
}
export interface IBasePagination<T>{
	list:T[],
	pagination:{
		size:number
		page:number
		total:number
	}
}
// 分页参数
export class BaseParamsParams{
	public page = 1
	public size = 3
}
export interface IFetchListProps<Response>{
	Api:(params:any)=>Promise<IBasePagination<Response>>,
	defaultParams?:{}
}
export interface ActivityParam extends BaseParamsParams{
	activityStatus:string
	activityName:string
}
export interface RegisterParam extends BaseParamsParams{
	checkStatus:string
	username:string
}
export interface IActivity {
	activityMax:number
	activityName:string
	activityRegistered:number
	activityStartDate:string
	activityDesc:string
	activityEndDate:string
	activityDate?:Moment[],
	address:string
	// 主办方
	bussiness:string
	id:string
	wx:string
	activityImg:string
}
export interface DeleteParams{
	deleteApi:(data:React.Key[])=>Promise<{}>,
	success:()=>void,
	tit:string
}
export interface InsertParam<T>{
	form:FormInstance<T>,
	converData:(data:T)=>T,
	converDetailData:(data:T)=>T,
	getDetail:(id:string)=>Promise<T>,
	updateData?:(data:T)=>void,
	addData?:(data:T)=>Promise<reqResponse>,
	success:()=>void
}
export interface RegisterRes{
	checkStatus:string,
	id:string,
	isback:boolean,
	nickName:string,
	password:string,
	username:string,
	phone:string
	
}