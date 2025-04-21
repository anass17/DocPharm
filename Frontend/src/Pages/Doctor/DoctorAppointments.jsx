import AppointmentHistorySection from "./sections/AppointmentsSection";
import DoctorSidebarLayout from "./layouts/DoctorSidebarLayout";

export default function DoctorAppointments() {

    return (
        <>
            <DoctorSidebarLayout menuItem={'15'} title={'Appointments'} description={"Manage your upcoming appointments"}>
                <AppointmentHistorySection />
            </DoctorSidebarLayout>
        </>
    )
}