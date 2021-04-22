import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../../config';
import { Card, CardImg, CardText, CardBody, Badge, Col } from 'reactstrap';

const SearchResults = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const searchParams = new URLSearchParams(props.location.search);
  const searchVal = searchParams.get('search');

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${config.BASE_URL}/api/products/search`,
        {
          params: {
            search: searchVal,
          },
        }
      );
      setSearchResults(response.data);
    })();
  }, [searchVal, setSearchResults]);

  const goToProduct = (e) => {
    let productId = e.currentTarget.getAttribute('value');
    props.history.push(`/product/${productId}`);
  };

  return (
    <Col>
      <React.Fragment>
        <div className="product-container">
          {searchResults.map((p) => (
            <Card
              key={p.id}
              onClick={goToProduct}
              value={p.id}
              className="mb-2 d-flex"
            >
              <CardImg
                top
                height="70%"
                src={`${p.img_url}`}
                alt={p.name}
                className="card-image-details"
              />
              <CardBody className="mb-0" onClick={goToProduct} value={p.id}>
                <CardText className="mt-2 mb-0">{p.name}</CardText>
                <CardText className="m-0 p-0">
                  {p.tags.map((t) => (
                    <Badge
                      style={{ backgroundColor: '#FF97B2' }}
                      key={t.id}
                      className="mr-1"
                    >
                      {t.tag_name}
                    </Badge>
                  ))}
                </CardText>
                <div className="d-flex justify-content-between">
                  <CardText>
                    <small className="text-muted"> {p.company}</small>
                  </CardText>
                  <CardText className="text-right" style={{ color: '#E1084F' }}>
                    ${(p.cost / 100).toFixed(2)}
                  </CardText>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </React.Fragment>
    </Col>
  );
};

export default SearchResults;
