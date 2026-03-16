import { Pagination } from "react-bootstrap";
import styles from "src/styles/PaginationComponent.module.css";

interface IPaginationControlProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent = ({ currentPage, totalPages, onPageChange }: IPaginationControlProps) => {
    return (
        <div className={`d-flex justify-content-center mt-5 w-100 ${styles.paginationWrapper}`}>
            <Pagination>
                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                />
            </Pagination>
        </div>
    );
};

export default PaginationComponent;