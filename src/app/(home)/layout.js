'use client'

import {Card, Space, TabBar} from "antd-mobile";
import {CheckShieldOutline, ClockCircleOutline} from "antd-mobile-icons";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import styles from './layout.module.css';
import {useSelector} from "react-redux";
import LoadingView from "@/views/LoadingView/LoadingView";

export default function HomeLayout({children}) {
    const currentUser = useSelector(state => state.currentUser);
    const pathname = usePathname();
    const router = useRouter();

    const setRouteActive = (value) => {
        router.push(value)
    }

    const tabList = [
        {
            key: '/today',
            title: '今天',
            icon: <CheckShieldOutline/>,
        },
        {
            key: '/history',
            title: '历史',
            icon: <ClockCircleOutline/>,
        }
    ]

    return (
        <div>
            <div className={styles.content}>
                <Card bodyClassName={styles.info}>
                    <Space direction={"vertical"}>
                        {currentUser.isLoading ? (
                            <LoadingView/>
                        ) : (
                            <>
                                <div>{currentUser.name}</div>
                                <Space>
                                    {currentUser.sex === 1 ? '男娃' : '女娃'}
                                </Space>
                            </>
                        )}
                    </Space>
                </Card>

                {children}
            </div>
            <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabList.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                ))}
            </TabBar>

        </div>
    );
}
