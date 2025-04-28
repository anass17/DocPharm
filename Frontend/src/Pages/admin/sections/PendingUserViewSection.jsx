import { Box } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Button, Col, Flex, Image, message, notification, Row, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie'
import { FaCheck, FaFilePdf, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { GRAY3, PRIMARY_BLUE } from "../../../config/colors";

const items = [
    {
      key: '1',
      label: 'All',
    },
    {
      key: '3',
      label: 'Doctors',
    },
    {
      key: '4',
      label: 'Pharmacies',
    },
];

const PendingUsersViewSection = () => {

    const {id: param_id} = useParams()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [api, NotificationHolder] = notification.useNotification();

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

    const getUser = async () => {
            
        try {

            const response = await fetch(`${backend_url}/api/users/${param_id}`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                }
            });
    
            const responseData = await response.json();
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to view this data', 'error');
            } else if (response.status === 200) {
                setUser(responseData.user)
            } else {
                openNotification('Something went wrong!', 'Could not load this data', 'error');
            }
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong!', 'Could not load this data', 'error');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            {NotificationHolder}
            <Flex justify="space-between" style={{ padding: '1.5rem 2.5rem', marginBottom: '2rem' }} className="bg-yellow-200 rounded-md shadow-md items-center">
                <Typography className="font-semibold">Awaiting Verification</Typography>
                <Flex gap={5}>
                    <Button style={{ backgroundColor: red[500], border: 'none', color: '#FFF' }}>
                        <FaTimes />
                        Reject
                    </Button>
                    <Button style={{ backgroundColor: green[500], border: 'none', color: '#FFF' }}>
                        <FaCheck />
                        Approve
                    </Button>
                </Flex>
            </Flex>

            <Box className="bg-white rounded-md shadow" sx={{padding: '2rem', mb: 3}}>
                <Flex justify="space-between" align="center">
                    <Flex align="center" gap={20} style={{ marginBottom: 40, padding: '0 0.75rem' }}>
                        <img width={80} className='rounded-full' src={backend_url + (user?.profile_picture ? user?.profile_picture : '/storage/user_placeholder.jpg')} />
                        <Box>
                            <Typography.Title level={3} style={{ marginBottom: 1, color: PRIMARY_BLUE }}>{user?.first_name} {user?.last_name}</Typography.Title>
                            <Typography.Text style={{ color: GRAY3, fontSize: 14, fontWeight: 500}}>{user?.email}</Typography.Text>
                        </Box>
                    </Flex>
                    <Tag color="blue" style={{ padding: '0.5rem 1rem', fontSize: 14 }} className="capitalize">{user?.role}</Tag>
                </Flex>
                <Row gutter={[20, 20]}>
                    <Col span={12}>
                        <Box className="bg-gray-100 border border-gray-200 rounded" style={{ padding: '1rem 1.5rem' }}>
                            <Typography.Title level={5}>Phone Number</Typography.Title>
                            <p>{loading ? 'loading ...' : user?.phone_number}</p>
                        </Box>
                    </Col>
                    <Col span={12}>
                        <Box className="bg-gray-100 border border-gray-200 rounded" style={{ padding: '1rem 1.5rem' }}>
                            <Typography.Title level={5}>Medical License Number</Typography.Title>
                            <p>{loading ? 'loading ...' : user?.medical_license_number}</p>
                        </Box>
                    </Col>
                    {
                        user?.role == 'doctor' ? (
                            <Col span={12}>
                                <Box className="bg-gray-100 border border-gray-200 rounded" style={{ padding: '1rem 1.5rem' }}>
                                    <Typography.Title level={5}>Speciality</Typography.Title>
                                    <p>{loading ? 'loading ...' : user?.speciality}</p>
                                </Box>
                            </Col>
                        ) : (
                            <Col span={12}>
                                <Box className="bg-gray-100 border border-gray-200 rounded" style={{ padding: '1rem 1.5rem' }}>
                                    <Typography.Title level={5}>Pharmacy Name</Typography.Title>
                                    <p>{loading ? 'loading ...' : user?.pharmacy_name}</p>
                                </Box>
                            </Col>
                        )
                    }
                    <Col span={12}>
                        <Box className="bg-gray-100 border border-gray-200 rounded" style={{ padding: '1rem 1.5rem' }}>
                            <Typography.Title level={5}>Address</Typography.Title>
                            <p>{loading ? 'loading ...' : user?.address}, {user?.city}</p>
                        </Box>
                    </Col>
                </Row>
            </Box>

            <Box className="bg-white rounded-md shadow" sx={{padding: '2rem', mb: 3}}>
                <Typography.Title level={4} style={{ marginBottom: 16 }}>Building Image</Typography.Title>
                <Image
                    width={'100%'}
                    height={400}
                    className="object-cover rounded-md"
                    src={`${backend_url}${user?.building_image ? user.building_image : '/storage/horizontal_image_placeholder.png'}`}
                />
            </Box>

            <Box className="bg-white rounded-md shadow" style={{padding: '2rem'}}>
                <Typography.Title level={4} style={{ marginBottom: 16 }}>Verification Documents</Typography.Title>
                <Row gutter={[20, 20]} style={{ marginBottom: 20 }}>
                    <Col span={12}>
                        <Image
                            width={'100%'}
                            height={300}
                            className="object-cover rounded-md"
                            src={`${backend_url}${user?.building_image ? user.building_image : '/storage/horizontal_image_placeholder.png'}`}
                        />
                    </Col>
                    <Col span={12}>
                        <Image
                            width={'100%'}
                            height={300}
                            className="object-cover rounded-md"
                            src={`${backend_url}${user?.building_image ? user.building_image : '/storage/horizontal_image_placeholder.png'}`}
                        />
                    </Col>
                </Row>
                <Flex gap={15} align="center">
                    <FaFilePdf size={30} fill="#EF4444" />
                    <Box>
                        <Typography.Title level={5} style={{ marginBottom: 1 }}>prof_document.pdf</Typography.Title>
                        <Typography.Text>2.4 MB - Uploaded on Apr 15, 2025</Typography.Text>
                    </Box>
                </Flex>
            </Box>

        </>

    )
}

export default PendingUsersViewSection;