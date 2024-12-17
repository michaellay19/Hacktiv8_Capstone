import styles from "../../pages/CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../../components";
import { useEffect } from "react";
import { fetchMovies } from "../../store/actions";
import { useParams } from "react-router-dom";
import { NEWS_REDUCER_CASES } from "../../store/reducers";
import { Footer } from "../Footer";

function SearchResults() {
    const { query } = useParams();
    const newsReducer = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (query) {
            dispatch(
                fetchMovies({
                    q: query,
                    fq: 'news_desk:("Technology")',
                })
            );
        }
    }, [query, dispatch]);

    console.log("query :", query);

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
                    <h1>{query} News</h1>
                </section>
                <section className={styles.newsContainer}>
                    {newsReducer.news.length > 0 ? (
                        newsReducer.news.map((n) => {
                            const { headline, abstract, source, byline, pub_date,lead_paragraph } = n;
                            const isSaved = newsReducer.savedNews.some(
                                (saved) => saved._id === n._id
                            );
                            return (
                                <NewsCard
                                    key={n._id}
                                    headline={headline.main}
                                    abstract={abstract}
                                    source={source}
                                    author={byline.original}
                                    onSave={() => handleSave(n)}
                                    onUnsave={() => handleUnsave(n)}
                                    isSaved={isSaved}
                                    pub_date={pub_date}
                                    lead_paragraph={lead_paragraph}
                                />
                            );
                        })
                    ) : (
                        <div className={styles.noResults}>
                            <h2>No news found for your search.</h2>
                            <p>
                                Please go back to the home page or try searching
                                for something else.
                            </p>
                        </div>
                    )}
                </section>
            </section>
            <Footer/>
        </main>
    );
}

export default SearchResults;
