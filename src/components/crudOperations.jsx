import React, { useState, useEffect } from 'react';
import { useData } from '../context/dataContext';
import '../styles/crudOps.css'
import axios from 'axios';
import DashBoard from './dashboard';
import ProductForm from './FormPage';
import { Button, Dialog, DialogTitle, DialogContent, CircularProgress } from "@mui/material";
import ProductCard from './productsCard';

const ProductCrud = () => {
  const { products, setProducts, loading, setLoading } = useData();
  const [editProduct, setEditProduct] = useState(null);
  const [filter, setFilter] = useState("asc");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [totalProducts, setTotalProducts] = useState(products.length);
  const [productsAdded, setProductsAdded] = useState(0);
  const [productsDeleted, setProductsDeleted] = useState(0);

  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {
    setTotalProducts(products.length);
  }, [products])

  //get data from the fakestoreAPI
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://fakestoreapi.com/products?sort=${filter}`);
      setProducts(response.data);
      //console.log(products);
      setTotalProducts(products.length);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  //handling Asc/desc function
  const handleToggleOrder = (e) => {
    setFilter(e.target.value);
  };

  //handles Add Product dialog Bob
  const handleAddDialogBox = () => {
    setEditProduct('');
    setDialogOpen(true);
  };

  //handles Edit Products dialog box
  const handleEditDialogBox = (product) => {
    setEditProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditProduct(null);
    setDialogOpen(false);
  };

  //function to add product details
  const handleAddProduct = async (newProduct) => {
      try {
          const response = await axios.post(`https://fakestoreapi.com/products`, newProduct)
          //console.log('Adding product:', newProduct);
          console.log(response.status);
          setProducts((prev) => [response.data, ...prev]);
          setProductsAdded(prev => prev +1);
      } catch (error) {
          console.error('Error adding product:', error.message);
      }
  };

//function for editing the existing product details
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${updatedProduct.id}`)
      //console.log('Updating product:', updatedProduct);
      console.log(response.status);
        setProducts((prev) =>
            prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
        );
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  //function to delte a product
  const handleDeleteProduct = async (productId) => {
      try {
          const response = await axios.delete(`https://fakestoreapi.com/products/${productId}`);
          //console.log('Deleting product:', productId);
          console.log(response.status);
          setProducts(products.filter((product) => product.id !== productId));
          setProductsDeleted(prev => prev+1);
      } catch (error) {
          console.error('Error deleting product:', error.message);
      }
  };

  if (loading) {
    <CircularProgress />;
  }

  return (
    <div className='product-crud-container'>
      <div className='card-container'>
        <ProductCard totalProducts={totalProducts} productsAdded={productsAdded} productsDeleted={productsDeleted} />
      </div>
      <div className='handlers-btn'>
        <select value={filter} onChange={handleToggleOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
        <Button sx={{marginLeft: 3}} variant='outlined' onClick={handleAddDialogBox}>Add new Product</Button>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
              <>
                  <DashBoard products={products} update={handleEditDialogBox} onDelete={handleDeleteProduct} />
                  <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                      <DialogTitle>{editProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
                      <DialogContent>
                          <ProductForm isOpen={() => handleCloseDialog()} onSubmit={editProduct ? handleUpdateProduct : handleAddProduct} initialValues={editProduct} />
                      </DialogContent>
                  </Dialog>
              </>
          )}
   {/* <ProductForm onSubmit={editProduct ? handleUpdateProduct : handleAddProduct} initialValues={editProduct} /> */}
      </div>
  );
};

export default ProductCrud;
