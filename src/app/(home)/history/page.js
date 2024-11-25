'use client'

import {Button, Card, DatePicker, Form, Input, Picker, Selector} from "antd-mobile";
import {useEffect, useMemo, useState} from "react";
import {format} from 'date-fns';
import TagList from "@/component/tagList/tagList";
import RecordList from "@/component/list/list";
import {PayCircleOutline} from "antd-mobile-icons";
import styles from './page.module.css';
import {useDispatch, useSelector} from "react-redux";
import {fireListRecordsThunk} from "@/redux/slices/recordsSlice";
import {toast} from "react-hot-toast";
import {summary} from "@/api/record";


export default function History() {
    const [summaryData, setSummaryData] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fireListRecordsThunk({
            record_at: format(new Date(), 'yyyy-MM-dd')
        }))

        async function fetchData() {
            const {data} = await summary({
                record_at: format(new Date(), 'yyyy-MM-dd')
            })
            setSummaryData(data)
        }

        fetchData()
    }, [dispatch])


    const basicColumns = [
        [
            {label: '喝奶', value: '1'},
            {label: '母乳', value: '2'},
            {label: '尿尿', value: '3'},
            {label: '拉屎', value: '4'},
        ],
    ]
    const [actionSelectVisible, setActionSelectVisible] = useState(false)
    const [actionValue, setActionValue] = useState()

    const [timeSelectVisible, setTimeSelectVisible] = useState(false)
    const [timeValue, setTimeValue] = useState()
    const onFinish = (values) => {
        const actionMapping = {
            '1': 'MILK',
            '2': 'BREAST',
            '3': 'PEE',
            '4': 'POOP',
        }
        const query = {
            record_at: format(new Date(), 'yyyy-MM-dd'),
            type: actionMapping[actionValue],
        }
        if (timeValue) {
            query.record_at = format(new Date(timeValue), 'yyyy-MM-dd')
        }
        dispatch(fireListRecordsThunk(query))
    }
    const tagActionMapping = {
        'MILK': '喝奶',
        'BREAST': '母乳',
        'PEE': '尿尿',
        'POOP': '拉屎',
    }
    const tagSummary = useMemo(() => {
            const baseTags = {
                'MILK': 0,
                'BREAST': 0,
                'PEE': 0,
                'POOP': 0,
            }
            summaryData.forEach(({type, count}) => {
                baseTags[type] = count
            })
            return Object.entries(baseTags).map(([type, count]) => {
                return {
                    type,
                    count,
                    label: tagActionMapping[type]
                }
            })

        }, [summaryData]
    )
    const userRecords = useSelector(state => state.records.records)
    return (
        <>
            <Card>
                <Form
                    onFinish={onFinish}
                    layout='horizontal'
                    footer={
                        <Button block type='submit' color='primary' size='large'>
                            查询
                        </Button>
                    }
                >
                    <Form.Item
                        label='时间'
                    >
                        {
                            timeValue && (
                                <div onClick={() => {
                                    setTimeSelectVisible(true)
                                }}>
                                    {timeValue}
                                </div>
                            )
                        }
                        {
                            !timeValue && (
                                <Button
                                    onClick={() => {
                                        setTimeSelectVisible(true)
                                    }}
                                >
                                    选择
                                </Button>
                            )
                        }
                        <DatePicker
                            visible={timeSelectVisible}
                            onClose={() => {
                                setTimeSelectVisible(false)
                            }}
                            defaultValue={new Date()}
                            precision='day'
                            onConfirm={val => {
                                setTimeValue(format(val, 'yyyy/MM/dd HH:mm'))
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label='动作'
                    >
                        {!actionValue &&
                            <Button
                                onClick={() => {
                                    setActionSelectVisible(true)
                                }}
                            >
                                选择
                            </Button>
                        }
                        {
                            actionValue && (
                                <div onClick={() => {
                                    setActionSelectVisible(true)
                                }}>
                                    {basicColumns[0].find(item => item.value === actionValue)?.label}
                                </div>

                            )
                        }
                        <Picker
                            columns={basicColumns}
                            visible={actionSelectVisible}
                            onClose={() => {
                                setActionSelectVisible(false)
                            }}
                            value={actionValue}
                            onConfirm={v => {
                                setActionValue(v[0])
                            }}
                        />
                    </Form.Item>
                </Form>
            </Card>
            <Card>
                <TagList tagSummary={tagSummary}/>
            </Card>
            <div className={styles.listView}>
                <RecordList records={userRecords}/>
            </div>
        </>
    );
}