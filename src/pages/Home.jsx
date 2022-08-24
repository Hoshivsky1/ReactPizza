import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";
import Categories from '../components/Categories'
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
    const dispatch = useDispatch();
    const {categoryId, sort} = useSelector(state => state.filter);

    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    useEffect(() => {
        setLoading(true);

        const order = sort.sortProperty.includes('-') ? 'acs' : "desc";
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios
            .get(`https://62f9029be05644803530cd6c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                setItems(res.data);
                setLoading(false);
            });
            
        window.scrollTo(0,0);
    },[categoryId, sort.sortProperty, searchValue, currentPage]) 
 
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(9)].map((_, index) => (<Skeleton key={index} />))
    
    return (
        <div className="container">
            <div className="content__top">
                <Categories id={categoryId} onClickCategory={onChangeCategory} />
                <Sort/>
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
                {loading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
        
    );
};

export default Home;