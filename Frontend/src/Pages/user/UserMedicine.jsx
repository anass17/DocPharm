import UserMedicineDisplaySection from "./sections/UserMedicineDisplaySection";
import UserSimpleLayout from "./layouts/UserSimpleLayout";

export default function UserInventory() {

    return (
        <>
            <UserSimpleLayout>
                <UserMedicineDisplaySection />
            </UserSimpleLayout>
        </>
    )
}