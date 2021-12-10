import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/imgs/logo.png';
import './Header.scss';

const Header = () => {
  const headerRef = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollTop = document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500;
      if (scrollTop) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    })
  })

  const handleClickBrand = () => {
    window.scroll(0, 0);
  }

  return (
    <header ref={headerRef} className="header">
      <div className="header-container container">
        <div className="header__logo">
          <img src={logo} alt="logo" />
        </div>
        <Link onClick={handleClickBrand} to="/" className="header__brand">
          Movie films
        </Link>
      </div>
    </header>
  );
};

export default Header;
