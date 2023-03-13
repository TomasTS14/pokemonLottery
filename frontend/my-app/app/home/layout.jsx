"use client"

import MyNavbar from './../components/navbar/index';
export default function HomeLayout({ children }) {

    return (
        <>
            <div className="col-8 bg-light rounded h-auto">
                <MyNavbar />
                <main>
                    {children}
                </main>
            </div>
        </>


    )
}