import { useRouter } from 'next/router';
import { Card, Button, Stack } from 'react-bootstrap';
import styles from 'src/styles/ProductCard.module.css';

interface IProductCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: number;
}

const ProductCard = ({
  id,
  title,
  image,
  price,
  description,
  category,
  rating,
}: IProductCardProps) => {

  const { push } = useRouter();

  const redirectToProductPage = () => {
    push(`/products/${id}`)
  }

  return (
    <Card className={styles.card}  onClick={redirectToProductPage}>
      <div className={styles.imageWrap}>
        <Card.Img variant="top" src={image} alt={title} className={styles.image} />
      </div>

      <Card.Body className={styles.body}>
        <p className={styles.category}>{category}</p>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.description}>{description}</Card.Text>

        <Stack direction="horizontal" className="justify-content-between align-items-center mb-3">
          <Stack direction="horizontal" gap={2} className="align-items-baseline">
            <span className={styles.price}>${price.toFixed(2)}</span>
          </Stack>
          <span className={styles.stars}>
            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
            <span className={styles.ratingNum}>{rating}</span>
          </span>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;