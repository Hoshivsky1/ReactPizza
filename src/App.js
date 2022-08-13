import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import "./scss/app.scss";

// function Pizza() {

// }

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories   />
                        <Sort/>
                    </div>
                    <h2 className="content__title">Всі піци</h2>
                    <div className="content__items">
                        <PizzaBlock title='Львівська' price={100}/>
                        <PizzaBlock title='Київська' price={125}/>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
