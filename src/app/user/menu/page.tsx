'use client';

import Header from '@/app/comps/Header';
import IsLoggedIn from '@/utils/IsloggedIn';
import supabase from '@/utils/Supabase';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';


interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string | null;
}

interface CartItem extends MenuItem {
    quantity: number;
}

export default function Menu() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);

    const searchParams = useSearchParams()
    const router = useRouter()
 
    const search = searchParams.get('search')

    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
            if(search != null) {
                setSearchQuery(search.toString()) 
            }

            if(searchQuery === '') {
                router.push('/user/menu')
            }
    }, [ search, searchQuery])


    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Fetch menu items
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('menu_items')
                    .select('*')
                    .order('category', { ascending: true });

                if (error) throw error;
                setMenuItems(data || []);
                setFilteredItems(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch menu items');
            } finally {
                setLoading(false);
            }
        };
        fetchMenuItems();
    }, []);

    // Filter items based on search query
    useEffect(() => {
        const filtered = menuItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [searchQuery, menuItems]);

    // Handle adding to cart
    const handleAddToCart = (item: MenuItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const [user] = IsLoggedIn();
    const submitOrder = async () => {
        const userId = user?.id;

        if (!userId) return alert('User not found');

        const formattedOrders = cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }));

        const { error } = await supabase.from('order_items').insert([
            {
                user_id: userId,
                orders: formattedOrders
            }
        ]);

        if (error) {
            console.error('Order submission failed:', error.message);
            alert('Failed to place order!');
        } else {
            alert('Order placed successfully!');
            setCart([]);
        }
    };

    // Handle removing from cart
    const handleRemoveFromCart = (itemId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === itemId);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(item =>
                    item.id === itemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevCart.filter(item => item.id !== itemId);
            }
        });
    };

    // Get quantity for a specific item
    const getItemQuantity = (itemId: number) => {
        const cartItem = cart.find(item => item.id === itemId);
        return cartItem ? cartItem.quantity : 0;
    };

    // Get all unique categories
    const categories = Array.from(new Set(menuItems.map(item => item.category)));

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
    );

    if (error) return <div className="text-red-500 p-4 text-center">Error: {error}</div>;

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Our Menu</h1>
                    
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>                        </div>
                        <input
                            type="text"
                            placeholder="Search menu items..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-2 rounded-full cursor-pointer ${!activeCategory ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        All
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full cursor-pointer ${activeCategory === category ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems
                        .filter(item => !activeCategory || item.category === activeCategory)
                        .map(item => {
                            const quantity = getItemQuantity(item.id);

                            return (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-100">
                                    <div className="relative h-48 overflow-hidden">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                <span className="text-gray-400">No image available</span>
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                            {item.category}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                            <span className="text-lg font-semibold text-yellow-600">₱{item.price.toFixed(2)}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-4  break-all">{item.description}</p>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleRemoveFromCart(item.id)}
                                                    className="p-2 bg-yellow-500 hover:bg-yellow-600 px-5 text-white rounded-md transition-colors cursor-pointer"
                                                    disabled={quantity === 0}
                                                >
                                                   -
                                                </button>
                                                <span className="min-w-[40px] text-center bg-yellow-100 px-3 py-2 rounded-md">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="p-2 bg-yellow-500 hover:bg-yellow-600 px-5 text-white rounded-md transition-colors cursor-pointer"
                                                >
                                                   +
                                                </button>
                                            </div>

                                            <button
                                            //only show if quantity is greater than 0
                                                disabled={quantity === 0}
                                                onClick={() => submitOrder()}
                                                className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md transition-colors cursor-pointer"
                                            >
                                               
                                                Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {/* Cart Summary (fixed at bottom on mobile) */}
                {cart.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 md:static bg-white shadow-lg md:shadow-none border-t md:border-0 p-4 md:p-0 mt-8">
                        <div className="container mx-auto">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-800">Your Order ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h3>
                                    <p className="text-gray-600 text-sm">Total: ₱{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={submitOrder}
                                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md transition-colors cursor-pointer"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}