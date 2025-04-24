import PharmacyListingSection from "./sections/PharmacyListingSection";
import UserSidebarLayout from "./layouts/UserSidebarLayout";
import PharmacyFiltersSidebar from "../../components/Sidebar/PharmacyFiltersSidebar";
import { useState } from "react";

export default function UserPharmacyListing() {
    const [sorting, setSorting] = useState('recent')
    const [filters, setFilters] = useState(0)

    return (
        <>
            <UserSidebarLayout filters={filters} setFilters={setFilters} Sidebar={PharmacyFiltersSidebar} title={"All Pharmacies"} sorting={sorting} setSorting={setSorting}>
                <PharmacyListingSection sorting={sorting} filters={filters} />
            </UserSidebarLayout>
        </>
    )
}