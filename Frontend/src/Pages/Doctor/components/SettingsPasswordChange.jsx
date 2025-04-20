import { Box, Button, TextField } from "@mui/material"
import { Col, notification, Row, Typography } from "antd"
import { DarkGreenButton } from "../../../components/Button/FilledButtons"
import { FaKey } from "react-icons/fa"
import { useEffect, useState } from "react"
import { backend_url } from "../../../config/app"
import Cookies from 'js-cookie'
import { GRAY4 } from "../../../config/colors"
import LoadingButton from "../../../components/Button/LoadingButton"

const SettingsPasswordChange = () => {

    const [passwordData, setPasswordData] = useState({pass: '', confirmPass: ''})
    const [passwordError, setPasswordError] = useState({pass: '', confirmPass: ''})
    const [loading, setLoading] = useState(false)
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

    const handlePassChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        })
    }

    const handlePassSubmit = () => {

        let hasErrors = false;

        if (passwordData.pass.length < 8) {
            setPasswordError({
                pass: 'Password must contain at least 8 characters',
                confirmPass: ''
            })
            hasErrors = true
        } else if (passwordData.confirmPass != passwordData.pass) {
            setPasswordError({
                pass: '',
                confirmPass: 'Passwords don\'t match'
            })
            hasErrors = true
        }

        if (!hasErrors) {
            setPasswordError({
                pass: '',
                confirmPass: ''
            })
            updateSecurity()
        }
    }

    // Send Api Requests

    const updateSecurity = async () => {
        setLoading(true);
        
        try {

            const formData = new FormData()

            formData.append('pass', passwordData.pass)

            const response = await fetch(`${backend_url}/api/doctor/update/security`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token'),
                },
                body: formData
            });
    
            if (response.status === 401) {
                openNotification('Access Denied', 'You are not authorized to perform this action')
            } else if (response.status === 200 || response.status === 204) {
                openNotification('Successfully Updated', 'Your password has been successfully updated', 'success')
            } else {
                openNotification('Something went wrong', 'Could not perform this action')
            }
        } catch (error) {
            openNotification('Something went wrong', 'Could not perform this action')
        } finally {
            setLoading(false)
            setPasswordData({pass: '', confirmPass: ''})
        }
    }

    return (
        <>
            {NotificationHolder}
            <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, mb: 5, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
                <Typography.Title level={4} style={{ marginBottom: 30 }}>Security</Typography.Title>
                <Row gutter={[10, 16]} style={{ marginBottom: 20 }}>
                    <Col xs={24} sm={12}>
                        <TextField type="password" label="New Password" error={!!passwordError.pass} helperText={passwordError.pass} value={passwordData.pass} onChange={handlePassChange} name="pass" fullWidth />
                    </Col>
                    <Col xs={24} sm={12}>
                        <TextField type="password" label="Confirm Password" error={!!passwordError.confirmPass} helperText={passwordError.confirmPass} value={passwordData.confirmPass} onChange={handlePassChange} name="confirmPass" fullWidth />
                    </Col>
                </Row>
                {
                    loading ? (
                        <LoadingButton>
                            <FaKey style={{ position: 'relative', bottom: 1 }} />
                            Update Password
                        </LoadingButton>
                    ) : (
                        <DarkGreenButton onClick={handlePassSubmit}>
                            <FaKey style={{ position: 'relative', bottom: 1 }} />
                            Update Password
                        </DarkGreenButton>
                    )
                }
            </Box>
        </>
        
    )
}

export default SettingsPasswordChange