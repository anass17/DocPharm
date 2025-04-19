import { Box } from "@mui/material"
import { Col, notification, Row, Typography } from "antd"
import SettingsWorkingHoursLine from "../../../components/Others/SettingsWorkingHoursLine"
import { DarkGreenButton } from "../../../components/Button/FilledButtons"
import { FaSave } from "react-icons/fa"
import { useState } from "react"
import LoadingButton from "../../../components/Button/LoadingButton"
import { backend_url } from "../../../config/app"
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux"
import { updateUserDetails } from "../../../store/actions/userActions"

const SettingsWorkingHoursChange = () => {

    const user = useSelector(data => data.user.user)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(user?.working_hours)
    const [api, NotificationHolder] = notification.useNotification();

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

    // Event Handlers

    const handleWorkingHoursSubmit = () => {
        updateWorkingHours()
    }

    // Send Api Requests
    
    const updateWorkingHours = async () => {
        setLoading(true);
        
        try {

            const response = await fetch(`${backend_url}/api/pharmacy/update/working_hours`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({hours: data})
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 200 || response.status === 204) {
                openNotification('Successfully Updated', 'Your working hours has been updated', 'success')
                dispatch(updateUserDetails({working_hours: data}))
            } else {
                openNotification('Something went wrong', 'Could not perform this action')
            }
        } catch (error) {
            console.log(error)
            openNotification('Something went wrong', 'Could not perform this action')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {NotificationHolder}
            <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
                <Typography.Title level={4} style={{ marginBottom: 30 }}>Working Hours</Typography.Title>
                <Row style={{ marginBottom: 25, fontSize: 18, fontWeight: 500 }}>
                    <Col span={6}>
                        Day
                    </Col>
                    <Col span={6} style={{ textAlign: 'center' }}>
                        Working
                    </Col>
                    <Col span={6} style={{ textAlign: 'center' }}>
                        Open At
                    </Col>
                    <Col span={6} style={{ textAlign: 'center' }}>
                        Closes At
                    </Col>
                </Row>

                <SettingsWorkingHoursLine day={'monday'} data={data} setData={setData} />
                <SettingsWorkingHoursLine day={'tuesday'} data={data} setData={setData} />
                <SettingsWorkingHoursLine day={'wednesday'} data={data} setData={setData} />
                <SettingsWorkingHoursLine day={'thursday'} data={data} setData={setData}  />
                <SettingsWorkingHoursLine day={'friday'} data={data} setData={setData}  />
                <SettingsWorkingHoursLine day={'saturday'} data={data} setData={setData} />
                <SettingsWorkingHoursLine day={'sunday'} data={data} setData={setData} />
                
                {
                    loading ? (
                        <LoadingButton>
                            <FaSave />
                            Save
                        </LoadingButton>
                    ) : (
                        <DarkGreenButton style={{ marginTop: 20 }} onClick={handleWorkingHoursSubmit}>
                            <FaSave />
                            Save
                        </DarkGreenButton>
                    )
                }
            </Box>
        </>
        
    )
}

export default SettingsWorkingHoursChange