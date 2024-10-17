import axios from 'axios';
import React, { useEffect, useState } from 'react'

function GetIPaddress() {
    const [ipAddress, setIpAddress] = useState('');
    const [countryName, setCountryName] = useState('');
    const [isUsingVPN, setIsUsingVPN] = useState(false);


    useEffect(() => {
        const fetchIPAddress = async () => {
            try {
                const response = await fetch('https://api.ipify.org/?format=json');
                const data = await response.json();
                setIpAddress(data.ip);
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };
        fetchIPAddress();

    }, []);
    useEffect(() => {
        const fetchCountryName = async () => {
            try {
                const response = await fetch(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=35d2722746134c729c4f59dd8a477333&ip=${ipAddress}`
                );
                const data = await response.json();
                setCountryName(data?.currency?.code);
                localStorage.setItem('currency', JSON.stringify(data?.currency?.code))
                localStorage.setItem('currencyData', JSON.stringify(data?.country_code3))
                localStorage.setItem('currencyImg', JSON.stringify(data?.country_flag))
            } catch (error) {
                console.error('Error fetching country name:', error);
            }
        };

        if (ipAddress) {
            fetchCountryName();
        }

    }, [ipAddress])

    useEffect(() => {
        const checkVPN = async () => {
            try {
                const response = await fetch(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=35d2722746134c729c4f59dd8a477333&ip=${ipAddress}`
                );
                const data = await response.json();
                // alert(data)
                setIsUsingVPN(data.is_vpn);
            } catch (error) {
                console.error('Error checking VPN usage:', error);
            }
        };

        if (ipAddress) {
            checkVPN();
        }
    }, [ipAddress]);


    useEffect(() => {
        if (isUsingVPN) {
            alert('You are using a VPN.');
        }
    }, [isUsingVPN]);




}

export default GetIPaddress