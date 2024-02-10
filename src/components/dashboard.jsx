import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress } from '@mui/material';
import React from 'react';
import '../styles/crudOps.css'
import { useData } from '../context/dataContext';

const DashBoard = ({ update, onDelete }) => {
    const { products, loading } = useData();


    if (loading) {
        <CircularProgress />
      }
    
      if (products.length === 0) {
        return <p>No Data Available</p>;
      }

    return(
        <div className='product-crud-container'>
        <TableContainer component={Paper} style={{ overflowY: 'auto'}}> 
            {loading ? (
                <CircularProgress />
            ) : (
                <Table sx={{ width: '90%', margin:'auto'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <Button variant='outlined' onClick={() => update(product)}>update</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant='outlined' onClick={() => onDelete(product.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
        </div>
    )
}

export default DashBoard;