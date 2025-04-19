import { Checkbox, Col, Flex, Row } from "antd"
import { GREEN5, PRIMARY_BLUE } from "../../config/colors"
import { TextField } from "@mui/material"
import { useState } from "react"

const SettingsWorkingHoursLine = ({day, open_at, close_at, active = false}) => {
    const [checked, setChecked] = useState(active)
    const [openTime, setOpenTime] = useState(open_at)
    const [closeTime, setCloseTime] = useState(close_at)

    return (
        <Row gutter={10} style={{ alignItems: 'center', margin: '0.75rem 0' }}>
            <Col span={6}>
                {day}
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
                <Checkbox onChange={() => setChecked(!checked)} checked={checked} />
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
                <TextField size="small" disabled={!checked} onChange={(e) => setOpenTime(e.target.value)} value={checked ? openTime : '---'} />
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
                <TextField size="small" disabled={!checked} onChange={(e) => setCloseTime(e.target.value)} value={checked ? closeTime : '---'} />
            </Col>
        </Row>
    )
}

export default SettingsWorkingHoursLine