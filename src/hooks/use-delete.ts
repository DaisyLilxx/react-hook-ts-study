import { useState } from "react"
import {DeleteParams} from '../type'
import { Modal } from 'antd';
export default function useDelete(props:DeleteParams){
	const [ids,setIds] = useState<React.Key[]>([])
	const delData = (idsVal?:any)=>{
		Modal.confirm({
		    title: '提示',
		    content: props.tit,
		    okText: '确认',
		    cancelText: '取消',
			async onOk(){
				let res = await props.deleteApi(idsVal?[idsVal]:ids)
				console.log("deleteApi",res)
				props.success()
			}
		  });
	}
	return {
		ids,
		setIds,
		delData
	}
}