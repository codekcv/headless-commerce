import {
  AuditOutlined,
  DesktopOutlined,
  IdcardOutlined,
  PieChartOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Customers from 'menus/client/Customers';
import Support from 'menus/client/Support';
import Dashboard from 'menus/Dashboard';
import Categories from 'menus/product/Categories';
import Items from 'menus/product/Items';
import Reviews from 'menus/Reviews';

const menus = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DesktopOutlined />,
    component: <Dashboard />,
  },
  {
    title: 'Product',
    path: '/product',
    icon: <ShopOutlined />,
    subroutes: [
      {
        path: '/items',
        title: 'Items',
        icon: <ShoppingOutlined />,
        component: <Items />,
      },
      {
        path: '/categories',
        title: 'Categories',
        icon: <PieChartOutlined />,
        component: <Categories />,
      },
    ],
  },
  {
    title: 'Client',
    path: '/client',
    icon: <IdcardOutlined />,
    subroutes: [
      {
        path: '/customers',
        title: 'Customers',
        icon: <UserOutlined />,
        component: <Customers />,
      },
      {
        path: '/support',
        title: 'Support',
        icon: <TeamOutlined />,
        component: <Support />,
      },
    ],
  },
  {
    title: 'Reviews',
    path: '/reviews',
    icon: <AuditOutlined />,
    component: <Reviews />,
  },
];

export default menus;
