'use client';

import { useState, useEffect } from 'react';
import supabase from '@/utils/Supabase';
import IsLoggedIn from '@/utils/IsloggedIn';
import Header from '@/app/comps/Header';
import { Link } from 'lucide';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface OrderGroup {
    id: number;
    user_id: string;
    created_at: string;
    orders: CartItem[];
}

interface CartItem {
    name: string;
    quantity: number;
    price: number;
    checked?: boolean;
}

export default function OrderPage() {
    const router = useRouter()
    const [orderGroups, setOrderGroups] = useState<OrderGroup[]>([]);
    const [loading, setLoading] = useState(false);
    const [user] = IsLoggedIn();
    const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchOrderGroups = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('order_items')
                    .select('*')
                    .eq('user_id', user?.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) {
                    setOrderGroups(data);
                    // Initialize all items as unchecked
                    const initialSelected: any = data.flatMap(group => group.orders.filter((item: any) => item.checked)
                    );



                    setSelectedItems(initialSelected)
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchOrderGroups();
    }, [user]);

    const updateCart = async (groupId: number, updatedOrders: CartItem[]) => {
        try {
            const { error } = await supabase
                .from('order_items')
                .update({ orders: updatedOrders })
                .eq('id', groupId);
            if (error) throw error;
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const deleteOrderGroup = async (groupId: number) => {
        try {
            const { error } = await supabase
                .from('order_items')
                .delete()
                .eq('id', groupId);

            if (error) throw error;

            setOrderGroups(orderGroups.filter(group => group.id !== groupId));
            // Remove any selected items from deleted group
            setSelectedItems(selectedItems.filter(item =>
                !orderGroups.find(group => group.id === groupId)?.orders.includes(item)
            ));
        } catch (error) {
            console.error('Error deleting order group:', error);
        }
    };

    const updateQuantity = (groupIndex: number, itemIndex: number, newQuantity: number) => {
        const updatedGroups = [...orderGroups];
        const group = updatedGroups[groupIndex];

        if (newQuantity < 1) {
            // Remove the item if quantity reaches 0
            const removedItem = group.orders[itemIndex];
            group.orders.splice(itemIndex, 1);

            // Remove from selected items if it was selected
            setSelectedItems(selectedItems.filter(item => item !== removedItem));

            // If no items left, delete the entire order group
            if (group.orders.length === 0) {
                deleteOrderGroup(group.id);
                return;
            }
        } else {
            group.orders[itemIndex].quantity = newQuantity;
        }

        setOrderGroups(updatedGroups);
        updateCart(group.id, group.orders);
    };

    const toggleItemSelection = (groupIndex: number, itemIndex: number) => {
        const updatedGroups = [...orderGroups];
        const item = updatedGroups[groupIndex].orders[itemIndex];
        item.checked = !item.checked;

        setOrderGroups(updatedGroups);
        updateCart(updatedGroups[groupIndex].id, updatedGroups[groupIndex].orders);

        // Update selected items list
        if (item.checked) {
            setSelectedItems([...selectedItems, item]);
        } else {
            setSelectedItems(selectedItems.filter(selected => selected !== item));
        }
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) =>
            total + (item.quantity * item.price), 0);
    };
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [notes, setNotes] = useState('');


    const orderItems = async (e: any) => {
        e.preventDefault();

        // Existing validation checks
        if (user === null) {
            toast.error('Please login first', { position: 'top-right' });
            return;
        }
        if (customerName === '') {
            toast.error('Please enter your name', { position: 'top-right' });
            return;
        }
        if (customerAddress === '') {
            toast.error('Please enter your address', { position: 'top-right' });
            return;
        }
        if (customerPhone === '') {
            toast.error('Please enter your phone number', { position: 'top-right' });
            return;
        }
        if (selectedItems.length === 0) {
            toast.error('Please select items to order', { position: 'top-right' });
            return;
        }

        try {
            // 1. First, insert into ordered_items
            const { data: orderedData, error: orderError } = await supabase
                .from('ordered_items')
                .insert({
                    user_id: user?.id,
                    orders: selectedItems,
                    customer_name: customerName,
                    customer_address: customerAddress,
                    customer_phone: customerPhone,
                    notes: notes || null,
                    status: 'pending'
                })
                .select();

            if (orderError) throw orderError;

            // 2. Create a map of selected item IDs for quick lookup
            const selectedItemIds = new Set(selectedItems.map((item: any) => item.id));

            // 3. Update each order group to remove only the checked items
            const updatedOrderGroups = orderGroups.map(group => {
                const remainingItems = group.orders.filter(item => !item.checked);
                return {
                    ...group,
                    orders: remainingItems
                };
            });

            // 4. Update the database and local state
            const updatePromises = updatedOrderGroups.map(async group => {
                if (group.orders.length === 0) {
                    // Delete empty order groups
                    const { error } = await supabase
                        .from('order_items')
                        .delete()
                        .eq('id', group.id);
                    return error;
                } else {
                    // Update groups with remaining items
                    const { error } = await supabase
                        .from('order_items')
                        .update({ orders: group.orders })
                        .eq('id', group.id);
                    return error;
                }
            });

            // Wait for all updates to complete
            const updateResults = await Promise.all(updatePromises);
            const updateErrors = updateResults.filter(result => result !== null);

            if (updateErrors.length > 0) {
                throw new Error('Failed to update some order groups');
            }

            // 5. Update local state to reflect changes
            const remainingGroups = updatedOrderGroups.filter(group => group.orders.length > 0);
            setOrderGroups(remainingGroups);
            setSelectedItems([]);

            // Clear form fields
            setCustomerName('');
            setCustomerAddress('');
            setCustomerPhone('');
            setNotes('');

            toast.success('Order placed successfully!', { position: 'top-right' });

        } catch (error) {
            console.error('Error ordering items:', error);
            toast.error('Failed to place order. Please try again.', { position: 'top-right' });
        }
    };


    return (
        <>
            <ToastContainer position="top-right" />
            <header className='flex gap-5 justify-between items-center p-5'>
                <div
                    onClick={() => router.back()}
                 className='flex items-center gap-3 px-3 py-2 rounded-md bg-yellow-500 cursor-pointer'>
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 512 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path></svg>

                    <div
                    
                        className='font-bold text-white'>
                        Go back
                    </div>

                </div>

                <div 
                    onClick={() => router.push('/user/ordered')}
                className='flex items-center gap-3 px-3 py-2 rounded-md bg-yellow-500 cursor-pointer'>

                    <div

                        className='font-bold text-white'>
                        History
                    </div>


                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 448 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>

                </div>
            </header>

            <div className='flex flex-col lg:flex-row gap-5 items-start mx-[10%] my-8'>
                <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-lg lg:sticky top-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Place Your Order</h2>
                    <form
                        onSubmit={orderItems}
                        className="space-y-4">
                        <input
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            type="text"
                            placeholder="Name"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            required
                        />
                        <input
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            type="text"
                            placeholder="Address"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            required
                        />
                        <input
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            type="number"
                            placeholder="Phone Number"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            required
                        />
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Additional Notes"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            rows={3}
                        />

                        {/* Selected items summary */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
                           <div className='max-h-[150px] overflow-y-auto'>
                           {selectedItems.length > 0 ? (
                                <>
                                    <div className="max-h-40  mb-2">
                                        {selectedItems.map((item, index) => (
                                            <div key={index} className="flex justify-between py-1 text-sm">
                                                <span>
                                                    {item.name} × {item.quantity}
                                                </span>
                                                <span>₱{(item.quantity * item.price).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-bold">
                                        <span>Total:</span>
                                        <span>₱{calculateTotal().toLocaleString()}</span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500 text-sm">No items selected</p>
                            )}
                           </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg w-full transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                            disabled={selectedItems.length === 0}
                        >
                            Place Order (₱{calculateTotal().toLocaleString()})
                        </button>
                    </form>
                </div>

                <div className="w-full lg:w-1/2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Items</h1>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                        </div>
                    ) : (
                        orderGroups.length === 0 ? (
                            <div className="bg-white p-8 rounded-xl shadow-md text-center">
                                <p className="text-gray-500 text-lg">No orders found.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orderGroups.map((group, groupIndex) => (
                                    <div key={group.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Order ID: {group.id}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(group.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => deleteOrderGroup(group.id)}
                                                className="text-red-500 hover:text-red-700 p-2 transition duration-200"
                                                title="Delete order"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="divide-y divide-gray-100">
                                            {group.orders.map((item, itemIndex) => (
                                                <div key={itemIndex} className="py-4 flex items-start">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.checked || false}
                                                        onChange={() => toggleItemSelection(groupIndex, itemIndex)}
                                                        className="mt-1 mr-3 h-4 w-4 text-yellow-500 rounded focus:ring-yellow-500 border-gray-300"
                                                    />
                                                    <div className="flex-1 flex-col justify-between items-center">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                            <p className="text-gray-500 text-sm">₱{item.price.toLocaleString()} each</p>
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center border rounded-lg overflow-hidden">
                                                                <button
                                                                    onClick={() => updateQuantity(groupIndex, itemIndex, item.quantity - 1)}
                                                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition duration-200"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="px-3 py-1 bg-white">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(groupIndex, itemIndex, item.quantity + 1)}
                                                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition duration-200"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <span className="font-medium text-yellow-600 min-w-[80px] text-right">
                                                                ₱{(item.quantity * item.price).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="py-4 flex justify-between items-center bg-gray-50 rounded-lg px-4 mt-2">
                                                <h3 className="font-semibold text-gray-800">Group Total</h3>
                                                <span className="font-bold text-yellow-600">
                                                    ₱{group.orders.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}