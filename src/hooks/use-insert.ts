import { useState,useEffect } from 'react'
import {InsertParam} from '../type'
import {message} from 'antd'
export default function useInsert<T>(props:InsertParam<T>){
	const [isModalOpen,setIsModalOpen] = useState(false)
	const handleOk = async ()=>{
		let formData = props.form.getFieldsValue(true)
		console.log("formData",formData)
		formData = props.converData(formData)
		let res = formData.id? (props.updateData && await props.updateData(formData)):(props.addData && await props.addData(formData))
		console.log("成功啦",res)
		 message.success(res?.message)
		 props.success && props.success()
		 setIsModalOpen(false)
	}
	const setInfo = async (id:string)=>{
		let res =   await props.getDetail!(id)
		 let data =  props.converDetailData(res)
		 console.log("data",data)
		 props.form.setFieldsValue(data as any)
		setIsModalOpen(true)
	}
	const handleCancel = ()=>{
		 props.form.resetFields()
		 setIsModalOpen(false)
	}
	useEffect(()=>{
		if(!isModalOpen){
			props.form.resetFields()
		}
	},[isModalOpen])
	return {
		isModalOpen,handleOk,handleCancel,setIsModalOpen,setInfo
	}
}