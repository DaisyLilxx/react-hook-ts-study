import { useEffect, useState } from 'react'
import {IFetchListProps,BaseParamsParams,IBasePagination} from '../type'
export default function useFetchList<Response>(props:IFetchListProps<Response>){
	const [dataSource,setDataSource] = useState<Response[]>([])
	const [filterParams,setFilterParams] = useState(new BaseParamsParams())
	const [total,setTotal] = useState(0)
	useEffect(()=>{
		getData()
	},[filterParams])
	const getData = async ()=>{
		const {list,pagination} = await props.Api({...filterParams,...props.defaultParams})
		console.log("paras",{...filterParams,...props.defaultParams})
		list.forEach((item:any)=>{
			item.key = item.id
		})
		setDataSource(list)
		setTotal(pagination.total)
	}
	return {
		dataSource,total,filterParams,setFilterParams
	}
}