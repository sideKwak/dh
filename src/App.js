import React, { useState, useEffect } from 'react';
import './App.css'; // 여기에 스타일링을 추가합니다.

const products = [
  {
    id: 1,
    name: 'Product 1',
    imgSrc: require('../src/img/product1.png'),
    description: 'This is the description for Product 1. It provides detailed information about the product, including its features and benefits.'
  },
  {
    id: 2,
    name: 'Product 2',
    imgSrc: require('../src/img/product2.png'),
    description: 'This is the description for Product 2. It includes all the necessary details to understand the value of the product.'
  },
  {
    id: 3,
    name: 'Product 3',
    imgSrc: require('../src/img/product3.png'),
    description: 'This is the description for Product 3. It highlights the key aspects and advantages of the product.'
  },
  {
    id: 4,
    name: 'Product 4',
    imgSrc: require('../src/img/product4.png'),
    description: 'This is the description for Product 4. It covers all the important points that a customer should know.'
  }
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showProducts, setShowProducts] = useState(false); // 제품 리스트 표시 여부 상태
  const [visibleProducts, setVisibleProducts] = useState([]); // 보이는 제품 리스트

  useEffect(() => {
    if (showProducts) {
      products.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProducts(prev => [...prev, index]);
        }, index * 400); // 200ms 간격으로 각 제품이 나타나도록 설정//
      });
    } else {
      setVisibleProducts([]);
    }
  }, [showProducts]);

  useEffect(() => {
    if (showModal && selectedProduct) {
      setDescriptionText('');
      setImageLoaded(false);
      const fullText = selectedProduct.description;
      let currentIndex = 0;

      const intervalId = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDescriptionText(prev => prev + fullText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 20); // 한 글자씩 20ms 간격으로 나타나도록 설정

      return () => clearInterval(intervalId);
    } else {
      setDescriptionText('');
    }
  }, [showModal, selectedProduct]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const toggleProducts = () => {
    setShowProducts(!showProducts);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src={require('../src/img/logo.png')} alt="Logo" />
        </div>
        <h1 className="title">
          <span className="highlight">DH THXTILE</span> <br />
          다크에덴 클래식 <span className="version">SOFTON</span> <span className="update">sample_01</span>
        </h1>
      </header>
      <main className="main-content">
        <button onClick={toggleProducts} className="toggle-button">
          {showProducts ? '▲ Product Overview' : '▼ Product Overview'}
        </button>
        
        <div className={`tabs ${showProducts ? 'show' : 'hide'}`}>
          {products.map((product, index) => (
            <button 
              key={product.id} 
              onClick={() => handleProductClick(product)}
              className={`tab-button ${visibleProducts.includes(index) ? 'visible' : ''}`}
            >
              {product.name}
            </button>
          ))}
        </div>

        {showModal && (
          <>
            <div className="overlay" onClick={handleCloseModal}></div>
            <div className="modal">
              <img 
                src={selectedProduct.imgSrc} 
                alt={selectedProduct.name} 
                className="modal-image" 
                onLoad={handleImageLoad} 
              />
              {imageLoaded && (
                <div className="modal-description">
                  <p style={{ opacity: showModal ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                    {descriptionText}
                  </p>
                  <button className="close-button" onClick={handleCloseModal}>Close</button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;