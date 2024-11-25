
import styles from './tagList.module.css';
import { Skeleton } from 'antd-mobile'

export default function TagList({tagSummary}) {
    console.log(tagSummary)
    return (
        <div className={styles.tagContainer}>
            {
                tagSummary ? (
                    tagSummary.map((item, index) => (
                        <div className={styles.tag} key={index}>
                            <div className={styles.label}>{item.label}</div>
                            <div className={styles.count}>{item.count}</div>
                        </div>
                    ))
                ) : (
                    <Skeleton.Title />
                )
            }
        </div>
    )
}