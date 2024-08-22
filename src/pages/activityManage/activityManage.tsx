import { Table,Space,Modal, Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,} from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {IActivity,InsertParam} from '../../type'
import useFetchList from '../../hooks/use-fetch-list'
import useDelete from '../../hooks/use-delete'
import useInsert from '../../hooks/use-insert'
import Api from '../../api';
import moment from 'moment';
import { useState } from 'react';
 const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ActivityManage: React.FC = () =>{
	const [form] = Form.useForm()
	const { dataSource,total,filterParams,setFilterParams} = useFetchList<IActivity>({
		Api:Api.getActivitys
	})
	const { ids,setIds,delData } = useDelete({
		deleteApi:Api.activitysDelete,
		success(){
			setFilterParams({...filterParams,page:1})
		},
		tit:'是否确定删除'
	})
	const data:IActivity[]=[]
	const {isModalOpen,handleOk,handleCancel,setIsModalOpen,setInfo} = useInsert({
		form,
		converData(data){
			if(data.activityDate){
				console.log("data.activityDate",data.activityDate)
				data.activityStartDate = data.activityDate[0].format('YYYY-MM-DD')
				data.activityEndDate = data.activityDate[1].format('YYYY-MM-DD')
				console.log("converData-data",data)
			}
			return data
		},
		getDetail:Api.activitysDetail,
		converDetailData(data){
			if(data.activityStartDate){
				data.activityDate = [
					moment(data.activityStartDate,'YYYY-MM-DD'),
					moment(data.activityEndDate,'YYYY-MM-DD')
				]
			}
			return data
		},
		updateData:Api.activitysUpdate,
		addData:Api.activitysAdd,
		success(){
			setFilterParams({...filterParams,page:1} )
		}
	})
	const editData = (record:IActivity)=>{
		setInfo(record.id)
	}
	const columns: ColumnsType<IActivity> = [
	  {
	    title: '活动名称',
	    dataIndex: 'activityName',
	    key: 'activityName',
	    render: text => <a>{text}</a>,
		width:'100px'
	  },
	  {
	    title: '活动状态',
	    dataIndex: 'activityRegistered',
	    key: 'activityRegistered',
		width:'100px'
	  },
	  {
	    title: '活动上限',
	    dataIndex: 'address1',
	    key: 'address1',
		width:'100px'
	  },
	  {
	    title: '报名人数',
	    dataIndex: 'address',
	    key: 'address',
	  },
	  {
	    title: '活动时间',
	    dataIndex: 'activityStartDate',
	    key: 'activityStartDate',
		width:'150px'
	  },
	  {
	    title: '主办方',
	    dataIndex: 'bussiness',
	    key: 'bussiness',
	  },
	  {
	    title: '操作',
	    key: 'action',
	    render: (_, record) => (
	      <Space size="middle">
	        <Button type="primary" onClick={()=>editData(record) }>编辑</Button>
	        <Button danger onClick={()=>{ delData(record) } }>删除</Button>
			<Button type="primary" >查看报名人数</Button>
	      </Space>
	    ),
	  },
	];
	const onChangeRadio = ({ target: { value } }: RadioChangeEvent)=>{
		console.log('radio4 checked', value);
		setFilterParams({...filterParams,activityStatus:value,page:1} as any)
	}
	
	
	return (
		<div>
			<Space>
				<Button type="primary" onClick={()=>{setIsModalOpen(true)}}>新增</Button>
				<Button danger onClick={()=>{delData()}}>删除</Button>
				<Radio.Group  onChange={onChangeRadio}>
					<Radio.Button value="large">全部</Radio.Button>
					<Radio.Button value="default">未开始</Radio.Button>
					<Radio.Button value="small">进行中</Radio.Button>
					<Radio.Button value="small">已结束</Radio.Button>
				</Radio.Group>
				 <Input placeholder="请输入活动" onChange={(e)=>{
					setFilterParams({...filterParams,activityName:e.target.value,page:1} as any)
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
			<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
			        <Form
						form={form}
						 labelCol={{ span: 4 }}
						 wrapperCol={{ span: 14 }}
						 layout="horizontal"
			           >
			            <Form.Item label="活动名" name="activityName" rules={[{ required: true, message: '请输入活动名' }]}>
			               <Input />
			            </Form.Item>
						<Form.Item label="活动上限" name="activityMax">
						   <Input />
						</Form.Item>
						<Form.Item label="活动时间" name="activityDate">
						  <RangePicker />
						</Form.Item>
						<Form.Item label="主办方" name="bussiness">
						   <Input />
						</Form.Item>
						<Form.Item label="活动封面" name="activityImg">
						   <Input />
						</Form.Item>
						<Form.Item label="活动详情" name="activityDesc">
						   <TextArea rows={4} />
						</Form.Item>
					</Form>
			      </Modal>
		</div>
	)
}
export default ActivityManage;