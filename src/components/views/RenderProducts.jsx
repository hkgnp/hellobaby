import React, { useContext } from 'react';
import { ProductContext } from '../../Context';
import { Paginate, ManagePagination } from '../common/ManagePagination';
import { Card, CardImg, CardText, CardBody, Badge } from 'reactstrap';

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
    <React.Fragment>
      <div className="product-container">
        {allProducts.map((p) => (
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
                  <Badge style={{ backgroundColor: '#FF97B2' }} key={t.id}>
                    {t.tag_name}
                  </Badge>
                ))}
              </CardText>
              <div className="d-flex justify-content-between">
                <CardText>
                  <small className="text-muted"> {p.company}</small>
                </CardText>
                <CardText className="text-right" style={{ color: '#E1084F' }}>
                  ${p.cost / 100}
                </CardText>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <ManagePagination />
    </React.Fragment>
  );
};

export default RenderProducts;
