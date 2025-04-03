import PharmacyMedicineDisplaySection from "./sections/PharmacyMedicineDisplaySection";
import PharmacySimpleLayout from "./layouts/PharmacySimpleLayout";

export default function PharmacyInventory() {

    return (
        <>
            <PharmacySimpleLayout>
                <PharmacyMedicineDisplaySection />
            </PharmacySimpleLayout>
        </>
    )
}