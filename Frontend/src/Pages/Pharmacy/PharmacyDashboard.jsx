import DashboardSection from "./sections/DashboardSection";
import PharmacyLayout from "./layouts/PharmacySidebarLayout";

export default function PharmacyDashboard() {

    return (
        <>
            <PharmacyLayout menuItem={'13'} title={'Dashboard'}>
                <DashboardSection />
            </PharmacyLayout>
        </>
    )
}