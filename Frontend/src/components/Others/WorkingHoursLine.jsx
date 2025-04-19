import { Flex } from "antd"
import { GRAY3, GREEN5, LIGHT_BLUE, PRIMARY_BLUE } from "../../config/colors"
import { useMemo } from "react"

const WorkingHoursLine = ({day, data}) => {

    const currentDay = useMemo(() => {
        let date = new Date()
        return date.toLocaleDateString('en-En', {weekday: 'long'}).toLowerCase() === day
    })

    return (
        
        <Flex justify="space-between" style={{padding: '1rem 1rem', fontWeight: 500, borderRadius: 5, color: currentDay ? PRIMARY_BLUE : GRAY3, backgroundColor: currentDay ? LIGHT_BLUE : ''}} className="hover:bg-gray-100 transition">
            <span className="capitalize">{day}</span>
            <span>{data[day].active ? (`${data[day].open} - ${data[day].close}`) : ''}</span>
        </Flex>
        
        
    )
}

export default WorkingHoursLine