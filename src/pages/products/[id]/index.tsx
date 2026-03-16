import { GetServerSideProps, NextPage } from "next";
import { Col, Container, Row } from "react-bootstrap";
import ProductDetailCard from "src/components/cards/ProductDetailCard";
import { IProductData } from "src/pages/products/";
import { apiFetch } from "src/utils/apiFetch";

interface ISingleProductPageProps {
    productData: IProductData;
    error: string;
}

const SingleProductPage: NextPage<ISingleProductPageProps> = (props) => {

    const { productData: product, error } = props;

     if (error) return <div>Something went wrong!! Try again later.</div>

    return (
        <Container className="py-5">
            {product &&
                <ProductDetailCard id={product.id} title={product.title} price={product.price} description={product.description} category={product.category} image={product.image} rating={product.rating.rate} />
            }
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    try {
        const data = await apiFetch(`https://fakestoreapi.com/products/${params.id}`);
        return {
            props: {
                productData: data
            }
        }
    }
    catch (error) {
        return {
            props: {
                productData: undefined,
                error: error.message
            }
        }
    }
}

export default SingleProductPage;


