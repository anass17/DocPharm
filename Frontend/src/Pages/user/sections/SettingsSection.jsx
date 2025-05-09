import { Box, Button } from "@mui/material";
import { Col, Row, Typography } from "antd";
import { FaClock, FaInfoCircle, FaLock, FaSave } from "react-icons/fa";
import { GRAY2, GRAY3, GREEN, GREEN2, PRIMARY_GREEN } from "../../../config/colors";
import SettingsPasswordChange from "../components/SettingsPasswordChange";
import SettingsGeneralInfoChange from "../components/SettingsGeneralInfoChange";

const SettingsSection = () => {

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} lg={8} style={{ marginBottom: '2.5rem' }}>
                    <Box sx={{ bgcolor: '#FFF', borderRadius: 2, p: 2.5, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)' }}>
                        <Button variant="text" style={{ display: 'flex', gap: 15, color: GREEN, width: '100%', justifyContent: 'flex-start', p: 2 }}>
                            <FaLock />
                            <Typography.Text style={{ color: GRAY3 }} className="capitalize">Security</Typography.Text>
                        </Button>
                        <Button variant="text" style={{ display: 'flex', gap: 15, color: GREEN, width: '100%', justifyContent: 'flex-start', p: 2 }}>
                            <FaInfoCircle />
                            <Typography.Text style={{ color: GRAY3 }} className="capitalize">General Information</Typography.Text>
                        </Button>
                    </Box>
                </Col>
                <Col xs={24} lg={16}>

                    {/* Security */}
                    
                    <SettingsPasswordChange />

                    {/* General Information */}

                    <SettingsGeneralInfoChange />

                </Col>
            </Row>
        </>
    )
}

export default SettingsSection;