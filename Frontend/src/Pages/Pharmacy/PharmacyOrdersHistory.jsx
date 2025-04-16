import PharmacyOrdersHistorySection from "./sections/PharmacyOrdersHistorySection";
import PharmacyLayout from "./layouts/PharmacySidebarLayout";

export default function PharmacyOrdersHistory() {

    return (
        <>
            <PharmacyLayout menuItem={'19'} title={'Orders History'}>
                <PharmacyOrdersHistorySection />
            </PharmacyLayout>
        </>
    )
}