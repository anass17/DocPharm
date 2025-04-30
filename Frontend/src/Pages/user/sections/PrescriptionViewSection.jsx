import { Box, Button, Typography as TP } from "@mui/material";
import { Col, Divider, Flex, Image, notification, Row, Tag } from "antd";
import { FaCalendarCheck, FaDownload, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPen, FaPhoneAlt, FaStethoscope, FaTwitter } from "react-icons/fa";
import { GRAY2, GRAY3, GREEN, PRIMARY_BLUE, PRIMARY_GREEN } from "../../../config/colors";
import { useSelector } from "react-redux";
import dayjs from 'dayjs'
import html2pdf from 'html2pdf.js';
import { backend_url } from "../../../config/app";
import { Link, useParams } from "react-router-dom";
import { Padding } from "@mui/icons-material";
import Title from "antd/es/typography/Title";
import { useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';

const PrescriptionViewSection = () => {

    const {id: param_id} = useParams()
    const [loading, setLoading] = useState(true)
    const [prescription, setPrescription] = useState(null)
    const [api, NotificationHolder] = notification.useNotification();
    const element = useRef(null)

    const openNotification = (message, description, type = 'info') => {
        api.open({
            type: type,
            message: message,
            description: <p>{description}</p>,
            placement: 'bottomRight',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const handleDownload = () => {
        alert()
        html2pdf().from(element.current).set({
            margin: 0.5,
            filename: `prescription_${prescription.id}_${dayjs()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
          }).save();
    }

    const getPrescription = async () => {
        setLoading(true);
        
        try {
            const response = await fetch(`${backend_url}/api/prescriptions/${param_id}`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                openNotification('Access Denied','You are not authorized to view this data', 'error');
            } else if (response.status === 404) {
                openNotification('Not Found','This prescription was not found', 'error');
            } else if (response.status === 200) {
                setPrescription(responseData.prescription);
            } else {
                openNotification('Something went wrong!','Could not load this data', 'error');
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong!','Could not load this data', 'error');
        }
    }

    useEffect(() => {
        getPrescription()
    }, [])

    if (!prescription) {
        return;
    }

    return (
        <>
            {NotificationHolder}
            <Box className="bg-white rounded-md shadow" style={{ padding: '2rem 2.5rem' }}>
                <Box ref={element} className="relative">
                    <Title level={3} style={{ textAlign: 'center', marginBottom: 30 }}>Medical Prescription</Title>
                    <Title level={5}>Provided By</Title>
                    <Row gutter={[30, 20]}>
                        <Col span={12}>
                            <Title level={4} style={{ color: PRIMARY_BLUE, marginBottom: 3 }}>Dr. {prescription.appointment.doctor.first_name} {prescription.appointment.doctor.last_name}</Title>
                            <Flex gap={15} align="center">
                                {/* <FaStethoscope /> */}
                                <TP>{prescription.appointment.doctor.speciality}</TP>
                            </Flex>
                        </Col>
                        <Col span={12}>
                            <Box>
                                <Flex gap={15} style={{ marginBottom: 4 }}>
                                    {/* <FaPhoneAlt style={{ position: 'relative', top: 4 }} fill={PRIMARY_GREEN} /> */}
                                    <TP>{prescription.appointment.doctor.phone_number}</TP>
                                </Flex>
                            </Box>
                            <Box>
                                <Flex gap={15} style={{ marginBottom: 4 }}>
                                    {/* <FaEnvelope style={{ position: 'relative', top: 4 }} fill={PRIMARY_GREEN} /> */}
                                    <TP>{prescription.appointment.doctor.email}</TP>
                                </Flex>
                            </Box>
                            <Box>
                                <Flex gap={15} style={{ marginBottom: 4 }}>
                                    {/* <FaMapMarkerAlt style={{ position: 'relative', top: 4 }} fill={PRIMARY_GREEN} /> */}
                                    <TP>{prescription.appointment.doctor.address}, {prescription.appointment.doctor.city}</TP>
                                </Flex>
                            </Box>
                        </Col>
                    </Row>
                    
                    <Divider />

                    <Title level={5}>Patient</Title>
                    <Row style={{ marginBottom: 50 }} gutter={[30, 20]}>
                        <Col span={12}>
                            <Title level={4} style={{ color: PRIMARY_BLUE, marginBottom: 3 }}>{prescription.appointment.client.first_name} {prescription.appointment.client.last_name}</Title>
                            <Flex gap={15} align="center">
                                {/* <FaEnvelope /> */}
                                <TP>{prescription.appointment.client.email}</TP>
                            </Flex>
                        </Col>
                        <Col span={12}>
                            <Box>
                                <Flex gap={15} style={{ marginBottom: 4 }}>
                                    {/* <FaCalendarCheck style={{ position: 'relative', top: 4 }} size={15} /> */}
                                    <TP>{dayjs(prescription.created_at).format('MMMM DD, YYYY')}</TP>
                                </Flex>
                            </Box>
                            <Box>
                                <TP className="capitalize font-semibold">{prescription.appointment.appointment_type.replace('_', '-')} Appointment</TP>
                            </Box>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 30 }} gutter={[30, 20]}>
                        <Col span={12}>
                            <Title level={4}>Notes</Title>
                            <TP>{prescription.prescription_note}</TP>
                        </Col>
                        <Col span={12}>
                            <Title level={4}>Medicines</Title>
                            {
                                prescription.medicines == 0 ? (
                                    <TP style={{ textAlign: 'center' }}>No medicines were assigned</TP>
                                ) : (
                                    prescription.medicines.map((item, index) => {
                                        return (
                                            <Link to={'/medicines/' + item.id} key={"medicine-" + index}>
                                                <Flex justify="space-between">
                                                    <Title level={5} style={{ color: PRIMARY_GREEN }}>{item.medicine_name}</Title>
                                                    <TP fontSize={14}>x 1</TP>
                                                </Flex>
                                            </Link>
                                        )
                                    })
                                )
                            }
                        </Col>
                    </Row>
                    <img className="absolute -top-0 left-0 h-[40px]" src="/public/images/logo/logo.png"/>
                </Box>

                <Flex justify="center">
                    <Button style={{ backgroundColor: GRAY2, color: '#FFF', display: 'flex', alignContent: 'center', gap: 15, padding: '0.5rem 1.5rem' }} onClick={handleDownload}>
                        <FaDownload />
                        Download
                    </Button>
                </Flex>
            </Box>
        </>
    )
}

export default PrescriptionViewSection;