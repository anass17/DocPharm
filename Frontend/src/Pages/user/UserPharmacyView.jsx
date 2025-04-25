import UserSimpleLayout from "./layouts/UserSimpleLayout";
import PharmacyViewSection from "./sections/PharmacyViewSection";

export default function UserPharmacyView() {

    return (
        <>
            <UserSimpleLayout>
                <PharmacyViewSection />
            </UserSimpleLayout>
        </>
    )
}