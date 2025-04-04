import UserMedicinesSection from "./sections/UserMedicinesSection";
import UserSidebarLayout from "./layouts/UserSidebarLayout";
import MedicineFiltersSidebar from "../../components/Sidebar/MedicineFiltersSidebar";
import { useState } from "react";

export default function UserMedicines() {
    const [sorting, setSorting] = useState('recent')

    return (
        <>
            <UserSidebarLayout Sidebar={MedicineFiltersSidebar} title={"All Medicines"} sorting={sorting} setSorting={setSorting}>
                <UserMedicinesSection sorting={sorting} setSorting={setSorting} />
            </UserSidebarLayout>
        </>
    )
}