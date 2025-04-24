import { Checkbox, Col, Flex, Row } from "antd"
import { GREEN5, PRIMARY_BLUE } from "../../config/colors"
import { TextField } from "@mui/material"
import { useState } from "react"

const SettingsWorkingHoursLine = ({day, data, setData}) => {

    const checked = data[day]?.active;

    const handleStatusChange = (e) => {
        setData({
            ...data,
            [day]: {
                ...data[day],
                active: !data[day]?.active
            }
        })
    }

    const handleOpenChange = (e) => {
        setData({
            ...data,
            [day]: {
                ...data[day],
                open: e.target.value
            }
        })
    }

    const handleCloseChange = (e) => {
        setData({
            ...data,
            [day]: {
                ...data[day],
                close: e.target.value
            }
        })
    }

    return (
        <Row gutter={10} style={{ alignItems: 'center', margin: '0.75rem 0' }}>
            <Col span={6} className="capitalize">
                {day}
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
                <Checkbox onChange={handleStatusChange} checked={checked} />
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
                <TextField size="small" disabled={!checked} onChange={handleOpenChange} value={checked ? data[day]?.open : '---'} />
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
                <TextField size="small" disabled={!checked} onChange={handleCloseChange} value={checked ? data[day]?.close : '---'} />
            </Col>
        </Row>
    )
}

export default SettingsWorkingHoursLine