import React, { useLayoutEffect, useState, useContext } from "react";
import ReactTable from "../../../components/Table";
import { fetchAllUsers } from "../fetchApi";
import { AppContext } from "../../../store/Context";


function UserTable() {

    const [data, setdata] = useState([]);
    const [appData , dispatch] = useContext(AppContext)

    // get users
    const getUsers = async () => {
        // start loading
        dispatch({ type: 'loading', payload: true });
        let users = await fetchAllUsers();
        // stop loading
        dispatch({ type: 'loading', payload: false });
        setdata(users);
    }

    // Table columns
    const  columns = [
                {
                    Header: 'Sno',
                    accessor: (row, index) => index + 1,
                    className : 'table-header w-[80px]'
                },
                {
                    Header: 'Username',
                    accessor: 'username',
                    className : 'table-header w-[300px]'
                },
                {
                    Header: 'Email',
                    accessor: 'email',
                    className : 'table-header w-[300px]'
                }
            ];
     
    useLayoutEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="w-full h-full p-8 pt-32 text-center flex flex-col items-center">
            {/* header */}
            <h1 className="text-white uppercase tracking-wider text-3xl font-black"> Users </h1>
            <ReactTable columns={columns} data={data} />
        </div>
    )
}

export default UserTable;