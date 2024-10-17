import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import BassURl from "../Api/Api";
import Footer from "../components/Footer";
import imageURl from "../Api/ImageUrl";
import { Link, useParams ,useLocation } from "react-router-dom";

function ShopByRecent() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => {
    setIsFilterOpen(prevState => !prevState);
  };
  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  const { url , gender } = useParams();
  
  //console.log("Category URL:", url);
  //console.log("Gender:", gender || "all");

  const [shopByRecent, setShopByRecent] = useState([]);
  //console.log(shopByRecent);
  const [tagDetail, settagDetail] = useState([]);
  const [apiStatus, setApiStatus] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  // Code Converted
  

  const [Category, setCategory] = useState([]);
  console.log(Category);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  //const gender = queryParams.get('gender');

  useEffect(() => {
    axios.get(`${BassURl}/all-categories-and-sub-category`).then((res) => {
      setCategory(res.data.data.category);
     });
  }, []);

  const [ShopByColor, setShopByColor] = useState();

  useEffect(() => {
    axios.get(`${BassURl}/all-color`).then((res) => {
      setShopByColor(res.data.data);
    });
  }, []);    
 
  // let urlTemp = `${BassURl}/product-by-tag/${url}/${gender}`;
  // console.log(urlTemp);
  // useEffect(() => {
  //   axios
  //     .get(`${urlTemp}`)
  //     .then((res) => {
  //       if (res.data.code === 200) {
  //         setShopByRecent(res.data.data);
  //         settagDetail(res.data.tag);
  //         setApiStatus('success');
  //       } else {
  //         setApiStatus('error');
  //       }
  //     })
  //     .catch(() => {
  //       setApiStatus('error');
  //     });


  // }, []);

  useEffect(() => {
    const getUrl = () => {
      return gender ? `${BassURl}/product-by-tag/${url}/${gender}` : `${BassURl}/product-by-tag/${url}`;
    };

    const fetchData = async () => {
      try {
        const url = getUrl();
        const response = await axios.get(url);

        if (response.data.code === 200) {
          setShopByRecent(response.data.data);
          settagDetail(response.data.tag);
          setApiStatus('success');
        } else {
          setApiStatus('error');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiStatus('error');
      }
    };

    fetchData();
  }, [url, gender]); // Dependency array for useEffect
  //console.log(shopByRecent);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoryName]);
    } else {
      setSelectedCategories(selectedCategories.filter(category => category !== categoryName));
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(prevColor => prevColor === color ? '' : color);
  };

  const filteredProducts = shopByRecent.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category_title_eng);
    const colorMatch = selectedColor === '' || product.color_name === selectedColor;
    const searchTermMatch = searchTerm === '' || 
      product.product_title_eng.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.category_title_eng.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.color_name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && colorMatch && searchTermMatch;
  });

  const style = {    
    backgroundImage : `url("${imageURl}/${tagDetail?.tag_image}")`,
    backgroundColor : '#00000082',
    backgroundBlendMode : 'overlay'

  }
 
  return (
    <>
      <Navbar />
      <section className="breadcrumb__section breadcrumb__bg" style={style}>
        <div className="container">
          <div className="row row-cols-1">
            <div className="col">
              <div className="breadcrumb__content text-center">
                <h1 className="breadcrumb__content--title text-white mb-25">
                  {tagDetail?.tag_eng}
                </h1>
                <ul className="breadcrumb__content--menu d-flex justify-content-center">
                  <li className="breadcrumb__content--menu__items">
                    <a className="text-white" href="/">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb__content--menu__items">
                    <span className="text-white">{tagDetail?.tag_eng} Products</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop__section section--padding">
        <div className="container">
            <div className="shop__header bg__gray--color d-flex align-items-center justify-content-between mb-30">
                <button
                  className="widget__filter--btn d-flex d-lg-none align-items-center"
                  data-offcanvas=""
                  onClick={toggleFilter}
                >
                  <svg
                    className="widget__filter--btn__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={28}
                      d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"
                    />
                    <circle
                      cx={336}
                      cy={128}
                      r={28}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={28}
                    />
                    <circle
                      cx={176}
                      cy={256}
                      r={28}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={28}
                    />
                    <circle
                      cx={336}
                      cy={384}
                      r={28}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={28}
                    />
                  </svg>
                  <span className="widget__filter--btn__text">Filter</span>
                </button>
                <div className="product__view--mode d-flex align-items-center">
                  <div className="product__view--mode__list product__short--by align-items-center d-none d-lg-flex">
                    {/* <label className="product__view--label">Prev Page :</label> */}
                  </div>
                </div>
            </div>

            {isFilterOpen && (
              <>
              <div className="filterby-tags mb-5">
                <div className="product__view--mode__list product__view--search">
                  <form className="product__view--search__form" action="#">
                    <label>
                      <input
                        className="product__view--search__input border-0"
                        placeholder="Search by"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ border: " 2px solid #000 !important" }}
                      />
                    </label>
                    <button
                      className="product__view--search__btn"
                      aria-label="shop button"
                      type="submit"
                    >
                      <svg
                        className="product__view--search__btn--svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22.51"
                        height="20.443"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit={10}
                          strokeWidth={32}
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit={10}
                          strokeWidth={32}
                          d="M338.29 338.29L448 448"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
                <div className="single__widget widget__bg">
                  <h4 className="widget__title mt-4">Shop By Category</h4>
                  <ul className="widget__form--check">
                    {Category && Category.map((item, key) => (
                        <li key={key} className="mb-3">
                          <label>
                            <input
                              type="checkbox"
                              value={item.category_title_eng}
                              onChange={handleCategoryChange}
                              checked={selectedCategories.includes(item.category_title_eng)}
                            />
                            &nbsp; {item.category_title_eng}
                          </label>
                        </li>
                      ))}
                  
                  </ul>
                  <h4 className="widget__title mt-4">Shop By Color</h4>
                  <ul className="widget__form--check">{ShopByColor &&
                    ShopByColor?.map((data, key) => {
                      const hasProductWithColor = shopByRecent.some(shopByRecent => shopByRecent.color_name === data.color_name);
                      if (hasProductWithColor) {
                      return(
                        <>
                        <li className={`widget__form--check__list color-style ${selectedColor === data.color_name ? 'active' : ''}`} 
                        key={key} 
                        onClick={() => handleColorChange(data.color_name)}>
                  
                          <label className="widget__form--check__label">
                            {data?.color_name}
                            <div className="headercolor" style={{backgroundColor: `${data?.color_code}`,border: '1px solid #efefef',}}></div>
                          </label>
                        
                        </li>
                        </>
                      )
                    }
                    })}
                  </ul>
                </div>
              </div>
              </>
            )}
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="shop__sidebar--widget widget__area d-none d-lg-block filterby-tags">
                <div className="product__view--mode__list product__view--search d-none d-lg-block m-0">
                  <form className="product__view--search__form" action="#">
                    <label>
                      <input
                        className="product__view--search__input border-0"
                        placeholder="Search by"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ border: " 2px solid #000 !important" }}
                      />
                    </label>
                    <button
                      className="product__view--search__btn"
                      aria-label="shop button"
                      type="submit"
                    >
                      <svg
                        className="product__view--search__btn--svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22.51"
                        height="20.443"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit={10}
                          strokeWidth={32}
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit={10}
                          strokeWidth={32}
                          d="M338.29 338.29L448 448"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
                <div className="single__widget widget__bg">
                  <h4 className="widget__title mt-4">Shop By Category</h4>
                  <ul className="widget__form--check">
                    {Category && Category.map((item, key) => (
                        <li key={key} className="mb-3">
                          <label>
                            <input
                              type="checkbox"
                              value={item.category_title_eng}
                              onChange={handleCategoryChange}
                              checked={selectedCategories.includes(item.category_title_eng)}
                            />
                            &nbsp; {item.category_title_eng}
                          </label>
                        </li>
                      ))}
                  
                  </ul>
                  <h4 className="widget__title mt-4">Shop By Color</h4>
                  <ul className="widget__form--check">

                  {ShopByColor &&
                    ShopByColor?.map((data, key) => {
                      const hasProductWithColor = shopByRecent.some(shopByRecent => shopByRecent.color_name === data.color_name);
                      if (hasProductWithColor) {
                      return(
                        <>
                        <li className={`widget__form--check__list color-style ${selectedColor === data.color_name ? 'active' : ''}`} 
                        key={key} 
                        onClick={() => handleColorChange(data.color_name)}>
                  
                          <label className="widget__form--check__label">
                            {data?.color_name}
                            <div className="headercolor" style={{backgroundColor: `${data?.color_code}`,border: '1px solid #efefef',}}></div>
                          </label>
                        
                        </li>
                        </>
                      )
                    }
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="shop__product--wrapper">
                <div className="tab_content">
                  <div id="product_grid" className="tab_pane active show">
                    <div className="product__section--inner product__grid--inner">
                      <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-2 mb--n30">
                        {filteredProducts.length > 0 ? (
                          <>
                            {filteredProducts.map((data) => (
                              <div className="col mb-30">
                                <div className="product__items new-product" >
                                  <div className="product__items--thumbnail">
                                    <a
                                      className="product__items--link"
                                      href={`/product-details/${data?.product_url}?color=${data?.color_url}`}
                                    >
                                      <img
                                        className="product__items--img product__primary--img"
                                        src={`${imageURl}/${data?.image}`}
                                        alt="product-img"
                                      />
                                      
                                    </a>
                                    <Link
                                      className="product__add-to__cart--btn__style2"
                                      to={`/product-details/${data?.product_url}?color=${data?.color_url}`}>
                                    {/* <span className="product__items--content__subtitle" style={{ fontWeight: 900 }}>
                                      {data?.category_title_eng}
                                    </span> /  */}
                                    <span className="product__items--content__subtitle">
                                      {data?.sub_category_title}
                                    </span> <br />
                                      <span className="add__to--cart__text">{data?.product_title_eng} - {data?.color_name}</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-12 col-md-12 text-center mt-5">
                                  <img
                                    src="/assets/img/dataImage/nodata.webp"
                                    alt=""
                                    srcset=""
                                  />
                                  <h2>No Data Found</h2>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ShopByRecent;
