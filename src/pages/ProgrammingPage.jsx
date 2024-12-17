import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, NewsCard } from "../components";
import { useEffect } from "react";
import { fetchMovies } from "../store/actions";
import { NEWS_REDUCER_CASES } from "../store/reducers";
import { Footer } from "../components/Footer"

function ProgrammingPage() {
    const newsReducer = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            fetchMovies({
                q: "Programming",
                fq: 'news_desk:("Technology")',
            })
        );
    }, []);

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
                    <h1 className={styles.mainNewsTitle}>Programming News</h1>
                </section>
                <section className={styles.newsContainer}>
                    {newsReducer.news.map((n) => {
                        const {
                            headline,
                            abstract,
                            source,
                            byline,
                            multimedia,
                            web_url,
                            pub_date,
                            lead_paragraph
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
                                author={byline ? byline.original : "By Unknown"}
                                multimedia={multimedia}
                                web_url={web_url}
                                pub_date={pub_date}
                                onSave={() => handleSave(n)}
                                onUnsave={() => handleUnsave(n)}
                                isSaved={isSaved}
                                lead_paragraph={lead_paragraph}
                            />
                        );
                    })}
                </section>
            </section>
            <Footer/>
        </main>
    );
}

export default ProgrammingPage;
