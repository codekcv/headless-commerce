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

const menus = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DesktopOutlined />,
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
      },
      {
        path: '/categories',
        title: 'Categories',
        icon: <PieChartOutlined />,
        disabled: true,
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
      },
      {
        path: '/support',
        title: 'Support',
        icon: <TeamOutlined />,
        disabled: true,
      },
    ],
  },
  {
    title: 'Reviews',
    path: '/reviews',
    icon: <AuditOutlined />,
    disabled: true,
  },
];

export default menus;
