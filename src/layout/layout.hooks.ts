import { useSelector } from "dva"
import { useEffect, useState } from "react"
import {getMenu} from './layout.config'
import {IGlobalState} from '../type'
import {IMenu} from './layout.type'
 const useLayout = ()=>{
	const [currentMenus,setCurrentMenus] = useState<IMenu[]>([])
	const  globalState = useSelector<{global:IGlobalState},IGlobalState>(
	({global})=>global
	)
	const getCurrentMenus = (menuArr = getMenu())=>{
		return menuArr.filter((item)=>{
			if(item.children){
				item.children = getCurrentMenus(item.children)
			}
			return item.roles.some((val)=> globalState?.roles?.includes(val))
		})
	}
	useEffect(()=>{
		setCurrentMenus(getCurrentMenus())
	},[])
	return {
		currentMenus
	}
}
export default useLayout