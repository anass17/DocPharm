import DashboardSection from "./sections/DashboardSection";
import DoctorSidebarLayout from "./layouts/DoctorSidebarLayout";

export default function DoctorDashboard() {

    return (
        <>
            <DoctorSidebarLayout menuItem={'13'} title={'Dashboard'} description={"Keep track on your daily progress"}>
                <DashboardSection />
            </DoctorSidebarLayout>
        </>
    )
}