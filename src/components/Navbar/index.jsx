import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../../store/actions";
import styles from "./Navbar.module.css";

function Navbar(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const links = [
        { title: "Indonesia", path: "/" },
        { title: "Programming", path: "/programming" },
        { title: "COVID-19", path: "/covid-19" },
        { title: "SAVED", path: "/saved" },
    ];

    const handleSearch = () => {
        if (searchTerm) {
            dispatch(fetchMovies({ q: searchTerm }));
            navigate(`/search/${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <section className={styles.navbar}>
            <div className={styles.brand}>Capstone</div>
            <section className={styles.linksContainer}>
                {links.map((l) => (
                    <NavLink
                        className={(props) =>
                            props.isActive ? styles.activeLink : styles.link
                        }
                        key={l.title}
                        to={l.path}
                    >
                        {l.title}
                    </NavLink>
                ))}
            </section>
            <div className={styles.searchBarContainer}>
                <input
                    type="text"
                    className={styles.searchInput}
                    value={searchTerm}
                    placeholder="Search..."
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button onClick={handleSearch} className={styles.searchBarBtn}>
                    Search
                </button>
            </div>
        </section>
    );
}

export { Navbar };
