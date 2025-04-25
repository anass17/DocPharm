import UserDashboardLayout from "./layouts/UserDashboardLayout";
import AppointmentsListingSection from "./sections/AppointmentListingSection";

export default function UserAppointmentsListing() {

    return (
        <>
            <UserDashboardLayout menuItem={'15'} title={'Appointments'} description={"View your upcoming & completed appointments"}>
                <AppointmentsListingSection />
            </UserDashboardLayout>
        </>
    )
}