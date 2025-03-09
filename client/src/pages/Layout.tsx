import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './Home';
import MovieList from './movie/MovieList';
import AddMovie from './movie/AddMovie';
import EditMovie from './movie/EditMovie';

import { Layout } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
const { Header, Footer, Sider, Content } = Layout;

const items: MenuItem[] = [
    {
        key: 'list',
        label: '电影列表',
        icon: <MailOutlined />,
    },
    {
        key: 'add',
        label: '添加电影',
        icon: <MailOutlined />,
    },
];
const _Layout: React.FC = () => {
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case 'list':
                navigate('/movie');
                break;
            case 'add':
                navigate('/movie/add');
                break;
        }
    };
    return (
        <div className="container">
            <Layout>
                <Header>
                    <NavLink to="/">柚子电影管理系统</NavLink>
                </Header>
                <Layout>
                    <Sider width="15%" >
                        <Menu
                            onClick={onClick}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme='dark'
                            items={items}
                        />
                    </Sider>
                    <Content>
                        <div className='main'>
                            <Routes>
                                <Route path="/" Component={Home} />
                                <Route path="/movie" Component={MovieList as any} />
                                <Route path="/movie/add" Component={AddMovie} />
                                <Route path="/movie/edit/:id" Component={EditMovie} />
                            </Routes>
                        </div>

                    </Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    )
}

export default _Layout;