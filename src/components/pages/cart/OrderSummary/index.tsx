import { Button } from "react-bootstrap";
import styles from "src/styles/CartPage.module.css";
import { clearCart } from "src/contexts/CartContext/actions";
import { useContext } from "react";
import CartContext from "src/contexts/CartContext";

const OrderSummary = () => {
    const { state, dispatch } = useContext(CartContext);
    const { totalPrice, totalItems } = state;
    
    return (
        <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRow}>
                <span>Items ({totalItems})</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={styles.free}>Free</span>
            </div>

            <hr className={styles.divider} />

            <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>

            <Button className={styles.checkoutBtn}>
                Proceed to Checkout
            </Button>
            <button className={styles.clearBtn} onClick={() => dispatch(clearCart())}>
                Clear Cart
            </button>
        </div>
    )
}

export default OrderSummary;