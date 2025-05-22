'use client'

import { useEffect, useState } from 'react';
import Header from "@/app/comps/Header";
import supabase from '@/utils/Supabase';
import IsLoggedIn from '@/utils/IsloggedIn';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/app/comps/Footer';
import { useRouter } from 'next/navigation'



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


export default function Reservation() {
  const [user] = IsLoggedIn()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch menu items (same as before)
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch menu items');
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, [supabase]);




  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    delivery_datetime: '', // <- FIXED this name
    notes: '',
    user_id: user?.id || '',
    items: [] as { name: string; quantity: number, price: number }[]
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  const handleItemChange = (itemName: string, quantity: number, price: number) => {
    setFormData(prev => {
      const existingItemIndex = prev.items.findIndex(item => item.name === itemName);
  
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev.items];
        if (quantity > 0) {
          updatedItems[existingItemIndex] = { 
            ...updatedItems[existingItemIndex], 
            quantity, 
            price  // update price if needed
          };
        } else {
          updatedItems.splice(existingItemIndex, 1);
        }
        return { ...prev, items: updatedItems };
      } else if (quantity > 0) {
        return { 
          ...prev, 
          items: [...prev.items, { name: itemName, quantity, price }] 
        };
      }
  
      return prev;
    });
  };
  

  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();


    if (!user)  {
  
      toast.error('You must be logged in to make a reservation.');


      setTimeout(() => {
        router.push('/sign-in')
      }, 2000);
      return
    }



    console.log(user)
    formData.user_id = user?.id || ''
    console.log('Reservation submitted:', formData);

    try {
      const { data, error } = await supabase.from('reservations').insert(formData);
      if (error) {
        throw error;
      }

    
        console.log('Reservation submitted:', formData);

        toast.success('Reservation submitted successfully!');

        setFormData({
          name: '',
          phone: '',
          address: '',
          delivery_datetime: '', // <- FIXED this name
          notes: '',
          user_id: user?.id || '',
          items: [] as { name: string; quantity: number, price: number }[]
        });
      
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast.error('Error submitting reservation. Please try again.');
    }


  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ToastContainer position="top-right" />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">Make a Reservation</h1>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Customer Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Customer Information</h2>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="delivery_datetime" className="block text-sm font-medium text-gray-700 mb-1">Delivery Date & Time</label>
                <input
                  type="datetime-local"
                  id="delivery_datetime"
                  name="delivery_datetime"
                  value={formData.delivery_datetime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Order Items</h2>

              <div className="space-y-4">
                {menuItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">₱{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">

                      <button
                        type="button"
                        onClick={() =>
                          handleItemChange(
                            item.name,
                            (formData.items.find(i => i.name === item.name)?.quantity || 0) - 1,
                            item.price
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="w-8 text-center">
                        {formData.items.find(i => i.name === item.name)?.quantity || 0}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleItemChange(
                            item.name,
                            (formData.items.find(i => i.name === item.name)?.quantity || 0) + 1,
                            item.price
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Any allergies, special requests, or delivery instructions..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={formData.items.length === 0}
              className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>

      
      <Footer />
    </div>
  );
}