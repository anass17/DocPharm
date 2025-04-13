import PharmacyOrdersSection from "./sections/PharmacyOrdersSection";
import PharmacyLayout from "./layouts/PharmacySidebarLayout";

export default function PharmacyOrders() {

    return (
        <>
            <PharmacyLayout menuItem={'18'} title={'Active Orders'}>
                <PharmacyOrdersSection />
            </PharmacyLayout>
        </>
    )
}