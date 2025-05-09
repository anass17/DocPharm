import { TextField } from '@mui/material';
import { red } from '@mui/material/colors';
import { Row, Col, Flex, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMedicineFromCart } from '../../store/actions/cartActions';
import { backend_url } from '../../config/app';
import Cookies from 'js-cookie'

const CartMedicineItem = ({medicine, index, updateItemTotal}) => {
    const [quantity, setQuantity] = useState(medicine?.pivot?.order_quantity);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
        
    const info = (message, type = 'success') => {
        messageApi.open({
            type: type,
            content: message,
            duration: 5
        });
    };

    const unitPrice = medicine?.pivot?.unit_price;

    const handleRemoveItem = () => {
        requestRemoveCartItem(medicine.id);
    }

    async function requestRemoveCartItem(id) {
        
        try {
            const response = await fetch(backend_url + '/api/cart/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                },
            });
    
            if (response.status === 422) {
                alert('Unauthorized')
            } else if (response.status === 204) {
                dispatch(deleteMedicineFromCart(id))
                info('Deleted from cart');
                
            } else {
                alert('Error')
            }

        } catch (error) {
            alert('Error')
        }
    }

    useEffect(() => {
        updateItemTotal(index, quantity * unitPrice);
    }, [quantity]);

    return (
        <>
            {contextHolder}
            <Row style={{alignItems: 'center', marginBottom: 20}}>
                <Col span={10}>
                    <Flex gap={20} align='center'>
                        <div style={{ width: 100, height: 80, borderRadius: 5, backgroundImage: `url("${backend_url}${medicine?.medicine?.medicine_image ? medicine.medicine.medicine_image : '/storage/placeholder.jpg'}")`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                        </div>
                        <div>
                            <h3 style={{marginBottom: 7}}>{medicine?.medicine?.medicine_name}</h3>
                            <button type='button' style={{color: red[500], fontWeight: 600}} onClick={handleRemoveItem}>Remove</button>
                        </div>
                    </Flex>
                </Col>
                <Col span={6} style={{ display: 'flex', gap: 2, textAlign: 'center', justifyContent: 'center' }}>
                    <Button style={{border: 'none', fontSize: 20, width: 40}} onClick={() => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)}>-</Button>
                    <TextField value={quantity} size={'small'} sx={{ width: 50 }} />
                    <Button style={{border: 'none', fontSize: 20, width: 40}} onClick={() => setQuantity(quantity + 1)}>+</Button>
                </Col>
                <Col span={4} style={{textAlign: 'center', fontSize: 16, fontWeight: 500}}>{unitPrice.toFixed(2)} DH</Col>
                <Col span={4} style={{textAlign: 'center', fontSize: 16, fontWeight: 500}}>{(quantity * unitPrice).toFixed(2)} DH</Col>
            </Row>
        </>
    )
}

export default CartMedicineItem;