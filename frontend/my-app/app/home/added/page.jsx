"use client"
import Link from 'next/link';

export default function Added() {

    return (
        <div className="col-8 bg-light rounded h-auto" >
            <h3>Succesfully added to your collection</h3>
            <Link href="/home">Go back to home</Link>
        </div >
    )
}