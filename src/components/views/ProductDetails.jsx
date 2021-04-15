import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Badge } from 'reactstrap';
import { config } from '../../config';
import loadingImage from '../../rolling.svg';

const ProductDetails = () => {
  const BASE_URL = config.BASE_URL;
  const productId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );
  const [product, setProduct] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get(BASE_URL + '/api/products/' + productId);
      await setProduct(response.data);
      await setLoaded(true);
      console.log(response.data);
    })();
  }, [BASE_URL, productId]);

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
              <Button className="btn-sm mr-2">
                {product.category.category_name}
              </Button>
              <Button className="btn-sm mr-2">
                <i className="fas fa-share-alt"></i>
              </Button>
              <Button className="btn-sm">Add To Cart</Button>
            </Col>
          </Row>
          <Row className="d-block p-3 mx-0 mb-2 bg-white">
            <p className="product-details-quick-info">
              <i class="far fa-building"></i> Company: {product.company}
            </p>
            <p className="product-details-quick-info">
              <i class="fas fa-shipping-fast"></i> Ships from:{' '}
              {product.local === '1' ? 'Local' : 'Overseas'}
            </p>
            <p className="product-details-quick-info">
              {product.organic_natural === '1' ? (
                <Badge>
                  <i class="fas fa-seedling"></i> Organic/natural material
                </Badge>
              ) : (
                ''
              )}
            </p>
            <p className="product-details-quick-info">
              {product.free_delivery === '1' ? (
                <Badge>
                  <i class="far fa-star"></i> Free Delivery
                </Badge>
              ) : (
                ''
              )}
            </p>
          </Row>
          <Row className="p-3 mx-0 mb-2 bg-white d-block">
            <h5>Description</h5>
            <p>{product.description}</p>
          </Row>
          <Row className="p-3 mx-0 mb-2 bg-white d-block">
            <h5>Dimensions</h5>
            <p>{product.size}</p>
          </Row>
          <Row className="p-3 mx-0 mb-2 bg-white d-block">
            <h5>Quantity Left</h5>
            <p>{product.stock}</p>
          </Row>
        </React.Fragment>
      )}
    </Col>
  );
};

export default ProductDetails;
