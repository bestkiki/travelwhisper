// src/pages/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('유효하지 않은 이메일 주소입니다.');
          break;
        case 'auth/user-not-found':
          setError('등록되지 않은 사용자입니다.');
          break;
        case 'auth/wrong-password':
          setError('잘못된 비밀번호입니다.');
          break;
        default:
          setError('로그인 중 오류가 발생했습니다.');
      }
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <button className="back-button" onClick={handleBack}>
          ← 메인으로 돌아가기
        </button>
        <h1>관리자 로그인</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>이메일:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="관리자 이메일 입력"
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="login-button">로그인</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;