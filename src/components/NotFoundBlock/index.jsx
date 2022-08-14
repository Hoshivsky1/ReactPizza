import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1 >
                <span>😕</span>
                <br />
                Нічого не знайдено
            </h1>
            <p className={styles.description}>Нажаль даної сторінки немає в нашому інтернет-магазині</p>
        </div>
    );
};

export default NotFoundBlock;
