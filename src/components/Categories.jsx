const Categories = ({id, onClickCategory}) => {
	
	const categories = ['Всі', 'Мясні', 'Вегетерянські', 'Гриль', 'Гострі', 'Закриті']

	return (
        <div className="categories">
            <ul>
				{categories.map((categoryName, i) => (
					<li 
						key={i} 
						className={id === i ? 'active': null} 
						onClick={() => onClickCategory(i)}>
						{categoryName}
					</li> 
				))}
            </ul>
        </div>
    );
};

export default Categories;
