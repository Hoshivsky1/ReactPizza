import { useState } from "react";

const Categories = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	
	const categories = ['Всі', 'Мясні', 'Вегетерянські', 'Гриль', 'Гострі', 'Закриті']

	const onClickCategory = (index) => {
		setActiveIndex(index)
	}

	return (
        <div className="categories">
            <ul>
				{categories.map(i => {
					return(
						<li className={activeIndex === i ? 'active': null} onClick={() => onClickCategory(i)}>{i}</li>
					)
				})}
            </ul>
        </div>
    );
};

export default Categories;
