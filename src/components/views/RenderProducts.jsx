import React, { useContext } from 'react';
import { ProductContext } from '../../Context';
import { Paginate, ManagePagination } from '../common/ManagePagination';
import Product from '../common/Product';

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
          <Product
            key={p.id}
            id={p.id}
            img_url={p.img_url}
            name={p.name}
            tags={p.tags}
            company={p.company}
            cost={p.cost}
            goToProduct={goToProduct}
          />
        ))}
      </div>
      <ManagePagination />
    </React.Fragment>
  );
};

export default RenderProducts;
