import Category from "./Category";

const CategoryList = ({ notes, handleSearchCategory }) => {
  // Extract unique categories from the notes
  const uniqueCategories = [...new Set(notes.map((note) => note.category))];

  return (
    <div className="category-list">
      {/* Map over unique categories */}
      {uniqueCategories.length > 0 && (
        <div className="category-box">
          <h4 className="category-text">Categories:</h4>
          {uniqueCategories.map((category) => (
            <Category
              key={category} // Ensure each category has a unique key
              category={category}
              handleSearchCategory={handleSearchCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
