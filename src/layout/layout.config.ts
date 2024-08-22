
import {Role} from '../type'
import BannerManage from '../pages/bannerManage/bannerManage'
import ActivityManage from '../pages/activityManage/activityManage'
import RegisterUserCheck from '../pages/registerUserCheck/registerUserCheck'
import AdminUserAdmin from '../pages/adminUserAdmin/adminUserAdmin'
import {IMenu} from './layout.type';
export const getMenu = ()=> [
            {
              key: '/bannerManage',
              label: '轮播图管理',
			  roles:[Role.ACTIVITYMANAGE],
			  component:BannerManage
            },
            {
              key: '/activityManage',
              label: '活动管理',
			  roles:[Role.ACTIVITYMANAGE],
			  component:ActivityManage
            },
            {
              key: '/userManage',
              label: '用户管理',
			   roles:[Role.USERMANAGE],
			  children:[
				  {
					 key: '/userManage/registerUserCheck',
					 label: '注册用户管理',
					 roles:[Role.USERMANAGE],
					component:RegisterUserCheck
				  },
				  {
					 key: '/userManage/adminUserAdmin',
					 label: '后台用户管理',
					  roles:[Role.USERMANAGE],
					component:AdminUserAdmin
				  }
			  ]
            },
          ] as IMenu []
		  