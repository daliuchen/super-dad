import {FixedSizeList as VirtualizedList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styles from "@/app/(home)/today/page.module.css";
import {List} from "antd-mobile";
import {
    AntOutline,
    CloseCircleFill,
    FilterOutline, HeartFill,
    KoubeiFill,
    KoubeiOutline,
    MovieOutline,
    StarFill
} from "antd-mobile-icons";
import {useRef,useEffect} from "react";

const Row = function ({index, style,data}) {
    const item = data[index];
    const typeIconMapping = {
        "MILK": <HeartFill />,
        "BREAST": <StarFill />,
        "PEE": <KoubeiFill />,
        "POOP": <CloseCircleFill />
    }
    return (
        <List.Item
            style={{...style, padding: 0, borderBottom: '1px solid #f0f0f0'}}
            key={index}
            prefix={
                <div className={styles.itemPrefix}>
                    {typeIconMapping[item.type]}
                </div>
            }
            description={item.description}>
            {item.name}
        </List.Item>
    )
}

export default function RecordList({records}) {

    return (<AutoSizer>
            {({height, width}) => (
                    <VirtualizedList
                        key={records.length}
                        height={height}
                        itemCount={records.length}
                        width={width}
                        itemData={records}  // 注意这里的改变
                        itemSize={60}
                    >
                        {Row}
                    </VirtualizedList>
            )}
        </AutoSizer>
    )
}
