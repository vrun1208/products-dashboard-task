import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const ProductForm = ({ isOpen, onSubmit, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
      if (isOpen) {
          isOpen();
      }
  };

  const handleCancel = () => {
    setFormData({});
      if (isOpen) {
          isOpen();
      }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Name" name="title" value={formData.title || ''} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Description" name="description" value={formData.description || ''} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Price" name="price" type="number" value={formData.price || ''} onChange={handleChange} required fullWidth margin="normal" />
      {/* Add more fields as needed */}
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 4, marginRight: 4 }}>
        Submit
      </Button>
      { isOpen && (
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 4 }} onClick={handleCancel}>
        Cancel
      </Button>
      )}
    </form>
    // <Dialog>
    //     <DialogContent>
    //     <TextField label="Name" name="title" value={formData.title || ''} onChange={handleChange} required fullWidth margin="normal" />
    //   <TextField label="Description" name="description" value={formData.description || ''} onChange={handleChange} required fullWidth margin="normal" />
    //   <TextField label="Price" name="price" type="number" value={formData.price || ''} onChange={handleChange} required fullWidth margin="normal" />
    //     </DialogContent>
    //       <DialogActions>
    //           <Button onClick={toggleAddBox} color="secondary">
    //               Cancel
    //           </Button>
    //           <Button onClick={handleAddProduct} color="primary">
    //               Add
    //           </Button>
    //       </DialogActions>
    // </Dialog>
  );
};

export default ProductForm;
