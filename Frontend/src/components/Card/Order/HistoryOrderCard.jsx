import React, { useState } from 'react';
import '../../../assets/style/OrderCard.css';
import { Button, Col, notification, Row } from 'antd';
import { Link } from 'react-router-dom';
import { Box, Button as Btn } from '@mui/material';
import { backend_url } from '../../../config/app';
import Cookies from 'js-cookie'

const HistoryOrderCard = ({ order }) => {

    const [api, NotificationHolder] = notification.useNotification();
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)

    const openNotification = (message, description) => {
        api.info({
            message: message,
            description: <p>{description}</p>,
            placement: 'bottomRight',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
        });
    };
    
    const {
        id,
        client: {address, city},
        medicines,
        delivery_method,
    } = order;

    //--- Handlers

    const handleReady = () => {
        setOrderAsReady()
    }

    //--- Fonctions

    const setOrderAsReady = async () => {
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/orders/${order.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({status: 'ready'})
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action');
            } else if (response.status === 200 || response.status === 204) {
                setReady(true)
                openNotification('Order Accepted', `The order [#${order.id}] status has been updated`)
            } else {
                openNotification('Something Went Wrong!', 'Could not perform this action');
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            openNotification('Something Went Wrong!', 'Could not perform this action');
        }
    }

    //--- Content

    return (
        <>
            {NotificationHolder}

            <div className="order-card">
                <div className='order-block'>
                    <div className="order-header">
                        {delivery_method === 'delivery' ? (
                            <div className="order-section">
                                <p style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} fill='#333' viewBox="0 0 384 512">
                                    {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                    {address}, {city}
                                </p>
                            </div>
                        ) : (
                            <span></span>
                        )}
                        <h2>#{id}</h2>
                    </div>


                    <div className="order-section">
                        <h4>Medicines</h4>
                        <div className="products-grid">
                            {medicines.map((product, index) => (
                                <div key={index} className="product-card">
                                    <Row>
                                        <Col span={15}>
                                            <Link to={`/medicines/${product.medicine.id}`} className="product-name">
                                                {product.medicine.medicine_name}
                                            </Link>
                                        </Col>
                                        <Col span={3}>
                                            <span>x {product.pivot.order_quantity}</span>
                                        </Col>
                                        <Col span={6} style={{ textAlign: 'right' }}>
                                            <span>{product.pivot.unit_price.toFixed(2)} DH</span>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='order-block'>
                    <div className="order-section fee">
                        <span>Delivery Fee:</span>
                        <span>{delivery_method == 'delivery' ? 10 : 0} DH</span>
                    </div>

                    <div className="order-total">
                        <h3>{medicines.reduce((total, current) => total + (current.pivot.order_quantity * current.pivot.unit_price), (delivery_method == 'delivery' ? 10 : 0)).toFixed(2)} DH</h3>
                    </div>

                    <div style={{ display: 'flex', paddingTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className={`delivery-method`}>
                            {delivery_method}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryOrderCard;