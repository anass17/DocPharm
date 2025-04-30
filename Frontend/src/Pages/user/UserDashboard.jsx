import DashboardSection from "./sections/DashboardSection";
import UserDashboardLayout from "./layouts/UserDashboardLayout";

export default function UserDashboard() {

    return (
        <>
            <UserDashboardLayout menuItem={'13'} title={'Dashboard'} description={'Keep track on your daily progress'} >
                <DashboardSection />
            </UserDashboardLayout>
        </>
    )
}