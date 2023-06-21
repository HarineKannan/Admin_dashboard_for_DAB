import React, { useState } from 'react';
import './Dashboard.css';
import db from './firebase';
import { BsCircleFill } from 'react-icons/bs';
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('users');

    const [info, setInfo] = useState([]);
    const [users, setUsers] = useState([]);
    const [newData, setNewData] = useState([]);

    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
        fetchUsers();
        fetchNewData();

    });

    // Fetch the required data using the get() method
    const Fetchdata = () => {
        db.collection("appointments").get().then((querySnapshot) => {
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);
            });
        })
    }
    const fetchNewData = () => {
        db.collection("newData").get().then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((element) => {
                data.push(element.data());
            });
            setNewData(data);
        });
    };
    const fetchUsers = () => {
        db.collection("users").get().then((querySnapshot) => {
            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push(doc.data());
            });
            setUsers(usersData);
        }).catch((error) => {
            console.error("Error getting users:", error);
        });
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
            <div className="dashboard">
                <div className="blue-box">
                    <div className="name-list">
                        {['SKIN SPECIALIST', 'DENTIST', 'PAEDTRICIAN', 'NEURO SURGEON', 'GYNECOLOGIST', 'CARDIOLOGIST'].map(
                            (name, index) => (
                                <h3 key={index}>{name}</h3>
                            )
                        )}
                    </div>
                </div>
                <header className="header">
                    <h1>ADMIN DASHBOARD</h1>
                </header>
                <div className="horizontal-bar"></div>
                <nav className="sidebar">
                    <div className="tab-bar">
                        <div
                            onClick={() => handleTabChange('users')}
                            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
                        >
                            <BsCircleFill className={`tab-icon ${activeTab === 'users' ? 'active' : ''}`} /> Users
                        </div>
                        <div
                            onClick={() => handleTabChange('appointments')}
                            className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
                        >
                            <BsCircleFill
                                className={`tab-icon ${activeTab === 'appointments' ? 'active' : ''}`}
                            />{' '}
                            Appointments
                        </div>
                        <div
                            onClick={() => handleTabChange('ambulance')}
                            className={`tab ${activeTab === 'ambulance' ? 'active' : ''}`}
                        >
                            <BsCircleFill className={`tab-icon ${activeTab === 'ambulance' ? 'active' : ''}`} /> Ambulance
                        </div>
                    </div>
                </nav>
                <div className="horizontal-bar"></div>
                <main className="content">
                    <h2>Welcome to the Admin Dashboard!</h2>
                    {activeTab === 'users' && (
                        <div>
                            <div>
                                <h3>All Registered Users</h3>
                                <table className="centered-table">
                                    <thead>
                                        <tr>
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <UserTableRow key={index} user={user} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === 'appointments' && (
                        <div>
                            <h3>Appointments</h3>
                            <table className="centered-table">
                                <thead>
                                    <tr>
                                        <th>Patient Name</th>
                                        <th>Patient Age</th>
                                        <th>Gender</th>
                                        <th>Required Specialization</th>
                                        <th>Time Slot</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {info.map((data, index) => (
                                        <TableRow key={index} data={data} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === 'ambulance' && (
                        <div>
                            <table className="centered-table">
                                <thead>
                                    <tr>
                                        <th>ADDRESSES</th>
                                        {/* Add more table headers for your specific data */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {newData.map((data, index) => (
                                        <NewDataRow key={index} data={data} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
const TableRow = ({ data }) => {
    console.log(data.Patient_age + " " + data.Gender + " " + data.Patient_Name + " " + data.TimeSlot + " " + data.Required_Specalization);
    return (
        <tr>
            <td>{data.Patient_Name}</td>
            <td>{data.Patient_age}</td>
            <td>{data.Gender}</td>
            <td>{data.Required_Specalization}</td>
            <td>{data.TimeSlot}</td>
        </tr>
    );
};
const UserTableRow = ({ user }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
        </tr>
    );
};

const NewDataRow = ({ data }) => {
    console.log(data.heading);
    return (
        <tr>
            <td>{data.heading}</td>
        </tr>
    );
};

export default Dashboard;