import { Table,Space,Modal, Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,message} from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {RegisterRes,InsertParam} from '../../type'
import useFetchList from '../../hooks/use-fetch-list'
import useDelete from '../../hooks/use-delete'
import Api from '../../api';
import moment from 'moment';
import { useState } from 'react';
const {confirm} = Modal
 const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ActivityManage: React.FC = () =>{
	const [form] = Form.useForm()
	const { dataSource,total,filterParams,setFilterParams} = useFetchList<RegisterRes>({
		Api:Api.registerData,
		defaultParams:{
			isback:false
		}
	})
	const { ids,setIds,delData } = useDelete({
		deleteApi:Api.activitysDelete,
		success(){
			setFilterParams({...filterParams,page:1})
		},
		tit:'是否确定删除'
	})
	const groupData = [{status:'',text:'全部'},{status:'0',text:'审核中'},{status:'1',text:'已通过'},{status:'2',text:'已拒绝'},]
	const groupHtml = groupData.map(item=><Radio.Button value={item.status}>{item.text}</Radio.Button>)
	const checkFun = (record:RegisterRes)=>{
		let str = record.checkStatus == '1'?'拒绝':'通过'
		confirm({
			title:`确定${str}?此操作不可逆`,
			async onOk(){
				let res = await Api.registerApply(record.id)
				console.log("checkFun-res",res)
				message.success(res);
				setFilterParams({...filterParams,page:1})
			}
		})
	}
	const columns: ColumnsType<RegisterRes> = [
	  {
	    title: 'id',
	    dataIndex: 'id',
	    key: 'id',
		width:'100px'
	  },
	  {
	    title: '昵称',
	    dataIndex: 'nickName',
	    key: 'nickName',
		width:'100px'
	  },
	  {
	    title: '手机号',
	    dataIndex: 'phone',
	    key: 'phone',
		width:'100px'
	  },
	  {
	    title: '密码',
	    dataIndex: 'password',
	    key: 'password',
	  },
	  {
	    title: '审核状态',
	    dataIndex: 'checkStatus',
	    key: 'checkStatus',
	  		render: (_, record) => {
	  			let statusObj = groupData.find(n=>n.status == record.checkStatus)
				return statusObj!.text
	  		},
	  },
	  {
	    title: '审核',
	    dataIndex: 'checkStatus',
	    key: 'checkStatus',
		width:'150px',
		render: (_, record) => (
		  <Space size="middle">
		    <Button type="primary" disabled={record.checkStatus != '0'} onClick={()=>checkFun(record) }>通过</Button>
		    <Button danger disabled={record.checkStatus != '0'}  onClick={()=>{ checkFun(record) } }>拒绝</Button>
		  </Space>
		),
	  },
	  {
	    title: '操作',
	    key: 'action',
	    render: (_, record) => (
	      <Space size="middle">
	        <Button danger onClick={()=>{ delData(record) } }>删除</Button>
	      </Space>
	    ),
	  },
	];
	const onChangeRadio = ({ target: { value } }: RadioChangeEvent)=>{
		console.log('radio4 checked', value);
		setFilterParams({...filterParams,checkStatus:value,page:1} as any)
	}
	return (
		<div>
			<Space>
				<Button type="primary" onClick={()=>{setFilterParams({...filterParams,page:1} as any)}}>刷新</Button>
				<Button danger disabled={ids.length==0} onClick={()=>{delData()}}>删除</Button>
				<Radio.Group  onChange={onChangeRadio}>
					{groupHtml}
				</Radio.Group>
				 <Input placeholder="请输入用户昵称" onChange={(e)=>{
					setFilterParams({...filterParams,nickName:e.target.value,page:1} as any)
				}}/>
			</Space>
			<Table 
			rowSelection={
				{
					type:'checkbox',
					onChange(selectedRowKeys, selectedRows) {
						console.log("selectedRowKeys",selectedRowKeys,selectedRows)
						setIds(selectedRowKeys)
					}
				}
			}
			columns={columns} dataSource={dataSource}/>
		</div>
	)
}
export default ActivityManage;