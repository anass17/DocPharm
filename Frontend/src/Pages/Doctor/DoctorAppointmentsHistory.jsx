import AppointmentHistorySection from "./sections/AppointmentsHistorySection";
import DoctorSidebarLayout from "./layouts/DoctorSidebarLayout";

export default function DoctorAppointmentsHistory() {

    return (
        <>
            <DoctorSidebarLayout menuItem={'16'} title={'Appointments History'} description={"View your completed appointments"}>
                <AppointmentHistorySection />
            </DoctorSidebarLayout>
        </>
    )
}