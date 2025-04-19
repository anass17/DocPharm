import { Box, TextField } from "@mui/material"
import { Col, Row, Typography } from "antd"
import { DarkGreenButton } from "../../../components/Button/FilledButtons"
import { FaKey } from "react-icons/fa"
import { useState } from "react"

const SettingsPasswordChange = () => {

    const [passwordData, setPasswordData] = useState({pass: '', confirmPass: ''})
    const [passwordError, setPasswordError] = useState({pass: '', confirmPass: ''})

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
        }
    }

    return (
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
            <DarkGreenButton onClick={handlePassSubmit}>
                <FaKey style={{ position: 'relative', bottom: 1 }} />
                Update Password
            </DarkGreenButton>
        </Box>
    )
}

export default SettingsPasswordChange