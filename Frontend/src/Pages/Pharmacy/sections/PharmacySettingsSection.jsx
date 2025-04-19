import { Box, Button } from "@mui/material";
import { Col, Row, Typography } from "antd";
import { FaClock, FaInfoCircle, FaLock, FaSave } from "react-icons/fa";
import { GRAY2, GRAY3, GREEN, GREEN2, PRIMARY_GREEN } from "../../../config/colors";
import SettingsWorkingHoursLine from "../../../components/Others/SettingsWorkingHoursLine";
import { DarkGreenButton } from "../../../components/Button/FilledButtons";
import SettingsPasswordChange from "../components/SettingsPasswordChange";
import SettingsGeneralInfoChange from "../components/SettingsGeneralInfoChange";

const PharmacySettingsSection = () => {

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
                        <Button variant="text" style={{ display: 'flex', gap: 15, color: GREEN, width: '100%', justifyContent: 'flex-start', p: 2 }}>
                            <FaClock />
                            <Typography.Text style={{ color: GRAY3 }} className="capitalize">Working Hours</Typography.Text>
                        </Button>
                    </Box>
                </Col>
                <Col xs={24} lg={16}>

                    {/* Security */}
                    
                    <SettingsPasswordChange />

                    {/* General Information */}

                    <SettingsGeneralInfoChange />

                    {/* Working Hours */}

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
                        <SettingsWorkingHoursLine day={'Monday'} active={true} open_at={"8:00"} close_at={'17:00'} />
                        <SettingsWorkingHoursLine day={'Tuesday'} active={true} open_at={"8:00"} close_at={'17:00'} />
                        <SettingsWorkingHoursLine day={'Wednesday'} active={true} open_at={"8:00"} close_at={'17:00'} />
                        <SettingsWorkingHoursLine day={'Thursday'} active={true} open_at={"8:00"} close_at={'17:00'} />
                        <SettingsWorkingHoursLine day={'Friday'} active={true} open_at={"8:00"} close_at={'17:00'} />
                        <SettingsWorkingHoursLine day={'Saturday'} active={false} open_at={"0:00"} close_at={'0:00'} />
                        <SettingsWorkingHoursLine day={'Sunday'} active={false} open_at={"0:00"} close_at={'0:00'} />
                        <DarkGreenButton style={{ marginTop: 20 }}>
                            <FaSave />
                            Save
                        </DarkGreenButton>
                    </Box>
                </Col>
            </Row>
        </>
    )
}

export default PharmacySettingsSection;