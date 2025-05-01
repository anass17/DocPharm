import React, { useState } from 'react';
import { Button, Col, Collapse, Flex, Input, Row, Select, theme, Typography } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Box, Container, InputLabel, Typography as TP } from '@mui/material';
import { GRAY3, GREEN } from '../../config/colors';
import Title from 'antd/es/typography/Title';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import AdminNavbar from '../../components/Navbar/AdminNavbar';
import PharmacyNavbar from '../../components/Navbar/PharmacyNavbar';
import DoctorNavbar from '../../components/Navbar/DoctorNavbar';
import UserNavbar from '../../components/Navbar/UserNavbar';

const ContactPage = () => {

    const user = useSelector(data => data.user.user)

  return (

    <>
        {
            user?.role === 'admin' ? (
                <AdminNavbar />
            ) : (
                user?.role === 'pharmacy' ? (
                    <PharmacyNavbar />
                ) : (
                    user?.role === 'doctor' ? (
                        <DoctorNavbar />
                    ) : (
                        user?.role === 'client' ? (
                            <UserNavbar />
                        ) : (
                            <Navbar />
                        )
                    )
                )
            )
        }

        <Container maxWidth="lg" style={{ overflow: 'hidden' }}>
            <Box>
                <Row gutter={[50, 40]} style={{ padding: '2rem 0', alignItems: 'center' }}>
                    <Col xs={24} lg={12}>
                        <Title level={1} style={{ marginBottom: 30 }}>Contact Us</Title>
                        <TP style={{ marginBottom: 40 }} fontSize={18}>We're happy to assist! If you have any questions, concerns, or feedback, please don't hesitate to reach out to us.</TP>
                        <Box>
                            <Flex align='center' gap={16} style={{ marginBottom: 5 }}>
                                <FaPhoneAlt size={16} fill={GREEN} />
                                <TP>+212 612345678</TP>
                            </Flex>
                            <Flex align='center' gap={16}>
                                <FaEnvelope size={16} fill={GREEN} />
                                <TP>contact@docpharm.ma</TP>
                            </Flex>
                        </Box>
                    </Col>
                    <Col xs={24} lg={12}>
                        <form className='bg-white shadow rounded-md border border-gray-200' style={{ padding: '1.75rem 1.75rem' }}>
                            <Title level={2} style={{ marginBottom: 10, textAlign: 'center', marginBottom: 30 }}>Send Inquiry</Title>
                            <Row gutter={[6, 20]} style={{ marginBottom: 15 }}>
                                <Col span={12}>
                                    <InputLabel>Name</InputLabel>
                                    <Input placeholder='Your Name' size='large' />
                                </Col>
                                <Col span={12}>
                                    <InputLabel>Inquiry Type</InputLabel>
                                    <Select options={[{label: 'issue', value: 'Issue'}]} defaultValue={'issue'} style={{ width: '100%' }} size='large' />
                                </Col>
                            </Row>
                            <Box style={{ marginBottom: 15 }}>
                                <InputLabel>Email Address</InputLabel>
                                <Input placeholder='Your Email Address ' size='large' />
                            </Box>
                            <Box style={{ marginBottom: 15 }}>
                                <InputLabel>Subject</InputLabel>
                                <Input placeholder='Enter a subject' size='large' />
                            </Box>
                            <Box style={{ marginBottom: 15 }}>
                                <InputLabel>Message</InputLabel>
                                <TextArea placeholder="Enter a message" rows={4} size='large' style={{ resize: 'none' }} />
                            </Box>
                            <Button style={{ padding: '0 1.75rem', height: 35, display: 'block', backgroundColor: GREEN, color: '#FFF' }}>Send</Button>
                        </form>
                    </Col>
                </Row>
            </Box>
        </Container>

        <Footer />
    </>
  );

};
export default ContactPage;