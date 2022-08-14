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
				{categories.map((value, i) => (
					<li 
						key={i} 
						className={activeIndex === i ? 'active': null} 
						onClick={() => onClickCategory(i)}>
						{value}
					</li>
				))}
            </ul>
        </div>
    );
};

export default Categories;
