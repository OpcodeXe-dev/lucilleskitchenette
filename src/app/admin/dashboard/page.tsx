'use client';

import { useState, useEffect } from 'react';
import supabase from '@/utils/Supabase';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
    // State for active tab
    const [activeTab, setActiveTab] = useState('orders');
    const router = useRouter();

    //acounts
    useEffect(() => {
        const account = localStorage.getItem('adminAccount');
        if (!account) {
            // Redirect to login page if not logged in
            router.push('/admin/sign-in');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminAccount');
        alert('Logged out successfully');
        router.push('/admin/sign-in');
    };

    // State for data
    const [ordersData, setOrdersData] = useState<any[]>([]);
    const [reservationsData, setReservationsData] = useState<any[]>([]);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [loading, setLoading] = useState({
        orders: true,
        reservations: true,
        menuItems: true
    });

    // Pagination states
    const [ordersPagination, setOrdersPagination] = useState({
        page: 1,
        perPage: 10,
        total: 0
    });
    const [reservationsPagination, setReservationsPagination] = useState({
        page: 1,
        perPage: 10,
        total: 0
    });
    const [menuItemsPagination, setMenuItemsPagination] = useState({
        page: 1,
        perPage: 10,
        total: 0
    });

    // Status colors
    const statusColors: any = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'processing': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
    };

    // Fetch orders from ordered_items table with pagination
    const fetchOrders = async () => {
        setLoading(prev => ({ ...prev, orders: true }));
        try {
            const from = (ordersPagination.page - 1) * ordersPagination.perPage;
            const to = from + ordersPagination.perPage - 1;

            const { data, error, count } = await supabase
                .from('ordered_items')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) throw error;
            setOrdersData(data || []);
            setOrdersPagination(prev => ({ ...prev, total: count || 0 }));
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(prev => ({ ...prev, orders: false }));
        }
    };

    // Fetch reservations with pagination
    const fetchReservations = async () => {
        setLoading(prev => ({ ...prev, reservations: true }));
        try {
            const from = (reservationsPagination.page - 1) * reservationsPagination.perPage;
            const to = from + reservationsPagination.perPage - 1;

            const { data, error, count } = await supabase
                .from('reservations')
                .select('*', { count: 'exact' })
                .order('delivery_datetime', { ascending: true })
                .range(from, to);

            if (error) throw error;
            setReservationsData(data || []);
            setReservationsPagination(prev => ({ ...prev, total: count || 0 }));
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(prev => ({ ...prev, reservations: false }));
        }
    };

    // Fetch menu items with pagination
    const fetchMenuItems = async () => {
        setLoading(prev => ({ ...prev, menuItems: true }));
        try {
            const from = (menuItemsPagination.page - 1) * menuItemsPagination.perPage;
            const to = from + menuItemsPagination.perPage - 1;

            const { data, error, count } = await supabase
                .from('menu_items')
                .select('*', { count: 'exact' })
                .order('name', { ascending: true })
                .range(from, to);

            if (error) throw error;
            setMenuItems(data || []);
            setMenuItemsPagination(prev => ({ ...prev, total: count || 0 }));
        } catch (error) {
            console.error('Error fetching menu items:', error);
        } finally {
            setLoading(prev => ({ ...prev, menuItems: false }));
        }
    };

    // Fetch data when tab or pagination changes
    useEffect(() => {

            fetchOrders();
    
            fetchReservations();
  
            fetchMenuItems();
        
    }, [activeTab]);

    // State for modals
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState<any>(null);
    const [newMenuItem, setNewMenuItem] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null as File | null
    });

    // Handle input changes for new menu item
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (isEditModalOpen && currentEditItem) {
            setCurrentEditItem((prev: any) => ({ ...prev, [name]: value }));
        } else {
            setNewMenuItem(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (isEditModalOpen && currentEditItem) {
                setCurrentEditItem((prev: any) => ({ ...prev, image: e.target.files![0] }));
            } else {
                setNewMenuItem(prev => ({ ...prev, image: e.target.files![0] }));
            }
        }
    };

    // Add new menu item
    const handleAddMenuItem = async () => {
        if (!newMenuItem.name || !newMenuItem.description || !newMenuItem.price || !newMenuItem.category) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            let imageUrl = currentEditItem?.image_url || '';

            // Upload new image if provided
            if (newMenuItem.image) {
                const fileExt = newMenuItem.image.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase
                    .storage
                    .from('menu-images')
                    .upload(filePath, newMenuItem.image);

                if (uploadError) throw uploadError;

                // Get the public URL
                const { data: urlData } = supabase
                    .storage
                    .from('menu-images')
                    .getPublicUrl(filePath);

                imageUrl = urlData.publicUrl;
            }

            // Insert the menu item
            const { data, error } = await supabase
                .from('menu_items')
                .insert([{
                    name: newMenuItem.name,
                    description: newMenuItem.description,
                    price: parseFloat(newMenuItem.price),
                    category: newMenuItem.category,
                    image_url: imageUrl
                }])
                .select();

            if (error) throw error;

            // Update local state
            if (data) {
                setMenuItems(prev => [...prev, data[0]]);
                setIsAddModalOpen(false);
                setNewMenuItem({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    image: null
                });
            }
        } catch (error) {
            console.error('Error adding menu item:', error);
        }
    };

    // Edit menu item
    const handleEditMenuItem = async () => {
        if (!currentEditItem?.name || !currentEditItem?.description || !currentEditItem?.price || !currentEditItem?.category) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            let imageUrl = currentEditItem.image_url;

            // Upload new image if provided
            if (currentEditItem.image instanceof File) {
                // First delete old image if exists
                if (imageUrl) {
                    const fileName = imageUrl.split('/').pop();
                    if (fileName) {
                        await supabase
                            .storage
                            .from('menu-images')
                            .remove([fileName]);
                    }
                }

                // Upload new image
                const fileExt = currentEditItem.image.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase
                    .storage
                    .from('menu-images')
                    .upload(filePath, currentEditItem.image);

                if (uploadError) throw uploadError;

                // Get the public URL
                const { data: urlData } = supabase
                    .storage
                    .from('menu-images')
                    .getPublicUrl(filePath);

                imageUrl = urlData.publicUrl;
            }

            // Update the menu item
            const { data, error } = await supabase
                .from('menu_items')
                .update({
                    name: currentEditItem.name,
                    description: currentEditItem.description,
                    price: parseFloat(currentEditItem.price),
                    category: currentEditItem.category,
                    image_url: imageUrl
                })
                .eq('id', currentEditItem.id)
                .select();

            if (error) throw error;

            // Update local state
            if (data) {
                setMenuItems(prev => prev.map(item =>
                    item.id === currentEditItem.id ? data[0] : item
                ));
                setIsEditModalOpen(false);
                setCurrentEditItem(null);
            }
        } catch (error) {
            console.error('Error editing menu item:', error);
        }
    };

    // Delete menu item
    const deleteMenuItem = async (id: number) => {
        if (!confirm('Are you sure you want to delete this menu item?')) return;

        try {
            // First delete the image if exists
            const itemToDelete = menuItems.find(item => item.id === id);
            if (itemToDelete?.image_url) {
                const fileName = itemToDelete.image_url.split('/').pop();
                if (fileName) {
                    await supabase
                        .storage
                        .from('menu-images')
                        .remove([fileName]);
                }
            }

            // Then delete the menu item
            const { error } = await supabase
                .from('menu_items')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setMenuItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting menu item:', error);
        }
    };

    // Update order status
    const updateOrderStatus = async (orderId: number, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('ordered_items')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;

            // Update local state
            setOrdersData(prev => prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    // Delete order
    const deleteOrder = async (orderId: number) => {
        if (!confirm('Are you sure you want to delete this order?')) return;

        try {
            const { error } = await supabase
                .from('ordered_items')
                .delete()
                .eq('id', orderId);

            if (error) throw error;

            // Update local state
            setOrdersData(prev => prev.filter(order => order.id !== orderId));
            setOrdersPagination(prev => ({ ...prev, total: prev.total - 1 }));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    // Edit reservation
    const editReservation = (reservation: any) => {
        setCurrentEditItem(reservation);
        setIsEditModalOpen(true);
    };

    // Update reservation
    const updateReservation = async () => {
        if (!currentEditItem?.name || !currentEditItem?.phone || !currentEditItem?.delivery_datetime) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('reservations')
                .update({
                    name: currentEditItem.name,
                    phone: currentEditItem.phone,
                    address: currentEditItem.address,
                    delivery_datetime: currentEditItem.delivery_datetime,
                    notes: currentEditItem.notes,
                    items: currentEditItem.items
                })
                .eq('id', currentEditItem.id)
                .select();

            if (error) throw error;

            // Update local state
            if (data) {
                setReservationsData(prev => prev.map(res =>
                    res.id === currentEditItem.id ? data[0] : res
                ));
                setIsEditModalOpen(false);
                setCurrentEditItem(null);
            }
        } catch (error) {
            console.error('Error updating reservation:', error);
        }
    };

    // Delete reservation
    const deleteReservation = async (reservationId: number) => {
        if (!confirm('Are you sure you want to delete this reservation?')) return;

        try {
            const { error } = await supabase
                .from('reservations')
                .delete()
                .eq('id', reservationId);

            if (error) throw error;

            // Update local state
            setReservationsData(prev => prev.filter(res => res.id !== reservationId));
            setReservationsPagination(prev => ({ ...prev, total: prev.total - 1 }));
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    // Format orders data for display
    const formatOrderData = (order: any) => {
        return {
            id: order.id,
            name: order.customer_name,
            phone: order.customer_phone,
            address: order.customer_address,
            items: order.orders.map((item: any) => ({
                item: item.name,
                quantity: item.quantity
            })),
            notes: order.notes,
            status: order.status,
            created_at: order.created_at
        };
    };

    // Format reservations data for display
    const formatReservationData = (reservation: any) => {
        return {
            id: reservation.id,
            name: reservation.name,
            phone: reservation.phone,
            address: reservation.address,
            delivery_datetime: reservation.delivery_datetime,
            items: reservation.items,
            notes: reservation.notes,
            created_at: reservation.created_at
        };
    };

    // Pagination handlers
    const handleOrdersPageChange = (newPage: number) => {
        setOrdersPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleReservationsPageChange = (newPage: number) => {
        setReservationsPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleMenuItemsPageChange = (newPage: number) => {
        setMenuItemsPagination(prev => ({ ...prev, page: newPage }));
    };
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);




    const prepareChartData = () => {
        // Orders by status
        const statusCounts = ordersData.reduce((acc, order) => {
            const status = order.status.toLowerCase();
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const statusData = [
            { name: 'Pending', value: statusCounts.pending || 0 },
            { name: 'Processing', value: statusCounts.processing || 0 },
            { name: 'Completed', value: statusCounts.completed || 0 },
            { name: 'Cancelled', value: statusCounts.cancelled || 0 },
        ];

        // Orders by day (last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
        }).reverse();

        const ordersByDay = last7Days.map(date => {
            const count = ordersData.filter(order => {
                const orderDate = new Date(order.created_at).toISOString().split('T')[0];
                return orderDate === date;
            }).length;
            return { date, count };
        });

        // Reservations by day (next 7 days)

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day
        
        const next7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() + i);
          return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        });
      
        // Process reservations data - FIXED VERSION
        const reservationsByDay = next7Days.map(date => {
          const count = reservationsData.filter(reservation => {
            try {
              // For ISO format "2025-04-27T00:48:00"
              const reservationDate = reservation.delivery_datetime.split('T')[0];
              return reservationDate === date;
            } catch (error) {
              console.error('Error parsing delivery date:', reservation.delivery_datetime);
              return false;
            }
          }).length;
          return { 
            date,
            count,
            formattedDate: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
          };
        });

        const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 hours
        const ordersByHour = hours.map(hour => {
            const count = ordersData.filter(order => {
                const orderHour = new Date(order.created_at).getHours();
                return orderHour === hour;
            }).length;
            return { hour: `${hour}:00`, count };
        });

        return { statusData, ordersByDay, reservationsByDay, ordersByHour };
    };

    const { statusData, ordersByDay, reservationsByDay, ordersByHour } = prepareChartData();

    // Colors for charts
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];




    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Sidebar - Keep your existing sidebar code */}
            {mobileMenuOpen && (
                <ul className="lg:hidden bg-white shadow-md rounded-md mb-4 p-4 space-y-2">
                    <li>
                        <button
                            onClick={() => {
                                setActiveTab('dashboard');
                                setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left p-3 rounded-lg ${activeTab === 'dashboard'
                                    ? 'bg-yellow-100 text-yellow-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Dashboard Overview
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setActiveTab('orders');
                                setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left p-3 rounded-lg ${activeTab === 'orders'
                                    ? 'bg-yellow-100 text-yellow-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Orders Management
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setActiveTab('reservations');
                                setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left p-3 rounded-lg ${activeTab === 'reservations'
                                    ? 'bg-yellow-100 text-yellow-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Reservations
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                setActiveTab('menuItems');
                                setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left p-3 rounded-lg ${activeTab === 'menuItems'
                                    ? 'bg-yellow-100 text-yellow-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Menu Items
                        </button>
                    </li>
                    <li>
                    <button
                        onClick={() => handleLogout()}
                        className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                        Log Out
                    </button>
                    </li>
                </ul>
            )}

            {/* Navigation Sidebar */}
            <div className="hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-white lg:shadow-lg">

                <div className="p-6">
                    <h1 className="text-2xl font-bold text-yellow-600 mb-8">Admin Panel</h1>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    onClick={() => setActiveTab('dashboard')}
                                    className={`w-full text-left p-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-yellow-100 text-yellow-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    Dashboard Overview
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full text-left p-3 rounded-lg ${activeTab === 'orders' ? 'bg-yellow-100 text-yellow-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    Orders Management
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('reservations')}
                                    className={`w-full text-left p-3 rounded-lg ${activeTab === 'reservations' ? 'bg-yellow-100 text-yellow-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    Reservations
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('menuItems')}
                                    className={`w-full text-left p-3 rounded-lg ${activeTab === 'menuItems' ? 'bg-yellow-100 text-yellow-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    Menu Items
                                </button>

                            </li>
                            {/* <li>
                                <button className="w-full text-left p-3 rounded-lg text-gray-600 hover:bg-gray-100">
                                    Customer Support
                                </button>
                            </li> */}
                        </ul>
                    </nav>
                </div>
                <div className="absolute bottom-0 w-full p-6">
                    <button
                        onClick={() => handleLogout()}
                        className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                        Log Out
                    </button>
                </div>
            </div>


            {/* Main Content */}
            <div className="lg:ml-64 p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {activeTab === 'dashboard'
                            ? 'Dashboard Overview'
                            : activeTab === 'orders'
                                ? 'Orders Management'
                                : 'Reservations'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        {/* Hamburger only visible on small devices */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="block lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                        >
                            {/* Hamburger Icon */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                            AD
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Orders by Status Pie Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders by Status</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Orders Bar Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders (Last 7 Days)</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={ordersByDay}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" name="Orders" fill="#FFBB28" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Upcoming Reservations Bar Chart */}
                    {/* Upcoming Reservations */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Upcoming Reservations</h3>
                            <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                {reservationsData.length} total
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={reservationsByDay}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                    />
                                    <Bar
                                        dataKey="count"
                                        name="Reservations"
                                        fill="#10B981"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Orders by Time of Day (if you have time data) */}

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders by Time of Day</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={ordersByHour}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="hour"
                                        tick={{ fontSize: 12 }}
                                        interval={3} // Show every 3rd hour to prevent crowding
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="count"
                                        name="Orders"
                                        fill="#8884d8"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>



                </div>
                {/* Orders Table */}
                {activeTab === 'orders' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
                            <button
                                onClick={fetchOrders}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                            >
                                Refresh Orders
                            </button>
                        </div>

                        {loading.orders ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {ordersData.map((order) => {
                                                const formattedOrder = formatOrderData(order);
                                                return (
                                                    <tr key={order.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="font-medium text-gray-900">{formattedOrder.name}</div>
                                                            <div className="text-sm text-gray-500">{formattedOrder.address}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {formattedOrder.phone}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {formattedOrder.items.map((item: any, index: number) => (
                                                                <div key={index} className="text-sm text-gray-900">
                                                                    {item.item} <span className="text-gray-500">(x{item.quantity})</span>
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                                            {formattedOrder.notes}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <select
                                                                value={formattedOrder.status}
                                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                                className={`px-2 py-1 text-xs rounded-full ${statusColors[formattedOrder.status.toLowerCase()]}`}
                                                            >
                                                                <option value="pending" className="bg-yellow-100 text-yellow-800">Pending</option>
                                                                <option value="processing" className="bg-blue-100 text-blue-800">Processing</option>
                                                                <option value="completed" className="bg-green-100 text-green-800">Completed</option>
                                                                <option value="cancelled" className="bg-red-100 text-red-800">Cancelled</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button
                                                                onClick={() => deleteOrder(order.id)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Showing <span className="font-medium">{(ordersPagination.page - 1) * ordersPagination.perPage + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(ordersPagination.page * ordersPagination.perPage, ordersPagination.total)}
                                        </span> of <span className="font-medium">{ordersPagination.total}</span> results
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleOrdersPageChange(ordersPagination.page - 1)}
                                            disabled={ordersPagination.page === 1}
                                            className={`px-3 py-1 border rounded-lg text-sm ${ordersPagination.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            Previous
                                        </button>
                                        {Array.from({ length: Math.ceil(ordersPagination.total / ordersPagination.perPage) }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleOrdersPageChange(i + 1)}
                                                className={`px-3 py-1 border rounded-lg text-sm ${ordersPagination.page === i + 1 ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => handleOrdersPageChange(ordersPagination.page + 1)}
                                            disabled={ordersPagination.page * ordersPagination.perPage >= ordersPagination.total}
                                            className={`px-3 py-1 border rounded-lg text-sm ${ordersPagination.page * ordersPagination.perPage >= ordersPagination.total ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Reservations Table */}
                {activeTab === 'reservations' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Upcoming Reservations</h2>
                            <button
                                onClick={fetchReservations}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                            >
                                Refresh Reservations
                            </button>
                        </div>

                        {loading.reservations ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {reservationsData.map((reservation) => {
                                                const formattedReservation = formatReservationData(reservation);
                                                return (
                                                    <tr key={reservation.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="font-medium text-gray-900">{formattedReservation.name}</div>
                                                            <div className="text-sm text-gray-500">{formattedReservation.address}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {formattedReservation.phone}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {new Date(formattedReservation.delivery_datetime).toLocaleString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {formattedReservation.items.map((item: any, index: number) => (
                                                                <div key={index} className="text-sm text-gray-900">
                                                                    {item.name} <span className="text-gray-500">(x{item.quantity})</span>
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                                            {formattedReservation.notes}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button
                                                                onClick={() => editReservation(reservation)}
                                                                className="text-yellow-600 hover:text-yellow-800 mr-3"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => deleteReservation(reservation.id)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Showing <span className="font-medium">{(reservationsPagination.page - 1) * reservationsPagination.perPage + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(reservationsPagination.page * reservationsPagination.perPage, reservationsPagination.total)}
                                        </span> of <span className="font-medium">{reservationsPagination.total}</span> results
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleReservationsPageChange(reservationsPagination.page - 1)}
                                            disabled={reservationsPagination.page === 1}
                                            className={`px-3 py-1 border rounded-lg text-sm ${reservationsPagination.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            Previous
                                        </button>
                                        {Array.from({ length: Math.ceil(reservationsPagination.total / reservationsPagination.perPage) }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleReservationsPageChange(i + 1)}
                                                className={`px-3 py-1 border rounded-lg text-sm ${reservationsPagination.page === i + 1 ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => handleReservationsPageChange(reservationsPagination.page + 1)}
                                            disabled={reservationsPagination.page * reservationsPagination.perPage >= reservationsPagination.total}
                                            className={`px-3 py-1 border rounded-lg text-sm ${reservationsPagination.page * reservationsPagination.perPage >= reservationsPagination.total ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Menu Items Table */}
                {activeTab === 'menuItems' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Menu Items</h2>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                            >
                                + Add Menu Item
                            </button>
                        </div>

                        {loading.menuItems ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {menuItems.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item.image_url && (
                                                            <div className="w-16 h-16 rounded-md overflow-hidden">
                                                                <img
                                                                    src={item.image_url}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                                        {item.description}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.category}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        ₱{parseFloat(item.price).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => {
                                                                setCurrentEditItem(item);
                                                                setIsEditModalOpen(true);
                                                            }}
                                                            className="text-yellow-600 hover:text-yellow-800 mr-3"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => deleteMenuItem(item.id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Showing <span className="font-medium">{(menuItemsPagination.page - 1) * menuItemsPagination.perPage + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(menuItemsPagination.page * menuItemsPagination.perPage, menuItemsPagination.total)}
                                        </span> of <span className="font-medium">{menuItemsPagination.total}</span> results
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleMenuItemsPageChange(menuItemsPagination.page - 1)}
                                            disabled={menuItemsPagination.page === 1}
                                            className={`px-3 py-1 border rounded-lg text-sm ${menuItemsPagination.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            Previous
                                        </button>
                                        {Array.from({ length: Math.ceil(menuItemsPagination.total / menuItemsPagination.perPage) }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleMenuItemsPageChange(i + 1)}
                                                className={`px-3 py-1 border rounded-lg text-sm ${menuItemsPagination.page === i + 1 ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => handleMenuItemsPageChange(menuItemsPagination.page + 1)}
                                            disabled={menuItemsPagination.page * menuItemsPagination.perPage >= menuItemsPagination.total}
                                            className={`px-3 py-1 border rounded-lg text-sm ${menuItemsPagination.page * menuItemsPagination.perPage >= menuItemsPagination.total ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Add Menu Item Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">Add New Menu Item</h3>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newMenuItem.name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                                        <textarea
                                            name="description"
                                            value={newMenuItem.description}
                                            onChange={handleInputChange}
                                            rows={3}
                                            maxLength={50}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={newMenuItem.price}
                                            onChange={handleInputChange}
                                            step="0.01"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                                        <select
                                            name="category"
                                            value={newMenuItem.category}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Appetizer">Appetizer</option>
                                            <option value="Main Course">Main Course</option>
                                            <option value="Pasta">Pasta</option>
                                            <option value="Dessert">Dessert</option>
                                            <option value="Drinks">Drinks</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Image*</label>
                                        <div className="mt-1 flex items-center">
                                            <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer">
                                                <span>Upload Image</span>
                                                <input
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    required
                                                />
                                            </label>
                                            <span className="ml-3 text-sm text-gray-500">
                                                {newMenuItem.image ? newMenuItem.image.name : 'No file chosen'}
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddMenuItem}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600"
                                >
                                    Add Item
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal (used for both menu items and reservations) */}
                {(isEditModalOpen && currentEditItem) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {activeTab === 'menuItems' ? 'Edit Menu Item' : 'Edit Reservation'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setCurrentEditItem(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <form className="space-y-4">
                                    {activeTab === 'menuItems' ? (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={currentEditItem.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                                                <textarea
                                                    name="description"
                                                    value={currentEditItem.description}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={currentEditItem.price}
                                                    onChange={handleInputChange}
                                                    step="0.01"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                                                <select
                                                    name="category"
                                                    value={currentEditItem.category}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    required
                                                >
                                                    <option value="">Select a category</option>
                                                    <option value="Appetizer">Appetizer</option>
                                                    <option value="Main Course">Main Course</option>
                                                    <option value="Pasta">Pasta</option>
                                                    <option value="Dessert">Dessert</option>
                                                    <option value="Drinks">Drinks</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                                <div className="mt-1 flex items-center">
                                                    <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer">
                                                        <span>Change Image</span>
                                                        <input
                                                            type="file"
                                                            className="sr-only"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                        />
                                                    </label>
                                                    <span className="ml-3 text-sm text-gray-500">
                                                        {currentEditItem.image instanceof File ? currentEditItem.image.name :
                                                            currentEditItem.image_url ? 'Current image' : 'No image selected'}
                                                    </span>
                                                </div>
                                                {currentEditItem.image_url && !(currentEditItem.image instanceof File) && (
                                                    <div className="mt-2 w-32 h-32">
                                                        <img
                                                            src={currentEditItem.image_url}
                                                            alt="Current menu item"
                                                            className="w-full h-full object-cover rounded-md"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name*</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={currentEditItem.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={currentEditItem.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={currentEditItem.address}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date/Time*</label>
                                                <input
                                                    type="datetime-local"
                                                    name="delivery_datetime"
                                                    value={currentEditItem.delivery_datetime}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                                <textarea
                                                    name="notes"
                                                    value={currentEditItem.notes}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Items</label>
                                                <div className="border border-gray-200 rounded-md p-3">
                                                    {currentEditItem.items?.map((item: any, index: number) => (
                                                        <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
                                                            <span>
                                                                {item.name} (x{item.quantity})
                                                            </span>
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    type="button"
                                                                    className="text-yellow-600 hover:text-yellow-800 text-sm"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="mt-2 text-sm text-yellow-600 hover:text-yellow-800"
                                                    >
                                                        + Add Item
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </form>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setCurrentEditItem(null);
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={activeTab === 'menuItems' ? handleEditMenuItem : updateReservation}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;