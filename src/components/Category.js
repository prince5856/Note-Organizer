import React, { useState } from "react";

const Category = ({ category, handleSearchCategory }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    handleSearchCategory((prevSelected) =>
      prevSelected.map((item) =>
        item.category === category ? { ...item, clicked: !item.clicked } : item
      )
    );
  };

  const color = clicked ? "blue" : "white";

  return (
    <div className="category">
      <button
        className="category-button"
        onClick={handleClick}
        style={{ backgroundColor: color }}
      >
        #{category}
      </button>
    </div>
  );
};

export default Category;
