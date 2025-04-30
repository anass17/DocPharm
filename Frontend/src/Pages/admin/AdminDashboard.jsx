import DashboardSection from "./sections/DashboardSection";
import AdminSidebarLayout from "./layouts/AdminSidebarLayout";

export default function AdminDashboard() {

    return (
        <>
            <AdminSidebarLayout menuItem={'13'} title={'Dashboard'} description={'Keep track on your daily progress'} >
                <DashboardSection />
            </AdminSidebarLayout>
        </>
    )
}