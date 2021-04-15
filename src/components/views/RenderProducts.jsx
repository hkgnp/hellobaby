import React, { useContext, useState, useEffect } from 'react';
import { config } from '../../config';
import { ProductContext } from '../../Context';
import { Paginate, ManagePagination } from '../common/ManagePagination';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import axios from 'axios';

const RenderProducts = () => {
  const BASE_URL = config.BASE_URL;
  const context = useContext(ProductContext);

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      (async () => {
        const response = await axios.get(BASE_URL + '/api/users/profile', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
        setUsername(response.data.username);
        setUserId(response.data.id);
      })();
    }
  }, [BASE_URL]);

  // Render pages according to pagination settings
  const allProducts = Paginate(
    context.products(),
    context.currentPage(),
    context.pageSize()
  );

  const addToCart = (e) => {
    let productId = e.currentTarget.getAttribute('value');
    console.log(
      'ProductId is ' +
        productId +
        ' and User Details are ' +
        userId +
        '' +
        username
    );
    context.addToCart(productId, username, userId);
  };

  return (
    <React.Fragment>
      <div className="mb-3">
        {allProducts.map((p) => (
          <Card key={p.id}>
            <CardBody onClick={addToCart} value={p.id}>
              <CardImg
                top
                width="100%"
                src={`${p.img_url}`}
                alt="Card image cap"
              />
              <CardTitle tag="h5">{p.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {p.description}
              </CardSubtitle>
              <CardText name={p.id}>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button name={p.id} onClick={addToCart}>
                More
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
      <ManagePagination />
    </React.Fragment>
  );
};

export default RenderProducts;
