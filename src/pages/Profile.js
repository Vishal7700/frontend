import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { apiUrl, getAxiosConfig } from '../config.js'
import { useLocation } from 'react-router-dom';




function Profile() {

    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const [doctorr, setDoctor] = useState({});

    const fetchDoctor = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/doctor/${id}`, getAxiosConfig());
            if (response.status === 200) {
                let doctorData = response.data;
                setDoctor(doctorData);

            }
        } catch (error) {
            console.log("Failed to fetch doctor", error);
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, [id]);







    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="w-11/12 mt-4 mx-auto p-8">
                <div className="flex items-center">
                    {
                        doctorr.profilePhoto && doctorr.profilePhoto.data && doctorr.profilePhoto.contentType ? (
                            <img
                                src={`data:${doctorr.profilePhoto.contentType};base64,${btoa(
                                    new Uint8Array(doctorr.profilePhoto.data.data).reduce(
                                        (data, byte) => data + String.fromCharCode(byte),
                                        ''
                                    )
                                )}`}
                                alt={doctorr.name}
                                className="w-48 h-48 rounded-2xl object-cover mr-6"
                            />
                        ) : (
                            <div className="w-48 h-48 rounded-2xl object-cover mr-6 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                            </div>
                        )
                    }
                    <div className="font-raleway">
                        <h2 className="text-2xl font-bold">Dr. {doctorr.name}</h2>
                        <p className="text-gray-600">
                            {doctorr.speciality} <span className='text-xs' >({doctorr.qualification})</span>
                        </p>

                        <div className="mt-2">
                            <div className="flex gap-2">
                                <h3 className="font-semibold">Email</h3>
                                <p>{doctorr.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <h3 className="font-semibold">Phone</h3>
                                <p>{doctorr.phone}</p>
                            </div>
                            <div className="flex gap-2">
                                <h3 className="font-semibold">Address</h3>
                                <p>{doctorr.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeslots */}
                <div className="mt-8 font-raleway">
                    <h3 className="text-xl font-bold text-left">Available Timeslots</h3>
                    <ul className="list-disc list-inside mt-2">
                        {doctorr.timeslots && doctorr.timeslots.length > 0 ? (
                            doctorr.timeslots.map((timeslot, index) => (
                                <li key={index} className="border-primary border-opacity-20 border-b px-2 py-2">
                                    <span className="font-semibold">{timeslot.day}: </span>
                                    {timeslot.startTime === '--' && timeslot.endTime === '--' ? (
                                        <span>Not available</span>
                                    ) : (
                                        <span>
                                            {timeslot.startTime} - {timeslot.endTime}
                                        </span>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li>No timeslots available</li>
                        )}
                    </ul>
                </div>
            </div>
        </>

    );
}

export default Profile