import { useState } from "react";

const Categories = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const categories = ['Всі', 'Мясні', 'Вегетерянські', 'Гриль', 'Гострі', 'Закриті']

	return (
        <div className="categories">
            <ul>
				{categories.map((value, i) => (
					<li 
						key={i} 
						className={activeIndex === i ? 'active': null} 
						onClick={() => setActiveIndex(i)}>
						{value}
					</li>
				))}
            </ul>
        </div>
    );
};

export default Categories;
