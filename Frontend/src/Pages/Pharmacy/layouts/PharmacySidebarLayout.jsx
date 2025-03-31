import PharmacySidebar from '../../../components/Sidebar/PharmacySidebar'
import PharmacyNavbar from '../../../components/Navbar/PharmacyNavbar';
import { useState } from 'react';

function PharmacyLayout({children}) {

    let [menuItem, setMenuItem] = useState('13');

    return (
        <>
            <PharmacyNavbar />
            <div style={{ display: "flex" }}>
                <PharmacySidebar menuItem={menuItem} setMenuItem={setMenuItem} />
                <div style={{ padding: "2rem 3rem", flex: 1 }}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default PharmacyLayout;