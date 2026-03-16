import { useRouter } from "next/router";
import { useContext } from "react";
import { Col, Container, Row, Button, Stack } from "react-bootstrap";
import CartContext from "src/contexts/CartContext";
import { addToCart } from "src/contexts/CartContext/actions";
import styles from "src/styles/ProductDetailCard.module.css";

interface IProductDetailCardProps {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    category: string;
    rating: number;
}

const ProductDetailCard = ({
    id,
    title,
    image,
    price,
    description,
    category,
    rating,
}: IProductDetailCardProps) => {
    const { back } = useRouter();

    const { state, dispatch } = useContext(CartContext);
    return (
        <Container className="py-5">
            <Button variant="outline-secondary" className={styles.backBtn} onClick={() => back()}>
                ← Back
            </Button>

            <Row className={`mt-4 ${styles.card}`}>
                <Col md={5} className={styles.imageWrap}>
                    <img src={image} alt={title} className={styles.image} />
                </Col>

                <Col md={7} className={styles.body}>
                    <p className={styles.category}>{category}</p>
                    <h1 className={styles.title}>{title}</h1>

                    <Stack direction="horizontal" gap={2} className="mb-3">
                        <span className={styles.stars}>
                            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                        </span>
                    </Stack>

                    <p className={styles.price}>${price.toFixed(2)}</p>

                    <hr className={styles.divider} />

                    <p className={styles.description}>{description}</p>

                    <Stack direction="horizontal" gap={3} className="mt-4">
                        <Button variant="dark" className={styles.primaryBtn} onClick={() => dispatch(addToCart({
                            id,
                            title,
                            image,
                            price,
                        }))}>
                            Add to Cart
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetailCard;