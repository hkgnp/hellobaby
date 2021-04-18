import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
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

  const productId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );
  const [product, setProduct] = useState('');
  const [loaded, setLoaded] = useState(false);

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
    await axios.get(
      `${config.BASE_URL}/api/cart/add/${userContext.user().id}/${productId}`
    );
    props.history.push('/allproducts');
  };

  return (
    <Col>
      <Row>
        {loaded === false && (
          <img
            className="loading-image mt-5"
            src={loadingImage}
            alt="Loading spinner"
          />
        )}
      </Row>
      {loaded === true && (
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
                <Badge style={{ backgroundColor: '#FF97B2' }} key={t.id}>
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
                <i class="fas fa-cart-plus"></i> Add To Cart
              </Button>
            </Col>
          </Row>
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
            <h5>Dimensions</h5>
            <p className="mb-0">{product.size}</p>
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
