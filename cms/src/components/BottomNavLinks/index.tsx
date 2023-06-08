import React, { useEffect, useState } from 'react'

import { useAuth } from 'payload/components/utilities'

import './styles.scss'

export const ProfileImage: React.FC = () => {
    const { user } = useAuth()
    const [data, setData] = useState(null)

    const apiUrl = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/users/${user.id}`

    useEffect(() => {
        const getImageUrl = async () => {
            const res = await fetch(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const body = await res.json()

            setData(body)
        }
        getImageUrl()
    }, [apiUrl])

    return (
        <div className='profile-container'>
            {data?.image ? (
                <div className='profile-img'>
                    <img src={data?.image?.sizes?.thumbnail?.url} alt='' />
                </div>
            ) : (
                <svg className='graphic-account' width='30' height='30' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25'>
                    <circle className='circle1' cx='12.5' cy='12.5' r='11.5'></circle>
                    <circle className='circle2' cx='12.5' cy='10.73' r='3.98'></circle>
                    <path d='M12.5,24a11.44,11.44,0,0,0,7.66-2.94c-.5-2.71-3.73-4.8-7.66-4.8s-7.16,2.09-7.66,4.8A11.44,11.44,0,0,0,12.5,24Z'></path>
                </svg>
            )}
            <div className='profile-text'>Account</div>
        </div>
    )
}

export const LogoutLink: React.FC = () => {
    return (
        <a className='nav__log-out' href='/admin/logout'>
            <div className='profile-container'>
                <svg className='icon icon-logout' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M10 5H18V19H10' className='stroke'></path>
                    <g>
                        <path d='M8 8.5L4.46447 12.0355L8 15.5711' className='stroke'></path>
                        <line x1='5' y1='12' x2='13' y2='12' className='stroke'></line>
                    </g>
                </svg>

                <div className='profile-text'>Logout</div>
            </div>
        </a>
    )
}
