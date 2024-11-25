'use client'


import {
    Button,
    Card,
    Form,
    DatePicker,
    Popup,
    Space,
    Stepper,
    Switch,
    TextArea,
    Toast,
    Picker, Input, Selector, Modal, Empty
} from "antd-mobile";
import {PayCircleOutline, SetOutline, UnorderedListOutline} from "antd-mobile-icons";
import styles from './page.module.css';
import {useEffect, useMemo, useState} from "react";
import {format} from 'date-fns';
import { toast } from 'react-hot-toast';
import List from "@/component/list/list";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentUserThunk} from "@/redux/slices/currentUserSlice";
import {addRecord, fireCreateRecordThunk, fireListRecordsThunk} from "@/redux/slices/recordsSlice";
import {createRecord} from "@/api/record";
import LoadingView from "@/views/LoadingView/LoadingView";
import { Skeleton } from 'antd-mobile'



export default function Today() {
    const dispatch = useDispatch()
    const userRecords = useSelector(state => state.records.records)
    useEffect(() => {
        dispatch(fireListRecordsThunk({
            record_at: format(new Date(), 'yyyy-MM-dd')
        }))
    },[dispatch])

    const actions = [
        "喝奶", "母乳", "尿尿", "便便",
    ]
    const handlerClick = (action) => {
        setAction(action)
        setVisible(true)
        setBreastMilkFlag(false)
        setDirection('1')
    }

    const [visible, setVisible] = useState(false)
    const [action, setAction] = useState()


    const now = new Date();
    const [selectedTime, setSelectedTime] = useState([now.getHours(), now.getMinutes()]);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const hourColumns = Array.from({length: 24}, (_, i) => ({label: `${i}点`, value: i}));
    const minuteColumns = Array.from({length: 60}, (_, i) => ({label: `${i}分`, value: i}));
    const basicColumns = [hourColumns, minuteColumns]

    const timeStr = useMemo(() => {
        const [hour, minute] = selectedTime;
        const now = new Date();
        now.setHours(hour);
        now.setMinutes(minute);
        return format(now, 'yyyy/MM/dd HH:mm');
    }, [selectedTime]);
    const [breastMilkFlag, setBreastMilkFlag] = useState(false);
    const [direction, setDirection] = useState('1');

    const TimeActions = [
        "1分钟之前",
        "5分钟之前",
        "10分钟之前",
        "15分钟之前",
        "20分钟之前",
        "30分钟之前",
    ]
    const options = [
        {
            label: '左边',
            value: '1',
        },
        {
            label: '右边',
            value: '2',
        },
        {
            label: '两边',
            value: '3',
        },
    ]
    function DrinkView({timeStr, setSelectedTime, setBreastMilkFlag, breastMilkFlag}){
        return (
            <>
                <Form.Item
                    label='时间'
                >
                    <div onClick={() => {
                        setDatePickerVisible(true)
                    }}>
                        {timeStr}
                    </div>
                    <div className={styles.timeActionContainer}>
                        {
                            TimeActions.map((action, index) => {
                                return <Button
                                    key={index}
                                    size={"small"}
                                    className={styles.timeAction}
                                    onClick={() => {
                                        const timeMapping = {
                                            "1分钟之前": [now.getHours(), now.getMinutes() - 1],
                                            "5分钟之前": [now.getHours(), now.getMinutes() - 5],
                                            "10分钟之前": [now.getHours(), now.getMinutes() - 10],
                                            "15分钟之前": [now.getHours(), now.getMinutes() - 15],
                                            "20分钟之前": [now.getHours(), now.getMinutes() - 20],
                                            "30分钟之前": [now.getHours(), now.getMinutes() - 30],
                                        }
                                        setSelectedTime(timeMapping[action])
                                    }}
                                >{action}</Button>
                            })
                        }
                    </div>
                    <Picker
                        columns={basicColumns}
                        visible={datePickerVisible}
                        onClose={() => {
                            setDatePickerVisible(false)
                        }}
                        value={selectedTime}
                        onConfirm={v => {
                            setSelectedTime(v)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label='母乳'
                >
                    <Switch
                        checked={breastMilkFlag}
                        onChange={(checked) => {
                            setBreastMilkFlag(checked)
                        }}
                        uncheckedText='关'
                    />
                </Form.Item>
                <Form.Item
                    name='value'
                    label='奶量'
                    rules={[{required: true, message: '奶量不能为空'}]}
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Input placeholder='请输入奶量ml' suffix="ml"/>
                        <span style={{margin: '0  20px'}}>ml</span>
                    </div>
                </Form.Item>
            </>
        )
    }
    function RecordView({timeStr, setSelectedTime}){
        return (
            <>
            <Form.Item
                label='时间'
            >
                <div onClick={() => {
                    setDatePickerVisible(true)
                }}>
                    {timeStr}
                </div>
                <div className={styles.timeActionContainer}>
                    {
                        TimeActions.map((action, index) => {
                            return <Button
                                key={index}
                                size={"small"}
                                className={styles.timeAction}
                                onClick={() => {
                                    const timeMapping = {
                                        "1分钟之前": [now.getHours(), now.getMinutes() - 1],
                                        "5分钟之前": [now.getHours(), now.getMinutes() - 5],
                                        "10分钟之前": [now.getHours(), now.getMinutes() - 10],
                                        "15分钟之前": [now.getHours(), now.getMinutes() - 15],
                                        "20分钟之前": [now.getHours(), now.getMinutes() - 20],
                                        "30分钟之前": [now.getHours(), now.getMinutes() - 30],
                                    }
                                    setSelectedTime(timeMapping[action])
                                }}
                            >{action}</Button>
                        })
                    }
                </div>
                <Picker
                    columns={basicColumns}
                    visible={datePickerVisible}
                    onClose={() => {
                        setDatePickerVisible(false)
                    }}
                    value={selectedTime}
                    onConfirm={v => {
                        setSelectedTime(v)
                    }}
                />
            </Form.Item>
         </>
        )
    }
    function BreastView({timeStr, setSelectedTime, setDirection, direction}){
        return (
            <>
                <Form.Item
                    label='时间'
                >
                    <div onClick={() => {
                        setDatePickerVisible(true)
                    }}>
                        {timeStr}
                    </div>
                    <div className={styles.timeActionContainer}>
                        {
                            TimeActions.map((action, index) => {
                                return <Button
                                    key={index}
                                    size={"small"}
                                    className={styles.timeAction}
                                    onClick={() => {
                                        const timeMapping = {
                                            "1分钟之前": [now.getHours(), now.getMinutes() - 1],
                                            "5分钟之前": [now.getHours(), now.getMinutes() - 5],
                                            "10分钟之前": [now.getHours(), now.getMinutes() - 10],
                                            "15分钟之前": [now.getHours(), now.getMinutes() - 15],
                                            "20分钟之前": [now.getHours(), now.getMinutes() - 20],
                                            "30分钟之前": [now.getHours(), now.getMinutes() - 30],
                                        }
                                        setSelectedTime(timeMapping[action])
                                    }}
                                >{action}</Button>
                            })
                        }
                    </div>
                    <Picker
                        columns={basicColumns}
                        visible={datePickerVisible}
                        onClose={() => {
                            setDatePickerVisible(false)
                        }}
                        value={selectedTime}
                        onConfirm={v => {
                            setSelectedTime(v)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name='value'
                    label='时长'
                    rules={[{required: true, message: '时长不能为空'}]}
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Input placeholder='请输入时长' suffix="分钟"/>
                        <span style={{margin: '0  20px'}}>分钟</span>
                    </div>
                </Form.Item>
                <Form.Item
                    label='方向'>
                    <Selector
                        options={options}
                        defaultValue={[direction]}
                        onChange={(arr, extend) => setDirection(arr[0])}
                    />
                </Form.Item>
            </>
        )
    }

    const actionPopup = {
        "喝奶": <DrinkView  timeStr={timeStr} setSelectedTime={setSelectedTime} setBreastMilkFlag={setBreastMilkFlag} breastMilkFlag={breastMilkFlag}/>,
        "母乳": <BreastView timeStr={timeStr} setSelectedTime={setSelectedTime} setDirection={setDirection} direction={direction} />,
        "尿尿": <RecordView timeStr={timeStr} setSelectedTime={setSelectedTime}/>,
        "便便": <RecordView timeStr={timeStr} setSelectedTime={setSelectedTime}/>,
    }
    const handleFormSubmit = async (values) => {
        const actionTypeMapping = {
                "喝奶": "MILK",
                "母乳": "BREAST",
                "尿尿": "PEE",
                "便便": "POOP",
        }
        const directionMapping = {
            "1": "LEFT",
            "2": "RIGHT",
            "3": "BOTH",
        }
        setVisible(false)
        const payload = {
            type:actionTypeMapping[action],
            record_at: timeStr,
            value: values.value,
            is_breast: breastMilkFlag,
            direction: directionMapping[direction]
        }
        try {
            const {data} = await createRecord(payload)
            dispatch(addRecord(data))
            toast.success('提交成功',{
                duration: 1000
            });
        } catch (e) {
            toast.error('提交失败');
        }
    }
    return (
        <>
            {/*列表和按钮区域*/}
            <Card>
                {/*列表区域*/}
                <div className={styles.listView}>
                    {userRecords?.length===0  &&<Empty />}
                    {userRecords.length > 0 && <List records={userRecords} />}
                </div>
                {/*按钮区域*/}
                <div className={styles.actionContainer}>
                    {
                        actions.map((action, index) => {
                            return <Button
                                key={index}
                                size={"large"}
                                className={styles.action}
                                onClick={() => {
                                    handlerClick(action)
                                }}
                            >{action}</Button>
                        })
                    }
                </div>
                {/*选择弹窗*/}
                <Popup
                    visible={visible}
                    onMaskClick={() => {
                        setVisible(false)
                    }}
                    onClose={() => {
                        setVisible(false)
                    }}
                    bodyStyle={{height: '70vh'}}
                >
                    <Form
                        layout='horizontal'
                        footer={
                            <Button block type='submit' color='primary' size='large'>
                                确定
                            </Button>
                        }
                        onFinish={handleFormSubmit}

                    >
                        <Form.Header>{action}</Form.Header>
                        {actionPopup[action]}
                    </Form>
                </Popup>
            </Card>
        </>
    );
}