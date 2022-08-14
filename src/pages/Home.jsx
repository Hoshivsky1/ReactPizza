import { useState, useEffect } from "react";

import Categories from '../components/Categories'
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://62f9029be05644803530cd6c.mockapi.io/items")
            .then(res => res.json())
            .then(arr => {
                setItems(arr);
                setLoading(false);
            });
    },[])

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
                {loading
                    ? [...new Array(9)].map((_, index) => (<Skeleton key={index} />))
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
        </>
    );
};

export default Home;