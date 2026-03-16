import ProductCard from "src/components/cards/ProductCard";
import { GetServerSideProps, NextPage } from "next";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import PaginationComponent from "src/components/common/Pagination";
import SearchBarWithFilters from "src/components/pages/products/SearchBarWithFilters";
import { apiFetch } from "src/utils/apiFetch";


export interface IProductData {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface IProductPageProps {
    productsData: IProductData[];
    error: string;
}

const itemsShownPerPage = 8;

const ProductPage: NextPage<IProductPageProps> = (props: IProductPageProps) => {
    const { productsData, error } = props;

    const [searchText, setSearchText] = useState("");

    const [category, setCategory] = useState<string | null>(null);

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);

    const categoryList = new Set([...productsData.map((product) => product.category)])

    const filteredProducts = productsData.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) &&
        (category === null || item.category === category) &&
        item.price >= minPrice &&
        item.price <= maxPrice
    );

    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsShownPerPage;
    const totalPages = Math.ceil(filteredProducts.length / itemsShownPerPage);

    const itemsToShow = filteredProducts.slice(startIndex, startIndex + itemsShownPerPage);

    if (error) return <div>Something went wrong!! Try again later.</div>

    return (
        <Container className="py-5">
            <SearchBarWithFilters setSearchText={setSearchText} categoryList={categoryList} category={category} setCategory={setCategory}
                minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}
            />
            <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
                {itemsToShow && itemsToShow.length > 0 && itemsToShow.map((product: any) =>
                    <Col key={product.id}>
                        <ProductCard id={product.id} title={product.title} price={product.price} description={product.description}
                            category={product.category} image={product.image} rating={product.rating.rate} />
                    </Col>
                )}
                <PaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </Row>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const sort = query.sort || 'asc'
    try {
        const data = await apiFetch(`https://fakestoreapi.com/products?sort=${sort}`);
        return ({
            props: {
                productsData: data
            }
        })
    }
    catch (error) {
        return ({
            props: {
                productsData: [], error: error.message
            }
        })
    }
}

export default ProductPage;