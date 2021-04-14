import React, { useContext } from 'react';
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

const RenderProducts = () => {
  const context = useContext(ProductContext);

  // Render pages according to pagination settings
  const allProducts = Paginate(
    context.products(),
    context.currentPage(),
    context.pageSize()
  );

  const addToCart = (e) => {
    context.addToCart(e.target.name);
  };

  return (
    <React.Fragment>
      <div className="mb-3">
        {allProducts.map((p) => (
          <Card key={p.id}>
            <CardBody>
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
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button name={p.id} onClick={addToCart}>
                Add To Cart
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
