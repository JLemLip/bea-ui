// import axios from '@/lib/axios'
// import { useState } from 'react'

const useLibrary = () => {
    const branch = [
        {
            Branch_Id: 1,
            Company_Name: 'Eternal Gardens',
            Branch_Code: '001',
            Branch_Name: 'Head Office',
            Action: 'Edit',
        },
        {
            Branch_Id: 2,
            Company_Name: 'Eternal Gardens',
            Branch_Code: '002',
            Branch_Name: 'Binan',
            Action: 'Edit',
        },
        {
            Branch_Id: 3,
            Company_Name: 'Eternal Gardens',
            Branch_Code: '003',
            Branch_Name: 'Lipa',
            Action: 'Edit',
        },
        {
            Branch_Id: 4,
            Company_Name: 'Eternal Gardens',
            Branch_Code: '004',
            Branch_Name: 'Batangas',
            Action: 'Edit',
        },
    ]
    // const [department, setDepartment] = useState([])

    // useEffect(async () => {
    //     await axios.get('/api/library/branch').then(libbranch => {
    //         const branches = [['Branch Code', 'Branch Name', 'Company Name']]

    //         branches.push(
    //             libbranch.map(obj => {
    //                 return Object.values(obj)
    //             }),
    //         )
    //         setBranch(branches)
    //     })

    //     await axios.get('/api/library/branch').then(libdepartment => {
    //         const departments = [['Branch Code', 'Branch Name', 'Company Name']]

    //         departments.push(
    //             libdepartment.map(obj => {
    //                 return Object.values(obj)
    //             }),
    //         )
    //         setDepartment(departments)
    //     })
    // })

    return { branch }
}

export default useLibrary
