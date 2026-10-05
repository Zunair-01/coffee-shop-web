import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null, 
  });
  const [editItemData, setEditItemData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null,
  });
  const [items, setItems] = useState([]);

  const toggleForm = () => setShowForm(true);
  const showTable = () => setShowForm(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  const handleLogoutCancel = () => setShowLogoutModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image); 
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/items/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Item added successfully:', response.data);
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image:'',
      });
      document.getElementById('image').value = ''; // Clear the file input
      alert('Item added successfully!');
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error.response ? error.response.data : error.message);
    }
  };
  

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/items');
      setItems(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching items:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditClick = (item) => {
    setEditItemData(item);
    setEditItemId(item._id);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFileChange = (e) => {
    setEditItemData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    const data = new FormData();
    data.append('name', editItemData.name);
    data.append('price', editItemData.price);
    data.append('description', editItemData.description);
    data.append('category', editItemData.category);
    data.append('image', editItemData.image); 
    try {
      const response = await axios.put(`http://localhost:3001/api/items/${editItemId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Item updated successfully:', response.data);
      setEditItemData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null,
      });
      setShowEditModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error.response ? error.response.data : error.message);
    }
  };
  

  const handleDeleteClick = (itemId) => {
    setDeleteItemId(itemId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/items/${deleteItemId}`);
      console.log('Item deleted successfully');
      setShowDeleteModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteCancel = () => setShowDeleteModal(false);

  useEffect(() => {
    fetchItems();

    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header */}
      <header className="flex justify-between items-center bg-gray-200 p-4 shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="relative dropdown">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 bg-white p-2 rounded shadow cursor-pointer"
          >
            <span className="font-semibold">Admin</span>
            <span className={`text-lg transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}>▼</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-700 text-white border border-gray-500 shadow-md rounded w-40">
              <ul>
                <li
                  className="p-3 hover:bg-gray-600 cursor-pointer"
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 p-6 shadow-md">
          <div
            className="flex items-center mb-6 cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={toggleForm}
          >
            <span className="text-2xl mr-3">☕</span>
            <span className="text-lg">Add Coffee Item</span>
          </div>
          <div
            className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={showTable}
          >
            <span className="text-2xl mr-3">📋</span>
            <span className="text-lg">View Coffee Items</span>
          </div>
        </div>
        

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">{showForm ? 'Add Coffee Item' : 'View Coffee Items'}</h1>
          {!showForm ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  
                  <th className="py-3 px-4 border-b">Name</th>
                  <th className="py-3 px-4 border-b">Price</th>
                  <th className="py-3 px-4 border-b">Description</th>
                  <th className="py-3 px-4 border-b">Category</th>
                  <th className="py-3 px-4 border-b">Image</th>
                  <th className="py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="py-3 px-4 border-b">{item.name}</td>
                    <td className="py-3 px-4 border-b">{item.price}</td>
                    <td className="py-3 px-4 border-b">{item.description}</td>
                    <td className="py-3 px-4 border-b">{item.category}</td>
                    <td className="py-3 px-4 border-b">
                      {item.image ? (
                        <img src={`http://localhost:3001/${item.image}`} alt="Coffee" className="w-16 h-16 object-cover" />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="mr-2 p-2 bg-blue-500 text-white rounded"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item._id)}
                        className="p-2 bg-red-500 text-white rounded"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  id="price"
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="image">
                  Image
                </label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Coffee Item
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg">Are you sure you want to logout?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={handleLogoutCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleLogoutConfirm}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Coffee Item</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="edit-name">
                  Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  name="name"
                  value={editItemData.name}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="edit-price">
                  Price
                </label>
                <input
                  id="edit-price"
                  type="text"
                  name="price"
                  value={editItemData.price}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="edit-description">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={editItemData.description}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="edit-category">
                  Category
                </label>
                <input
                  id="edit-category"
                  type="text"
                  name="category"
                  value={editItemData.category}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="edit-image">
                  Image
                </label>
                <input
                  id="edit-image"
                  type="file"
                  name="image"
                  
                  onChange={handleEditFileChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Update Coffee Item
              </button>
              <button
                onClick={()=>setShowEditModal(false)}
                className="bg-gray-500 ml-28 text-black p-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg">Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
