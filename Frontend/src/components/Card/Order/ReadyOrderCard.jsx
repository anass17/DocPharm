import React, { useState } from 'react';
import '../../../assets/style/OrderCard.css';
import { Button, Col, notification, Row } from 'antd';
import { Link } from 'react-router-dom';
import { Box, Button as Btn } from '@mui/material';
import { backend_url } from '../../../config/app';
import Cookies from 'js-cookie'

const AcceptedOrderCard = ({ handleClick, order }) => {
    
    const {
        id,
        client: {first_name, last_name},
        medicines,
    } = order;

    const handleDelivery = () => {
        handleClick(id);
    }

    //--- Content

    return (
        <>

            <div className="order-card">
                <div className='order-block'>
                    <div className="order-header">
                        <div className="order-section">
                            <p style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={12} fill='#333' viewBox="0 0 448 512">
                                    {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                                </svg>
                                {first_name} {last_name}
                            </p>
                        </div>
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

                    <div className="order-total">
                        <span>Total</span>
                        <h3>{medicines.reduce((total, current) => total + (current.pivot.order_quantity * current.pivot.unit_price), 0).toFixed(2)} DH</h3>
                    </div>

                    <div style={{ display: 'flex', paddingTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                        <span></span>
                        <div className="order-actions">
                            <button className="btn accept" onClick={handleDelivery}>
                                Confirm Delivery
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AcceptedOrderCard;