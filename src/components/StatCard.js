import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ title, value, trend, trendLabel, icon, isHighlighted = false, color = 'amber' }) => {
    const isTrendUp = trend && (trend.toString().startsWith('+') || trend > 0 || trend.toString().includes('↑'));
    const trendClass = isTrendUp ? styles.trendUp : styles.trendDown;

    const colorClass = styles[color] || '';

    return (
        <div className={`${styles.card} ${isHighlighted ? styles.highlighted : ''} ${colorClass}`}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                <div className={styles.icon}>
                    {icon}
                </div>
            </div>

            <div className={styles.value}>{value}</div>

            <div className={`${styles.trend} ${trendClass}`}>
                <span>{trend}</span>
                <span className={styles.trendLabel}>{trendLabel}</span>
            </div>
        </div>
    );
};

export default StatCard;
