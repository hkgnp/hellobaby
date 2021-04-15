import React, { useContext } from 'react';
import { ProductContext } from '../../Context';
import { Paginate, ManagePagination } from '../common/ManagePagination';
import { Col, Card, CardImg, CardText, CardBody, Badge } from 'reactstrap';

const RenderProducts = () => {
  const context = useContext(ProductContext);

  // Render pages according to pagination settings
  const allProducts = Paginate(
    context.products(),
    context.currentPage(),
    context.pageSize()
  );

  const goToProduct = (e) => {
    let productId = e.currentTarget.getAttribute('value');
    context.goToProduct(productId);
  };

  return (
    <Col>
      <small className="text-muted">
        Showing {allProducts.length} products
      </small>
      <div className="product-container">
        {allProducts.map((p) => (
          <Card key={p.id} className="mb-2 d-flex">
            <CardBody className="mb-3" onClick={goToProduct} value={p.id}>
              <CardImg
                top
                height="70%"
                src={`${p.img_url}`}
                alt="Card image cap"
              />
              <CardText className="mt-2 mb-0">{p.name}</CardText>
              <CardText className="m-0 p-0">
                {p.tags.map((t) => (
                  <Badge key={t.id}>{t.tag_name}</Badge>
                ))}
              </CardText>
              <div className="d-flex justify-content-between">
                <CardText>
                  <small className="text-muted"> {p.company}</small>
                </CardText>
                <CardText className="text-right">${p.cost}</CardText>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <ManagePagination />
    </Col>
  );
};

export default RenderProducts;
