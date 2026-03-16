import { SetStateAction, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import styles from 'src/styles/SearchBar.module.css';

interface ISearchBarWithFiltersProps {
    setSearchText: React.Dispatch<SetStateAction<string>>;
    categoryList: Set<string>;
    category: string | null;
    setCategory: React.Dispatch<SetStateAction<string | null>>;
    minPrice: number;
    maxPrice: number;
    setMinPrice: React.Dispatch<SetStateAction<number>>;
    setMaxPrice: React.Dispatch<SetStateAction<number>>;
}

const SearchBarWithFilters = ({ setSearchText, categoryList, setCategory, category, minPrice, maxPrice, setMinPrice, setMaxPrice }: ISearchBarWithFiltersProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleResetAll = () => {
        setSearchText("");
        setCategory(null);
        setMinPrice(0);
        setMaxPrice(1000);
    };

    return (
        <div className={styles.outerWrapper}>
            <button className={styles.revealToggle} onClick={() => setIsOpen((prev) => !prev)}>
                <span>Filters</span>
                <span className={styles.toggleRight}>
                    <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}>&#8964;</span>
                </span>
            </button>

            {isOpen && (
                <div className={styles.wrapper}>
                    <Row className="g-3 align-items-end">
                        <Col xl={4} xs={12}>
                            <Form.Label className={styles.label}>Search</Form.Label>
                            <Form.Control
                                className={styles.input}
                                type="text"
                                placeholder="Search Items..."
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Col>

                        <Col xl={3} xs={6}>
                            <Form.Label className={styles.label}>Category</Form.Label>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={styles.dropdownToggle}>
                                    {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Categories"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={styles.dropdownMenu}>
                                    {[...categoryList].map((categoryItem) => (
                                        <Dropdown.Item key={categoryItem} as="div" className={styles.dropdownItem}>
                                            <Form.Check
                                                className={styles.radio}
                                                type="radio"
                                                id={`cat-${categoryItem}`}
                                                label={categoryItem.charAt(0).toUpperCase() + categoryItem.slice(1)}
                                                onChange={() => setCategory(categoryItem)}
                                                checked={category === categoryItem}
                                            />
                                        </Dropdown.Item>
                                    ))}
                                    <Dropdown.Divider />
                                    <Dropdown.Item as="div" className={styles.dropdownItem}>
                                        <Button className={styles.clearBtn} onClick={() => setCategory(null)}>
                                            Clear Selection
                                        </Button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        <Col xl={3} xs={6}>
                            <Form.Label className={styles.label}>Price range</Form.Label>
                            <div className={styles.sliderRow}>
                                <span className={styles.sliderLabel}>Min</span>
                                <Form.Range
                                    className={styles.rangeInput}
                                    min={0} max={1000} step={10} value={minPrice}
                                    onChange={(e) => { const v = Number(e.target.value); if (v < maxPrice) setMinPrice(v); }}
                                />
                                <span className={styles.priceValue}>${minPrice}</span>
                            </div>
                            <div className={styles.sliderRow}>
                                <span className={styles.sliderLabel}>Max</span>
                                <Form.Range
                                    className={styles.rangeInput}
                                    min={0} max={1000} step={10} value={maxPrice}
                                    onChange={(e) => { const v = Number(e.target.value); if (v > minPrice) setMaxPrice(v); }}
                                />
                                <span className={styles.priceValue}>${maxPrice}</span>
                            </div>
                        </Col>

                        <Col xl={2} xs={12}>
                            <Button className={styles.resetBtn} onClick={handleResetAll}>
                                Reset All
                            </Button>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default SearchBarWithFilters;