import React from 'react';
import styles from './Summary.module.scss';

export type SummaryItem = {
    label: string;
    value: string;
};

type Props = {
    items: SummaryItem[];
};

export function Summary({ items }: Props) {
    return (
        <>
            {items.length && (
                <div className={styles.summary}>
                    {items.map((item, index)=> (
                        <div className={styles.item} key={index}>
                            <p className={styles.label}>{item.label}</p>
                            <p className={styles.value}>{item.value}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
