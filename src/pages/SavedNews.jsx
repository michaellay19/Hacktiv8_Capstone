import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { useEffect } from "react";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { Footer } from "../components/Footer";

function SavedNewsPage() {
    const newsReducer = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: NEWS_REDUCER_CASES.CLEAR_NEWS });
        dispatch({ type: NEWS_REDUCER_CASES.DONE_FETCHING_NEWS });
    }, [dispatch]);

    const handleSave = (article) => {
        dispatch({
            type: NEWS_REDUCER_CASES.SAVE_NEWS,
            news: article,
        });
    };

    const handleUnsave = (article) => {
        dispatch({
            type: NEWS_REDUCER_CASES.UNSAVE_NEWS,
            news: article,
        });
    };

    return (
        <main>
            <Navbar />
            <section className={styles.pageContainer}>
                <section>
                    <h1 className={styles.mainNewsTitle}>Saved News</h1>
                </section>
                <section className={styles.newsContainer}>
                    {newsReducer.savedNews.length === 0 ? (
                        <div className={styles.loadingScreen}>
                            <h2>No saved news available.</h2>
                        </div>
                    ) : (
                        newsReducer.savedNews.map((n) => {
                            const {
                                headline,
                                abstract,
                                source,
                                web_url,
                                pub_date,
                                lead_paragraph,
                            } = n;
                            const isSaved = newsReducer.savedNews.some(
                                (saved) => saved._id === n._id
                            );
                            return (
                                <NewsCard
                                    key={n._id}
                                    headline={headline.main}
                                    abstract={abstract}
                                    source={source}
                                    web_url={web_url}
                                    onSave={() => handleSave(n)}
                                    onUnsave={() => handleUnsave(n)}
                                    isSaved={isSaved}
                                    pub_date={pub_date}
                                    lead_paragraph={lead_paragraph}
                                />
                            );
                        })
                    )}
                </section>
            </section>
            <Footer />
        </main>
    );
}

export default SavedNewsPage;
