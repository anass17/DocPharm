import { TextField } from '@mui/material';
import { red } from '@mui/material/colors';
import { Row, Col, Flex, Button } from 'antd';
import { useEffect, useState } from 'react';

const CartMedicineItem = ({medicine, index, updateItemTotal}) => {
    const [quantity, setQuantity] = useState(medicine?.pivot?.order_quantity);
    
    const unitPrice = medicine?.pivot?.unit_price;

    useEffect(() => {
        updateItemTotal(index, quantity * unitPrice);
    }, [quantity]);

    return (
        <Row style={{alignItems: 'center', marginBottom: 20}}>
            <Col span={12}>
                <Flex gap={20} align='center'>
                    <div style={{ width: 100, height: 80, borderRadius: 5, backgroundImage: 'url("http://localhost:8000/storage/medicines/fake_image.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    </div>
                    <div>
                        <h3 style={{marginBottom: 7}}>{medicine?.medicine?.medicine_name}</h3>
                        <button type='button' style={{color: red[500], fontWeight: 600}}>Remove</button>
                    </div>
                </Flex>
            </Col>
            <Col span={6} style={{ display: 'flex', gap: 2, textAlign: 'center', justifyContent: 'center' }}>
                <Button style={{border: 'none', fontSize: 20, width: 40}} onClick={() => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)}>-</Button>
                <TextField value={quantity} size={'small'} sx={{ width: 50 }} />
                <Button style={{border: 'none', fontSize: 20, width: 40}} onClick={() => setQuantity(quantity + 1)}>+</Button>
            </Col>
            <Col span={3} style={{textAlign: 'center', fontSize: 16, fontWeight: 500}}>{unitPrice} DH</Col>
            <Col span={3} style={{textAlign: 'center', fontSize: 16, fontWeight: 500}}>{quantity * unitPrice} DH</Col>
        </Row>
    )
}

export default CartMedicineItem;