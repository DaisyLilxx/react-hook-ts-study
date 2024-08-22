import Mock from "mockjs";
Mock.mock('/admin/base/open/login','post',
	{
		code:1000,
		message:'success',
		data:{
			token:'sdfsdgdsghhfhgjtyruetert',
			roles:['userManage','activityManage']
	}
	
})
Mock.mock('/admin/base/activityManage/page','post',
	{
		code:1000,
		message:'success',
		data:{
			'list|1-10':[{
				'activityMax|+1':1,
				'activityName|1-10':2,
				'activityRegistered':1,
				'activityStartDate':"@date('yyyy-MM-dd')",  //模拟时间
				'activityDesc|1-40':'',
				'activityEndDate':"@date('yyyy-MM-dd')",  //模拟时间
				'address|1-30':'@county(true)',
				// 主办方
				'bussiness|1-20':'',
				'id|+3':2,
				'wx|+15':16,
				'activityImg|1-20':"@image()",
			}],
			pagination:{
				"size|1-40":2,   
				"page|1-10":1,
				"total|1-100":5,
			}
		}
	}
)
Mock.mock('/admin/base/activityManage/delete','post',
	{
		code:1000,
		data:{
			'message':'删除成功'	
		}
	}
)
Mock.mock('/admin/base/activityManage/add','post',
	 {
		code:1000,
		data:{
			'message':'添加成功'	
		}
		
	}
)
Mock.mock('/admin/base/activityManage/update','post',
	 {
		code:1000,
		data:{
			'message':'修改成功'	
		}
		
	}
)
Mock.mock('/admin/base/activityManage/detail','post',
	 {
		code:1000,
		data:{
				'activityMax|+1':1,
				'activityName|1-10':2,
				'activityRegistered':1,
				'activityStartDate':"@date('yyyy-MM-dd')",  //模拟时间
				'activityDesc|1-40':'',
				'activityEndDate':"@date('yyyy-MM-dd')",  //模拟时间
				'address|1-30':'@county(true)',
				// 主办方
				'bussiness|1-20':'',
				'id|+3':2,
				'wx|+15':16,
				'activityImg|1-20':"@image()",
			}
		
	}
)


Mock.mock('/admin/base/user/page','post',
	{
		code:1000,
		message:'success',
		data:{
			'list|1-10':[
				{
					"checkStatus|1":['0','1','2'],
					'id|+3':2,
					"isback|1":[false,true],
					'nickName|1-15':'',
					'password|1-14':'',
					'username|1-14':'',
					'phone|11': ''
				}
			],
			pagination:{
				"size|1-40":2,   
				"page|1-10":1,
				"total|1-100":5,
			}
		}
	}
)
Mock.mock('/admin/base/user/update','post',
	{
		code:1000,
		message:'success',
		data:'修改成功'
	}
)