import { Flex } from "antd"
import { GREEN5, PRIMARY_BLUE } from "../../config/colors"

const WorkingHoursLine = ({day, open_at, close_at, active = false}) => {
    return (
        <Flex justify="space-between" style={{padding: '1rem 1rem', fontWeight: 500, borderRadius: 5, color: (active ? PRIMARY_BLUE : '')}}>
            <span>{day}</span>
            <span>{open_at} - {close_at}</span>
        </Flex>
    )
}

export default WorkingHoursLine