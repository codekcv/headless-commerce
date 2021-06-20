import Dashboard from 'menus/Dashboard';
import Reviews from 'menus/Reviews';
import Categories from 'menus/product/Categories';
import Items from 'menus/product/Items';
import Customers from 'menus/client/Customers';
import Support from 'menus/client/Support';
import {
  PieChartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined,
  DesktopOutlined,
  AuditOutlined,
  ShopOutlined,
  IdcardOutlined,
} from '@ant-design/icons';

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
        path: '/categories',
        title: 'Categories',
        icon: <PieChartOutlined />,
        component: <Categories />,
      },
      {
        path: '/items',
        title: 'Items',
        icon: <ShoppingOutlined />,
        component: <Items />,
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
