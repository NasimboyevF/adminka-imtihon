import { useState } from 'react';
import { Product } from '../../types/product';
import axios from 'axios';

const TableTwo = ({ productData , update }: { productData: Product[], update:any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

 const handleDelete = async (productId: string) => {
   try {
     const response = await axios.delete(
       `https://e-commerce-api-v2.nt.azimumarov.uz/api/v1/products/${productId}`,
       { withCredentials: true },
     );

     if (response.status === 200) {
       alert('Product deleted successfully');
       update((prev: any) => !prev); 
     }
   } catch (error) {
     console.error('Error deleting product:', error);
     alert('Error deleting product.');
   }
 };

  const colors = [
    '#00C12B',
    '#F50606',
    '#F5DD06',
    '#F57906',
    '#06CAF5',
    '#063AF5',
    '#7D06F5',
    '#F506A4',
    '#FFFFFF',
    '#000000',
  ];

    const handleColorChange = (color: string) => {
      if (editProduct) {
        setEditProduct({
          ...editProduct,
          colors: [color],
        });
      }
    };


  const productTypes = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
  const sizes = [
    'XX-Small',
    'X-Small',
    'Small',
    'Medium',
    'Large',
    'X-Large',
    'XX-Large',
    '3X-Large',
    '4X-Large',
  ];
  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string,
  ) => {
    if (editProduct) {
      setEditProduct({ ...editProduct, [field]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (
      !editProduct ||
      !editProduct.name ||
      !editProduct.price ||
      !editProduct.description
    )
      return;

    try {
      const response = await axios.put(
        `https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/products/${editProduct._id}`,
        {
          name: editProduct.name,
          description: editProduct.description,
          price: editProduct.price,
          discount: editProduct.discount,
          colors: editProduct.colors,
          type: editProduct.type,
          size: editProduct.size,
          dressStyle: editProduct.dressStyle,
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        alert('Product updated successfully');
        update((a:any)=>!a)
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product.');
    }
  };

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
    setIsOpen(true);

  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Rank</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">E/D</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md overflow-hidden items-center">
                <img src={product.pictures[0]} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{product.type}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <button
              onClick={() => handleEditClick(product)}
              className="border border-gray-500 p-4 rounded-full active:border-gray-700"
            >
              edit
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              className="border border-gray-500 p-4 rounded-full active:border-gray-700"
            >
              delete
            </button>
          </div>
        </div>
      ))}

      <div
        id="default-modal"
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        className={`${
          !isOpen && 'hidden'
        } overflow-y-scroll overflow-x-hidden fixed py-15  top-0 left-0 h-[100vh] z-[1000000] bg-[#00000060] flex justify-center items-center w-full`}
      >
        <div
          className="relative p-8 w-full max-w-lg top-[20%]  bg-white rounded-lg shadow-lg dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-6 pb-8 flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Edit Product
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              >
                x
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="scrol">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={editProduct?.name || ''}
                  onChange={(e) => handleInputChange(e, 'name')}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter product name"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={editProduct?.description || ''}
                  onChange={(e) => handleInputChange(e, 'description')}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter description"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price
                </label>
                <input
                  type="number"
                  value={editProduct?.price || ''}
                  onChange={(e) => handleInputChange(e, 'price')}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter price"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Discount
                </label>
                <input
                  type="number"
                  value={editProduct?.discount || ''}
                  onChange={(e) => handleInputChange(e, 'discount')}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter discount"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Colors
                </label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center">
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={editProduct?.colors.includes(color)}
                        onChange={() => handleColorChange(color)}
                        className="mr-2 hidden"
                      />
                      <span
                        style={{ backgroundColor: color }}
                        className=" w-6 h-6 border border-gray-300 rounded-full flex justify-center items-center relative"
                      >
                        {editProduct?.colors.includes(color) && (
                          <span className="text-white font-bold text-xl">
                            +
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type
                </label>
                <select
                  value={editProduct?.type || ''}
                  onChange={(e) => handleInputChange(e, 'type')}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {productTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Size
                </label>
                <select
                  value={editProduct?.size || ''}
                  onChange={(e) => handleInputChange(e, 'size')}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dress Style
                </label>
                <select
                  value={editProduct?.dressStyle || ''}
                  onChange={(e) => handleInputChange(e, 'dressStyle')}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {dressStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSave}
                type="button"
                className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTwo;
