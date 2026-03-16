import { GetServerSideProps, NextPage } from "next";
import { Col, Container, Row } from "react-bootstrap";
import ProductDetailCard from "src/components/cards/ProductDetailCard";
import { IProductData } from "src/pages/products/";

interface ISingleProductPageProps {
    productData: IProductData;
}

const SingleProductPage: NextPage<ISingleProductPageProps> = (props) => {

    const { productData: product } = props;

    return (
        <Container className="py-5">
            {product &&
                <ProductDetailCard id={product.id} title={product.title} price={product.price} description={product.description} category={product.category} image={product.image} rating={product.rating.rate} />
            }
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const data = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    return {
        props: {
            productData: await data.json()
        }
    }
}

export default SingleProductPage;


