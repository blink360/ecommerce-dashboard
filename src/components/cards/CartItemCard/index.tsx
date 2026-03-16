import { useContext } from "react";
import CartContext from "src/contexts/CartContext";
import { ICartItem } from "src/contexts/CartContext/actions";
import { removeFromCart, updateQuantity } from "src/contexts/CartContext/actions";
import styles from "src/styles/CartItem.module.css";

interface ICartItemProps {
    item: ICartItem;
}

const CartItemCard = ({ item }: ICartItemProps) => {
    const { dispatch } = useContext(CartContext);

    return (
        <div className={styles.cartItem}>
            <div className={styles.imageWrap}>
                <img src={item.image} alt={item.title} className={styles.image} />
            </div>

            <div className={styles.details}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.price}>${(item.price * item.quantity).toFixed(2)}</p>
                <p className={styles.unitPrice}>${item.price.toFixed(2)} each</p>
            </div>

            <div className={styles.actions}>
                <div className={styles.quantityControl}>
                    <button
                        className={styles.qtyBtn}
                        onClick={() => dispatch(updateQuantity(item.id, item.quantity - 1))}
                    >
                        −
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                        className={styles.qtyBtn}
                        onClick={() => dispatch(updateQuantity(item.id, item.quantity + 1))}
                    >
                        +
                    </button>
                </div>

                <button
                    className={styles.removeBtn}
                    onClick={() => dispatch(removeFromCart(item.id))}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItemCard;