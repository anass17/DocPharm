import AdminSidebarLayout from "./layouts/AdminSidebarLayout";
import PendingUsersSection from "./sections/PendingUsersSection";

export default function AdminPendingUsers() {

    return (
        <>
            <AdminSidebarLayout menuItem={'14'}>
                <PendingUsersSection />
            </AdminSidebarLayout>
        </>
    )
}