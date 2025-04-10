import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../componant/productCard';
import axios from 'axios';
import loder from '../assets/ZKZg.gif';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://dummyjson.com/products');
            setProducts(response.data.products);
        } catch (err) {
            setError(`Failed to load products. ${err.message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900">
                <img src={loder} alt="Loading..." className="w-16 h-16" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-200 border-l-4 border-red-500 text-red-700 p-4 dark:bg-red-800 dark:text-red-200" role="alert">
                <p className="font-bold">Error!</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8 dark:text-white">
                    Featured Products
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"> {/* Added xl:grid-cols-5 */}
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
