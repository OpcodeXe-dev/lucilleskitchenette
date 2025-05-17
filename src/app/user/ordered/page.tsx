'use client';

import { useState, useEffect } from 'react';
import supabase from '@/utils/Supabase';
import IsLoggedIn from '@/utils/IsloggedIn';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface OrderedItem {
    id: number;
    user_id: string;
    created_at: string;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    notes: string | null;
    orders: {
        name: string;
        quantity: number;
        price: number;
    }[];
    status: string;
}

export default function OrderedItemsPage() {
    const [orderedItems, setOrderedItems] = useState<OrderedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [user] = IsLoggedIn();

    useEffect(() => {
        const fetchOrderedItems = async () => {
            if (!user) return;

            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('ordered_items')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setOrderedItems(data || []);
            } catch (error) {
                toast.error('Failed to load orders');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderedItems();
    }, [user]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const calculateTotal = (items: { quantity: number; price: number }[]) => {
        return items.reduce((total, item) => total + (item.quantity * item.price), 0);
    };

    const router = useRouter(); // Initialize the router hook

    return (
        <div className="min-h-screen bg-gray-50">
            <ToastContainer position="top-right" />

            {/* Header */}
            <header className="bg-white shadow-sm p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className='flex items-center gap-3 px-3 py-2 rounded-md bg-yellow-500 cursor-pointer'>
                        <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 512 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path></svg>

                        <div
                            onClick={() => router.back()}
                            className='font-bold text-white'>
                            Go back
                        </div>

                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto p-4">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                    </div>
                ) : orderedItems.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                        <p className="text-gray-500 text-lg">No orders found.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orderedItems.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                                {/* Order Header */}
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                {/* Customer Info */}
                                <div className="p-4 border-b border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Customer</p>
                                        <p className="font-medium">{order.customer_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{order.customer_phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="font-medium">{order.customer_address}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="divide-y divide-gray-100">
                                    {order.orders.map((item, index) => (
                                        <div key={index} className="p-4 flex justify-between">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">₱{item.price.toLocaleString()} × {item.quantity}</p>
                                            </div>
                                            <p className="font-medium">
                                                ₱{(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer */}
                                <div className="p-4 bg-gray-50 flex justify-between items-center">
                                    <div>
                                        {order.notes && (
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">Note:</span> {order.notes}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="text-xl font-bold text-yellow-600">
                                            ₱{calculateTotal(order.orders).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}