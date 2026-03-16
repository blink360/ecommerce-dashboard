import { NextPage } from "next";
import { useContext } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import CartItemCard from "src/components/cards/CartItemCard";
import EmptyCart from "src/components/pages/cart/EmptyCart";
import OrderSummary from "src/components/pages/cart/OrderSummary";
import CartContext from "src/contexts/CartContext";



const CartPage: NextPage = () => {
    const { state } = useContext(CartContext);
    const { cartItems } = state;

    return (
        <Container className="py-5">
            {cartItems.length === 0 ? (
                <EmptyCart />
            ) : (
                <Row className="g-4">
                    <Col xs={12} lg={8}>
                        {cartItems.map((item) => (
                            <CartItemCard key={item.id} item={item} />
                        ))}
                    </Col>

                    <Col xs={12} lg={4}>
                        <OrderSummary />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default CartPage;