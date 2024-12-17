import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import styles from "./NewsDetailPage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { Footer } from "../components/Footer";

function NewsDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const news = location.state?.news;

    if (!news) {
        return (
            <main className={styles.main}>
                <Navbar />
                <section className={styles.errorPage}>
                    <h1>News Not Found</h1>
                    <button onClick={() => navigate(-1)} className={styles.backButton}>
                        <FaArrowLeft /> Go Back
                    </button>
                </section>
                <Footer />
            </main>
        );
    }

    const { headline, abstract, source, author, imageUrl, pub_date, web_url, lead_paragraph } = news;

    const displayDate = pub_date
        ? new Date(pub_date).toLocaleDateString()
        : "Date Not Available";

    return (
        <main className={styles.main}>
            <Navbar />
            <section className={styles.newsDetailContainer}>
                <div className={styles.newsContent}>
                    <button onClick={() => navigate(-1)} className={styles.backButton}>
                        <FaArrowLeft /> Go Back
                    </button>
                    <h1 className={styles.newsTitle}>{headline}</h1>
                    <h4 className={styles.newsMeta}>
                        <span>{author || "Unknown"}</span> | Published:{" "}
                        <span>{displayDate}</span>
                    </h4>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="News"
                            className={styles.newsImage}
                        />
                    )}
                    <p className={styles.newsAbstract}>{lead_paragraph}</p>
                    <p className={styles.newsSource}>Source: {source || "Unknown"}</p>
                    <p className={styles.newsLink}>
                        <a href={web_url} target="_blank" rel="noopener noreferrer">
                            Read more
                        </a>
                    </p>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default NewsDetailPage;