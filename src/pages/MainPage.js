// src/pages/MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-logo">Travel Whisper</div>
        <div className="nav-links">
          <a href="#domestic">국내여행</a>
          <a href="#overseas">해외여행</a>
          <a href="#activity">액티비티</a>
          <a href="#accommodation">숙박</a>
          <a href="#restaurant">맛집</a>
          <button 
            onClick={() => navigate('/admin/login')}
            className="admin-button"
          >
            관리자 로그인
          </button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1>당신의 완벽한 여행을 시작하세요</h1>
          <div className="search-box">
            <input type="text" placeholder="어디로 떠나시나요?" />
            <button>검색</button>
          </div>
        </div>
      </header>

      <section className="categories">
        <h2>인기 여행지</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9" alt="제주도" />
            <h3>제주도</h3>
            <p>섬 전체가 하나의 관광지, 제주도</p>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1553066261-9c35c54c4d10" alt="부산" />
            <h3>부산</h3>
            <p>해운대와 광안리의 도시</p>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1540820658621-c467669c3be4" alt="도쿄" />
            <h3>도쿄</h3>
            <p>일본의 수도, 도쿄</p>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1540820759448-4e7ea35d7331" alt="방콕" />
            <h3>방콕</h3>
            <p>태국의 활기찬 수도</p>
          </div>
        </div>
      </section>

      <section className="promotions">
        <h2>특별 프로모션</h2>
        <div className="promotion-grid">
          <div className="promotion-card">
            <img src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9" alt="프로모션1" />
            <div className="promotion-content">
              <h3>제주 3박 4일 패키지</h3>
              <p>299,000원부터</p>
              <button>자세히 보기</button>
            </div>
          </div>
          <div className="promotion-card">
            <img src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9" alt="프로모션2" />
            <div className="promotion-content">
              <h3>방콕 5박 6일 패키지</h3>
              <p>599,000원부터</p>
              <button>자세히 보기</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Travel Whisper. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MainPage;