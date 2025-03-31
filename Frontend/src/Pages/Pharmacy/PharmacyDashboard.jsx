import DashboardSection from "./sections/DashboardSection";
import PharmacyLayout from "./layouts/PharmacySidebarLayout";

export default function PharmacyDashboard() {

    return (
        <>
            <PharmacyLayout>
                <DashboardSection />
            </PharmacyLayout>
        </>
    )
}