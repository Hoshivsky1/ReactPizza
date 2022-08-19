import React from "react";
import styles from "./Search.module.scss";

function Search({ searchValue, setSearchValue }) {
    return (
        <div className={styles.root}>
            <input
                onChange={(event) => setSearchValue(event.target.value)}
                value={searchValue}
                className={styles.input}
                placeholder="Пошук піци..."
            />
            <svg
                className={styles.icon}
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title />
                <path
                    d="M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z"
                    style={{
                        fill: "none",
                        stroke: "#000",
                        strokeMiterlimit: 10,
                        strokeWidth: "32px",
                    }}
                />
                <line
                    style={{
                        fill: "none",
                        stroke: "#000",
                        strokeLinecap: "round",
                        strokeMiterlimit: 10,
                        strokeWidth: "32px",
                    }}
                    x1="338.29"
                    x2="448"
                    y1="338.29"
                    y2="448"
                />
            </svg>
            {searchValue && (
                <svg
                    onClick={() => setSearchValue('')}
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.close}
                >
                    <defs>
                        <style></style>
                    </defs>
                    <title />
                    <g id="cross">
                        <line
                            style={{
                                fill: "none",
                                stroke: "#000",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2px",
                            }}
                            x1="7"
                            x2="25"
                            y1="7"
                            y2="25"
                        />
                        <line
                            style={{
                                fill: "none",
                                stroke: "#000",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2px",
                            }}
                            x1="7"
                            x2="25"
                            y1="25"
                            y2="7"
                        />
                    </g>
                </svg>
            )}
        </div>
    );
}

export default Search;
