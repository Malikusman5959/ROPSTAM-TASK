import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import ReactTable from "../../../components/Table";
import { fetchAllCategories, deleteCategory } from "../fetchApi";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../store/Context";
import { showToast } from '../../../components/Toastify/Trigger'
import ConfirmModal from "./ConfirmModal";

function CategoryTable() {

    let navigate = useNavigate();
    const [appData, dispatch] = useContext(AppContext);
    const [data, setdata] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [confirmation, setconfirmation] = useState({status : false , id : ''});

    // get categories
    const getCategories = async () => {
        // start loading
        dispatch({ type: 'loading', payload: true });
        let categories = await fetchAllCategories();
         // stop loading
         dispatch({ type: 'loading', payload: false });
        setdata(categories);
    }

    const deleteHandler = (id) => {
        setconfirmation({status : true , id : id})
    }

    const close = (id) => {
        setconfirmation({...confirmation , status : false})
    }

    // delete category
    const removeCategory = async () => {

        // hide modal
        setconfirmation({...confirmation , status : false});

        // start loading
        dispatch({ type: 'loading', payload: true });

        try {
            let result = await deleteCategory(confirmation.id);
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
                    Header: 'Actions',
                    accessor: '_id',
                    className : 'table-header w-[120px]',
                    updateHandler: (id, data) => {
                        let categoryName = data[1].value
                        navigate({
                            pathname: '/categories/update-category/',
                            search: `?id=${id}&categoryname=${categoryName}`,
                        });
                    },
                    deleteHandler: deleteHandler
                }
            ];
     
    useLayoutEffect(() => {
        getCategories();
    }, [refresh]);

    return (
        <>
            { confirmation.status ? <ConfirmModal handler={removeCategory} close={close}/> : null}
            <div className="w-full h-full p-8 pt-32 text-center flex flex-col items-center">
            {/* header */}
            <h1 className="text-white uppercase tracking-wider text-3xl font-black"> Categories </h1>
            <div className="w-full flex flex-row justify-end"> <button onClick={() => { navigate('/categories/add-category') }} className="mybtn"> + Add New Category </button> </div>
            <ReactTable columns={columns} data={data} />
        </div>
        </>
       
    )
}

export default CategoryTable;