import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { getAll } from "../../actions";
import { generatePictureUrl } from "../../urlConfig";
import formatThousand from "../../utils/formatThousand";
import { isNew } from "../../utils/isNew";
import "./style.css";
import { images } from "../../images/images";

function HomePage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [tabProducts, setTabProducts] = useState([]);
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  useEffect(() => {
    if (products) {
      const a = [...products]
        .sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt))
        .slice(0, 8);
      setTabProducts(a);
    }
  }, [products]);
  const renderTabItems = () => {
    const items = [
      {
        image: images.ic1.default,
        slug: "",
        color: "tab__item--black",
      },
      {
        image: images.ic2.default,
        slug: "",
        color: "tab__item--green",
      },
      {
        image: images.ic3.default,
        slug: "",
        color: "tab__item--yellow",
      },
      {
        image: images.ic4.default,
        slug: "",
        color: "tab__item--orange",
      },
      {
        image: images.ic5.default,
        slug: "",
        color: "tab__item--pink",
      },
      {
        image: images.ic6.default,
        slug: "",
        color: "tab__item--dark-blue",
      },
      {
        image: images.ic7.default,
        slug: "",
        color: "tab__item--blue",
      },
      {
        image: images.ic8.default,
        slug: "",
        color: "tab__item--purple",
      },
    ];
    return (
      <ul className="col lg-12 tab">
        {items.map((item, index) => (
          <li
            className={`tab__item flex-center ${item.color}`}
            key={index}
          >
            <img src={item.image} alt="" />
          </li>
        ))}
      </ul>
    );
  };
  console.log({products})
  return (
    <div className="grid wide">
      <div className="row mt-32">
        <div className="col lg-9">
          <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
            <div>
              <img
                alt=""
                src="https://res.cloudinary.com/ddeln1acg/image/upload/v1736588864/smart-phone-banner-design-template-caa98978d25e965873a22b01acb99ba7_screen_zfggrz.jpg"
              />
            </div>
          
          </Carousel>
        </div>
        <div className="col lg-3 advertisement">
          <div className="advertisement__wrapper">
            <div className="advertisement__effect"></div>
            <img
              className="advertisement__image"
              alt=""
              src="https://res.cloudinary.com/ddeln1acg/image/upload/v1736589100/39319_j7nvbf.jpg"
            />
          </div>
          <div className="advertisement__wrapper">
            <div className="advertisement__effect"></div>
            <img
              className="advertisement__image"
              alt=""
              src="https://res.cloudinary.com/ddeln1acg/image/upload/v1736591427/6322_vfzbf3.jpg"
            />
          </div>
        </div>
      </div>
      <div className="row mt-32 border-bottom">
        <div className="col lg-3">
          <div className="policy">
            <img
              src={images.ic10.default}
              alt=""
            />
            <p className="policy__content">Free delivery with $500</p>
          </div>
        </div>
        <div className="col lg-3">
          <div className="policy">
            <img
              src={images.ic11.default}
              alt=""
            />
            <p className="policy__content">100% Payment Secured</p>
          </div>
        </div>
        <div className="col lg-3">
          <div className="policy">
            <img
              src={images.ic12.default}
              alt=""
            />
            <p className="policy__content">24hours / 7days Support</p>
          </div>
        </div>
        <div className="col lg-3">
          <div className="policy">
            <img
              src={images.ic13.default}
              alt=""
            />
            <p className="policy__content">Best Price Guaranteed</p>
          </div>
        </div>
      </div>
      <div className="row mt-32">{renderTabItems()}</div>

      <div className="row mt-32">
        {tabProducts.length > 0 &&
          tabProducts.map((product, index) => (
            <div className="col lg-3 product__card" key={product._id}>
              <Link
                to={"/product/" + product._id}
                className="product__card-wrapper"
              >
                <div className="product__badge">
                  {Number(product.sale) > 5 && (
                    <span className="product__badge-item product__badge-item--sale">
                      SALE {product.sale}%
                    </span>
                  )}
                  {isNew(product.createdAt) && (
                    <span className="product__badge-item product__badge-item--new">
                      NEW
                    </span>
                  )}
                </div>
                <div className="product__image">
                  <img
                    src={generatePictureUrl(product.productPictures[0])}
                    alt=""
                  />
                </div>
                <div className="product__info">
                  <div className="product__info-name">{product.name}</div>
                  <div className="product__info-price">
                    <span className="product__info-price--current">
                      {formatThousand(product.price)}
                    </span>
                    <span className="product__info-price--old">
                      {formatThousand(product.regularPrice)}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className="row mt-32">
        <div className="col lg-4 advertisement">
          <div className="advertisement__wrapper">
            <div className="advertisement__effect"></div>
            <img
              src="https://res.cloudinary.com/ddeln1acg/image/upload/v1736591918/home3-banner3_or15sh_ia6ckg.jpg"
              alt=""
              className="advertisement__image"
            />
          </div>
          <div className="advertisement__wrapper">
            <div className="advertisement__effect"></div>
            <img
              src="https://res.cloudinary.com/ddeln1acg/image/upload/v1736591917/home3-banner4_uf0fux_onpxvx.jpg"
              alt=""
              className="advertisement__image"
            />
          </div>
        </div>
        <div className="col lg-8 advertisement">
          <div className="advertisement__wrapper">
            <div className="advertisement__effect"></div>
            <img
              src="https://res.cloudinary.com/ddeln1acg/image/upload/v1736591918/home3-banner5_ppjglk_kel5aa.jpg"
              alt=""
              className="advertisement__image"
            />
          </div>
        </div>
      </div>
      <div className="row mt-32">
        <div className="col lg-12">
          <p className="homepage-title">Onsale Products</p>
        </div>
        {products &&
          [...products].filter((product) => Number(product.sale) > 0)
            .sort((p1, p2) => Number(p2.sale) - Number(p1.sale))
            .slice(0, 8)
            .map((product, index) => (
              <div className="col lg-3" key={product._id}>
                <Link to={"/product/" + product._id} className="small-product">
                  <div className="small-product__image">
                    <img
                      src={generatePictureUrl(product.productPictures[0])}
                      alt=""
                    />
                  </div>
                  <div className="small-product__info">
                    <div className="small-product__info-name">
                      {product.name}
                    </div>
                    <div className="small-product__info-price">
                      <span className="small-product__info-price--current">
                        {formatThousand(product.price)}
                      </span>
                      <span className="small-product__info-price--old">
                        {formatThousand(product.regularPrice)}
                      </span>
                    </div>
                    <div className="product__badge">
                      {Number(product.sale) > 5 && (
                        <span className="product__badge-item product__badge-item--sale">
                          SALE {product.sale}%
                        </span>
                      )}
                      {isNew(product.createdAt) && (
                        <span className="product__badge-item product__badge-item--new">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>
      <div className="row mt-32">
        <div className="col lg-12">
          <p className="homepage-title">Affordable price products</p>
        </div>
        {products &&
          [...products]
          .filter((product) => Number(product.sale) > 30)
            .sort((p1, p2) => Number(p1.price) - Number(p2.price))
            .slice(0, 8)
            .map((product, index) => (
              <div className="col lg-3" key={product._id}>
                <Link to={"/product/" + product._id} className="small-product">
                  <div className="small-product__image">
                    <img
                      src={generatePictureUrl(product.productPictures[0])}
                      alt=""
                    />
                  </div>
                  <div className="small-product__info">
                    <div className="small-product__info-name">
                      {product.name}
                    </div>
                    <div className="small-product__info-price">
                      <span className="small-product__info-price--current">
                        {formatThousand(product.price)}
                      </span>
                      <span className="small-product__info-price--old">
                        {formatThousand(product.regularPrice)}
                      </span>
                    </div>
                    <div className="product__badge">
                      {Number(product.sale) > 5 && (
                        <span className="product__badge-item product__badge-item--sale">
                          SALE {product.sale}%
                        </span>
                      )}
                      {isNew(product.createdAt) && (
                        <span className="product__badge-item product__badge-item--new">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}

export default HomePage;
