import UserMedicinesSection from "./sections/UserMedicinesSection";
import UserSidebarLayout from "./layouts/UserSidebarLayout";
import MedicineFiltersSidebar from "../../components/Sidebar/MedicineFiltersSidebar";

export default function UserMedicines() {

    return (
        <>
            <UserSidebarLayout Sidebar={MedicineFiltersSidebar} title={"All Medicines"}>
                <UserMedicinesSection />
            </UserSidebarLayout>
        </>
    )
}