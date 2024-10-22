import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/logo.png";

const Header = () => {
  return (
    <ReactNavbar
      searchIcon={true}
      SearchIconElement={MdSearch}
      profileIcon={true}
      ProfileIconElement={MdAccountCircle}
      cartIcon={true}
      CartIconElement={MdAddShoppingCart}
      burgerColorHover="#eb4034" //menu button hover colour
      logo={logo} //for ecommerce logo
      logoWidth="20vmax" //vmax is 20% of viewport,can use px also
      navColor1="white" //background of menu
      logoHoverSize="10px" //hover spread size     https://www.npmjs.com/package/overlay-navbar
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35, 35, 35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      profileIconUrl="/login"
      profileIconColor="rgba(35, 35, 35,0.8)"
      searchIconColor="rgba(35, 35, 35,0.8)"
      cartIconColor="rgba(35, 35, 35,0.8)"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"
    />
  );
};

export default Header;
