import styles from "./NewsCard.module.css";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const truncateChar = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.substring(0, maxLength)}..`;
};

const getRandomImageUrl = () => {
    return `https://picsum.photos/600/400?random=${Math.floor(
        Math.random() * 1000
    )}`;
};

function NewsCard(props) {
    const {
        headline,
        abstract,
        source,
        author,
        multimedia,
        web_url,
        onSave,
        onUnsave,
        isSaved,
        pub_date,
        lead_paragraph,
    } = props;

    const navigate = useNavigate();
    const displayAuthor = author ? author : "By Unknown";

    const displayImageUrl = useMemo(() => {
        return multimedia && multimedia.length > 0
            ? `https://www.nytimes.com/${multimedia[0].url}`
            : getRandomImageUrl();
    }, [multimedia]);

    const formattedDate = new Date(pub_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <section className={styles.newsCard}>
            <img
                src={displayImageUrl}
                alt={headline}
                className={styles.newsImage}
            />
            <h3 className={styles.newsSource}>{source}</h3>
            <h1 className={styles.newsTitle}>{headline}</h1>
            <h4 className={styles.newsMeta}>
                <div>{displayAuthor}</div>
                <div className={styles.date}>Published on: {formattedDate}</div>
            </h4>
            <p className={styles.newsAbstract}>{truncateChar(abstract, 250)}</p>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.newsPageButton}
                    onClick={() =>
                        navigate("/news-detail", {
                            state: {
                                news: {
                                    headline,
                                    abstract,
                                    source,
                                    author,
                                    imageUrl: displayImageUrl,
                                    web_url,
                                    pub_date: formattedDate,
                                    lead_paragraph,
                                },
                            },
                        })
                    }
                >
                    News Page
                </button>
                <button
                    className={
                        isSaved ? styles.unsaveButton : styles.saveButton
                    }
                    onClick={isSaved ? onUnsave : onSave}
                >
                    {isSaved ? "Un-Saved" : "Save"}
                </button>
            </div>
        </section>
    );
}

export { NewsCard };
