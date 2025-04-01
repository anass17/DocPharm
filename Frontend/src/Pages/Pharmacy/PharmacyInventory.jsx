import InventorySection from "./sections/InventorySection";
import PharmacyLayout from "./layouts/PharmacySidebarLayout";

export default function PharmacyInventory() {

    return (
        <>
            <PharmacyLayout menuItem={'16'} title={'Our Stock'}>
                <InventorySection />
            </PharmacyLayout>
        </>
    )
}