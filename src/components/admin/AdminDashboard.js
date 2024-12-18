// src/components/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '국내여행',
    description: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Firebase에서 상품 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
        alert('상품을 불러오는데 실패했습니다.');
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // 상품 수정
        const productRef = doc(db, 'products', editingId);
        await updateDoc(productRef, {
          ...formData,
          price: Number(formData.price)
        });

        setProducts(products.map(product => 
          product.id === editingId ? 
          { ...formData, id: editingId, price: Number(formData.price) } : 
          product
        ));
        setEditingId(null);
      } else {
        // 새 상품 추가
        const docRef = await addDoc(collection(db, 'products'), {
          ...formData,
          price: Number(formData.price)
        });

        setProducts([
          ...products,
          {
            ...formData,
            id: docRef.id,
            price: Number(formData.price)
          }
        ]);
      }

      // 폼 초기화
      setFormData({
        title: '',
        price: '',
        category: '국내여행',
        description: '',
        image: ''
      });
    } catch (error) {
      console.error("Error adding/updating product: ", error);
      alert('상품 저장에 실패했습니다.');
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error("Error deleting product: ", error);
        alert('상품 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>여행 상품 관리</h1>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>상품명:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>가격:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>카테고리:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="국내여행">국내여행</option>
            <option value="해외여행">해외여행</option>
            <option value="액티비티">액티비티</option>
            <option value="숙박">숙박</option>
            <option value="맛집">맛집</option>
          </select>
        </div>

        <div className="form-group">
          <label>설명:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>이미지 URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">
          {editingId ? '수정하기' : '상품 등록'}
        </button>
      </form>

      <div className="product-list">
        <h2>등록된 상품 목록</h2>
        <table>
          <thead>
            <tr>
              <th>상품명</th>
              <th>카테고리</th>
              <th>가격</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.price.toLocaleString()}원</td>
                <td>
                  <button onClick={() => handleEdit(product)}>수정</button>
                  <button onClick={() => handleDelete(product.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;