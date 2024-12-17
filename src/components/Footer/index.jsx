import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <p>&copy; {new Date().getFullYear()} Capstone Project</p>
                <nav>
                    <a href="/" className={styles.footerLink}>
                        Home
                    </a>
                    <a href="/about" className={styles.footerLink}>
                        About
                    </a>
                    <a href="/contact" className={styles.footerLink}>
                        Contact
                    </a>
                </nav>
            </div>
        </footer>
    );
}

export { Footer };
