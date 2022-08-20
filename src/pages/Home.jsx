import { useState, useEffect, useContext } from "react";

import Categories from '../components/Categories'
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({
        name: 'популярності', 
        sortProperty: 'rating',
    });

    useEffect(() => {
        setLoading(true);

        const order = sortType.sortProperty.includes('-') ? 'acs' : "desc";
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://62f9029be05644803530cd6c.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.json())
            .then(arr => {
                setItems(arr);
                setLoading(false);
            });
        window.scrollTo(0,0);
    },[categoryId, sortType, searchValue, currentPage]) 

    const onClickCategory = (id) => {
        setCategoryId(id)
    }

    const onChangeSort = (i) => {
        setSortType(i)
    }
    
    // .filter(obj => {
    //     if(obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //         return true;
    //     }
    //     return false;
    // } )

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(9)].map((_, index) => (<Skeleton key={index} />))
    

    return (
        <div className="container">
            <div className="content__top">
                <Categories id={categoryId} onClickCategory={onClickCategory} />
                <Sort sortType={sortType} onChangeSort={onChangeSort} />
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
                {loading ? skeletons: pizzas}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
        
    );
};

export default Home;