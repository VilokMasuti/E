import { Link } from 'react-router-dom';

const categories = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys',
];

const CategoryNavigation = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl mb-4 font-mono font-semibold ">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Iterate over the categories and create a link for each */}
        {categories.map((category) => (
          <Link
            key={category}
            to={`/products?category=${category}`} // Navigate to products page with the selected category
            className="bg-gray-100 hover:bg-gray-200 text-center py-4 rounded-lg transition-colors"
          >
            {category} {/* Display category name */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavigation;
