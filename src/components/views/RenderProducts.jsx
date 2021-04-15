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
      <div className="mb-1 d-flex">
        {allProducts.map((p) => (
          <Card key={p.id} className="mr-2 d-flex align-items-stretch">
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
                <CardText className="text-muted">{p.company}</CardText>
                <CardText className="text-right">${p.cost}</CardText>
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
