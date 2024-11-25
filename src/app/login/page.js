'use client'

import {Button, Card, Checkbox, Form, Grid, Input, Radio, Space, Stepper, Switch, TextArea} from "antd-mobile";
import styles from './page.module.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postUserLoginThunk} from "@/redux/slices/currentUserSlice";
import {useRouter} from "next/navigation";
import { toast } from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser)
    const router = useRouter()

    const handleClick = async (values) => {
        const sex = values.sex='male'? 1:0
        values.sex = sex
        dispatch(postUserLoginThunk(values))
    }
    useEffect(()=>{
        if(user.token && user.status===null){
            router.push('/today')
        }
    },[user])


    return (
        <div className={styles.page}>
            <div className={styles.title}>
                欢迎登录 Super Dad
            </div>
            <Card>
                <Form
                    layout='horizontal'
                    footer={
                        <Button block type='submit' color='primary' size='large' loading={user.isLoading}>
                            登录
                        </Button>
                    }
                    onFinish={handleClick}
                >
                    <Form.Item
                        name='email'
                        label='邮箱'
                        rules={[{ required: true, message: '邮箱不能为空' }]}
                    >
                        <Input onChange={(e)=>{setEmail(e)}} placeholder='请输入邮箱' />
                    </Form.Item>
                    <Form.Item
                        name='name'
                        label='宝宝姓名'
                        rules={[{ required: true, message: '宝宝姓名不能为空' }]}
                    >
                        <Input onChange={(e)=>{setName(e)}} placeholder='请输入宝宝姓名' />
                    </Form.Item>
                    <Form.Item
                        name='sex'
                        label='宝宝性别'
                        rules={[{ required: true, message: '宝宝性别不能为空' }]}
                    >
                        <Radio.Group>
                            <Space>
                                <Radio value='male'>男</Radio>
                                <Radio value='female'>女</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}