import { useRouter } from "next/router";
import styles from "src/styles/EmptyCart.module.css";

const EmptyCart = () => {
    const { push } = useRouter();

    return (
        <div className={styles.wrapper}>
            <div className={styles.iconWrap}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                </svg>
            </div>
            <h2 className={styles.title}>Your cart is empty</h2>
            <p className={styles.subtitle}>Looks like you haven't added anything yet.</p>
            <button className={styles.btn} onClick={() => push("/products")}>
                Browse Products
            </button>
        </div>
    );
};

export default EmptyCart;