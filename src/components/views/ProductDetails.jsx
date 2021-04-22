import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Button, Badge } from 'reactstrap';
import { config } from '../../config';
import { UserContext } from '../../Context';
import loadingImage from '../../rolling.svg';
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const ProductDetails = (props) => {
  const userContext = useContext(UserContext);

  const { productId } = useParams();

  const [product, setProduct] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [addToCartError, setAddToCartError] = useState('');

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        config.BASE_URL + '/api/products/' + productId
      );
      setProduct(response.data);
      setLoaded(true);
    })();
  }, [productId]);

  const addToCart = async () => {
    if (userContext.user().username) {
      await axios.get(
        `${config.BASE_URL}/api/cart/add/${userContext.user().id}/${productId}`
      );
      props.history.push('/allproducts');
    } else {
      setAddToCartError(
        'You must be logged in to add to cart. Please register for a new account or log in.'
      );
    }
  };

  return (
    <Col>
      <Row>
        {!loaded && (
          <img
            className="loading-image mt-5"
            src={loadingImage}
            alt="Loading spinner"
          />
        )}
      </Row>
      {loaded && (
        <React.Fragment>
          <Row className="mb-3">
            <Col>
              <img
                alt={product.name}
                src={product.img_url}
                className="image-details"
              />
              <h1>{product.name}</h1>
              {product.tags.map((t) => (
                <Badge
                  style={{ backgroundColor: '#FF97B2' }}
                  key={t.id}
                  className="mr-1"
                >
                  {t.tag_name}
                </Badge>
              ))}
              <h2 className="mt-0 mb-3" style={{ color: '#E1084F' }}>
                ${product.cost}
              </h2>
              <Button
                style={{
                  borderColor: '#cff1fb',
                  backgroundColor: '#cff1fb',
                  color: '#000000',
                  fontWeight: 'bold',
                }}
                className="btn-sm mr-2"
              >
                {product.category.category_name}
              </Button>
              <TwitterShareButton
                url={window.location.href}
                title={product.name}
                className="mr-1"
              >
                <TwitterIcon size={28} round />
              </TwitterShareButton>
              <FacebookShareButton
                url={window.location.href}
                title={product.name}
                className="mr-1"
              >
                <FacebookIcon size={28} round />
              </FacebookShareButton>
              <WhatsappShareButton
                url={window.location.href}
                title={product.name}
                className="mr-1"
              >
                <WhatsappIcon size={28} round />
              </WhatsappShareButton>
              <Button
                style={{
                  borderRadius: '20px',
                  borderColor: '#E1084F',
                  backgroundColor: '#E1084F',
                  fontWeight: 'bold',
                }}
                className="btn-sm"
                onClick={addToCart}
              >
                <i className="fas fa-cart-plus"></i> Add To Cart
              </Button>
            </Col>
          </Row>
          {addToCartError && (
            <div className="alert-sm alert-warning p-2">{addToCartError}</div>
          )}
          <Row className="d-block p-3 mx-0 mb-2 bg-white">
            <p className="product-details-quick-info">
              <i className="far fa-building"></i> Company: {product.company}
            </p>
            <p className="product-details-quick-info">
              <i className="fas fa-shipping-fast"></i> Ships from:{' '}
              {product.local === '1' ? 'Local' : 'Overseas'}
            </p>
            <p className="product-details-quick-info">
              {product.organic_natural === '1' ? (
                <Badge>
                  <i className="fas fa-seedling"></i> Organic/natural material
                </Badge>
              ) : (
                ''
              )}
            </p>
            <p className="product-details-quick-info">
              {product.free_delivery === '1' ? (
                <Badge>
                  <i className="far fa-star"></i> Free Delivery
                </Badge>
              ) : (
                ''
              )}
            </p>
          </Row>
          <Row className="p-3 mx-0 mb-2 bg-white d-block">
            <h5>Description</h5>
            <p className="mb-0">{product.description}</p>
          </Row>
          <Row className="p-3 mx-0 mb-2 bg-white d-block">
            <h5>Specifications</h5>
            <p className="mb-0">{product.specs}</p>
          </Row>
          <Row className="p-3 mx-0 mb-2 bg-white d-block">
            <h5>Quantity Left</h5>
            <p className="mb-0">{product.stock}</p>
          </Row>
        </React.Fragment>
      )}
    </Col>
  );
};

export default ProductDetails;
