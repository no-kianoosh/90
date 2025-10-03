import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import axios from 'axios'
import { usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function TrvTable() {
    const { props } = usePage();
    const { travels } = props;
    const [loading, setLoading] = useState(false);
    const handleClick = (url) => {
        if (!url) return;
        setLoading(true);
        router.get(url, {}, { preserveState: true, preserveScroll: true, replace: true, onFinish: () => setLoading(false), });
    };
    return (
        <div className='max-w-[90%] mx-auto mt-6 text-sm'>
            <div className=" pt-[.1rem] bg-white " >
                <table className="min-w-full border border-gray-300">
                    <thead className='text-center'>
                        <tr className="bg-blue-900 text-white">
                            <td className="border border-gray-300 px-2 py-2">#</td>
                            <td className="border border-gray-300 px-4 py-2">شماره سفر</td>
                            <td className="border border-gray-300 px-4 py-2">مبدا</td>
                            <td className="border border-gray-300 px-4 py-2">مقصد</td>
                            <td className="border border-gray-300 px-4 py-2">تاریخ</td>
                            <td className="border border-gray-300 px-4 py-2">زمان</td>
                            <td className="border border-gray-300 px-4 py-2">ظرفیت</td>
                        </tr>
                    </thead>
                    <tbody>
                        {travels.data.map((user) => (
                            <tr key={user.id} className="hover:bg-green-200 text-center even:bg-lime-50 odd:bg-white transition-colors text-nowrap cursor-pointer">
                                <td className='border border-gray-300 p-2 text-center items-center'>
                                    <div className="w-2 h-2 bg-green-500 rounded-xs animate-spin"></div>
                                </td>
                                <td className="border border-gray-300 px-6 py-2">{user.id}</td>
                                <td className="border border-gray-300 px-6 py-2">{user.inf.trv.mabcity}</td>
                                <td className="border border-gray-300 px-6 py-2 flex flex-col gap-1">
                                    <span>{user.inf['trv'].mag3city || user.inf['trv'].mag2city || user.inf['trv'].mag1city || user.inf['trv'].mag0city}</span>
                                    <span className='text-[60%]'>{user.inf.trv.mag1city ? formatCityPath(user) : ""}</span>
                                </td>
                                <td className="border border-gray-300 px-6 py-2">{user.inf['trv'].dshow}</td>
                                <td className="border border-gray-300 px-6 py-2">{user.inf['trv'].hshow + ':' + user.inf['trv'].mshow}</td>
                                <td className="border border-gray-300 px-6 py-2">{user.cap + " نفر"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={`w-full m-2 flex justify-center items-center ${loading ? "pointer-events-none opacity-50" : ""}`}>
                {travels.links.map((link, index) => {
                    let label = link.label;
                    if (label.includes('Previous')) label = 'قبلی';
                    if (label.includes('Next')) label = 'بعدی';

                    return (
                        <button
                            key={index}
                            onClick={() => handleClick(link.url)}
                            className={`mx-1 px-3 py-1 rounded ${link.active ? "cursor-pointer bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} ${!link.url ? "cursor-not-allowed opacity-50" : "hover:bg-blue-300"}`}
                            disabled={!link.url}
                        >
                            {label}
                        </button>
                    );
                })}
                {loading && (<LoaderCircle className="animate-spin text-blue-500 mr-3 w-5 h-5" />)}
            </div>
        </div >
    )

    function formatCityPath(user) {
        try {
            const trv = user.inf.trv;
            if (!trv) return '';
            if (!trv.mag1city) return '';
            const cities = [];
            if (trv.mag0city) cities.push(trv.mag0city);
            if (trv.mag1city) cities.push(trv.mag1city);
            if (trv.mag2city) cities.push(trv.mag2city);
            if (trv.mag3city) cities.push(trv.mag3city);

            return cities.join(' - ');
        } catch {
            return '';
        }

    }

}