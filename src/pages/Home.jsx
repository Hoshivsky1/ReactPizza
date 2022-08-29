import axios from "axios";
import qs from 'qs';

import { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";

import Categories from '../components/Categories'
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {categoryId, sort, currentPage} = useSelector(state => state.filter);

    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    }

    //*Запит з серверу Mockapi.io (приходять піцци)
    const fetchPizzas = () => {
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
    }

    //*Якщо змінили параметри і був перший рендер 
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true;
        //eslint-disable-next-line
    }, [categoryId, sort.sortProperty, currentPage]);

    //*Якщо був перший рендер то провіряємо url параметри та зберегаємо в Redux
    useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            
            const sort = list.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
        //eslint-disable-next-line
    }, [])

    //*Якщо був перший рендер, то робити запит за піццами :)
    useEffect(() => {
        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
        //eslint-disable-next-line
    },[categoryId, sort.sortProperty, searchValue, currentPage]);
 
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => (<Skeleton key={index} />))
    
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
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
        
    );
};

export default Home;