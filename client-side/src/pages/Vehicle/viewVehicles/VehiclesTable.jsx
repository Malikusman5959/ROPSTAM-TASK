import React, { useLayoutEffect, useState, useContext } from "react";
import ReactTable from "../../../components/Table";
import { fetchAllVehicles, deleteVehicle } from "../fetchApi";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../store/Context";
import { showToast } from '../../../components/Toastify/Trigger'

function VehiclesTable() {

    let navigate = useNavigate();
    const [appData, dispatch] = useContext(AppContext);
    const [data, setdata] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // get vehicles
    const getVehicles = async () => {
         // start loading
         dispatch({ type: 'loading', payload: true });
        let vehicles = await fetchAllVehicles();
         // stop loading
         dispatch({ type: 'loading', payload: false });
        setdata(vehicles);
    }

    // delete vehicle
    const removeVehicle = async (id) => {

        // start loading
        dispatch({ type: 'loading', payload: true });

        try {
            let result = await deleteVehicle(id);
            if (result.status === 200) {
                // Successfull operation, stop loading, show success toast and refresh table
                setRefresh(!refresh);
                dispatch({ type: 'loading', payload: false });
                showToast('success', result.data.message);
            }
        }
        catch (err) {
            // error
            dispatch({ type: 'loading', payload: false });
            showToast('error', err.message);
        }
    }

    const  columns = [
                {
                    Header: 'Sno',
                    accessor: (row, index) => index + 1,
                    className : 'table-header w-[80px]'
                },
                {
                    Header: 'Name',
                    accessor: 'name',
                    className : 'table-header w-[300px]'
                },
                {
                    Header: 'Type',
                    accessor: 'type.name',
                    className : 'table-header w-[300px]'
                },
                {
                    Header: 'Model',
                    accessor: 'model',
                    className : 'table-header w-[100px]'
                },
                {
                    Header: 'Color',
                    accessor: 'color',
                    className : 'table-header w-[100px]'
                },
                {
                    Header: 'RegNo',
                    accessor: 'regNo',
                    className : 'table-header w-[100px]'
                },
                {
                    Header: 'Actions',
                    accessor: '_id',
                    className : 'table-header w-[100px]',
                    updateHandler: (vehicleId, data) => {
                        navigate({
                            pathname: '/vehicles/update-vehicle/',
                            search: `?id=${vehicleId}&name=${data[1].value}&type=${data[2].value}&model=${data[3].value}&color=${data[4].value}&regNo=${data[5].value}`,
                        });
                    },
                    deleteHandler: removeVehicle
                }
            ];
     
    useLayoutEffect(() => {
        getVehicles();
    }, [refresh]);

    return (
        <div className="w-full h-full p-8 pt-32 text-center flex flex-col items-center">
            {/* header */}
            <h1 className="text-white uppercase tracking-wider text-3xl font-black"> Vehicles </h1>
            <div className="w-full flex flex-row justify-end"> <button onClick={() => { navigate('/vehicles/add-vehicle') }} className="mybtn"> + Add New Vehicle </button> </div>
            <ReactTable columns={columns} data={data} />
        </div>
    )
}

export default VehiclesTable;