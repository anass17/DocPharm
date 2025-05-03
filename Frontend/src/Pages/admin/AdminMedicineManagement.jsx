import AdminSidebarLayout from "./layouts/AdminSidebarLayout";
import MedicineManagementSection from "./sections/MedicineManagementSection";

export default function AdminMedicineManagement() {

    return (
        <>
            <AdminSidebarLayout menuItem={'18'}>
                <MedicineManagementSection />
            </AdminSidebarLayout>
        </>
    )
}