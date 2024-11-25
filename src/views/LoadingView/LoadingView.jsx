import {DotLoading, Mask} from "antd-mobile";
import {useState} from "react";
import styles from "./LoadingView.module.css";

export default function LoadingView() {
    const [visible, setVisible] = useState(false)
    return (
        <Mask visible={visible} onMaskClick={() => setVisible(false)} >
            <div style={styles.overlayContent}>
                <DotLoading color='primary
                '/>
            </div>

        </Mask>
    )
}