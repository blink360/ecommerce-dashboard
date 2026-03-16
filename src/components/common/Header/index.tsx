import { useRouter } from "next/router";
import { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import AuthContext from "src/contexts/AuthContext";
import { login, logout } from "src/contexts/AuthContext/actions";
import CartContext from "src/contexts/CartContext";
import styles from "src/styles/Header.module.css";

const Header = () => {
    const { push } = useRouter();
    const { state } = useContext(CartContext);
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext);


    const userLogin = async () => {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: 'johnd',
                password: 'm38rmF$'
            })
        })

        const data = await response.json();
        const { token } = data
        authDispatch(login(token, 'johnd'))
    }


    const userLogout = () => {
        authDispatch(logout());
    }

    return (
        <Navbar className={styles.navbar}>
            <Container>
                <Navbar.Brand className={styles.brand} onClick={() => push("/products")}>
                    E-Commerce Dashboard
                </Navbar.Brand>
                <div className={styles.actions}>
                    {authState.isLoggedIn &&
                        (
                            <button className={styles.iconBtn} onClick={() => push("/cart")}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 01-8 0" />
                                </svg>
                                {state.totalItems > 0 && (
                                    <span className={styles.badge}>{state.totalItems}</span>
                                )}
                            </button>)
                    }
                    <button className={styles.iconBtn} onClick={() => authState.isLoggedIn ? userLogout() : userLogin()}>
                        {authState.isLoggedIn ? (
                            <span className={styles.avatar}>
                                {authState.username?.charAt(0).toUpperCase() ?? "U"}
                            </span>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        )}
                    </button>
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;