import React, { useEffect } from 'react'
import { useTable, usePagination, useSortBy } from 'react-table'
import './index.css'
// icons
import UpdateIcon from './../../assets/icons/updateIcon'
import DeleteIcon from './../../assets/icons/deleteIcon'
import UpArrow from './../../assets/icons/upArrowIcon'
import DownArrow from './../../assets/icons/downArrowIcon'

export const ReactTable = ({ columns, data }) => {

    // Using the state and functions returned from useTable to build UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useSortBy,
        usePagination,

    )

    // Rendering the UI for the table
    return (
        <>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps([
                                    {
                                        className: column.className,
                                    },
                                    column.getSortByToggleProps()
                                ])}>
                                    <span className='flex flex-row justify-center items-center'>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <UpArrow width={20}/>
                                                : <DownArrow width={20} />
                                            : ''}
                                    </>
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr className='table-row'  {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    if (cell.column.Header === 'Actions') {
                                        return <td className='table-data' {...cell.getCellProps()}>
                                            <div className='flex flex-row justify-center items-center'>
                                                {/* update button */}
                                                <UpdateIcon width={37} color='#205fdd' onClick={() => { cell.column.updateHandler(cell.value, row.cells) }} />
                                                {/* delete button */}
                                                <DeleteIcon width={38} color='red' onClick={() => { cell.column.deleteHandler(cell.value) }} />
                                            </div>
                                        </td>
                                    }
                                    else {
                                        return <td className='table-data' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    }
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* Pagination implementation*/}

            <ul className="flex flex-row">
                {/* traversal buttons */}
                <li className="mybtn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="">{'<<'}</a>
                </li>
                <li className="mybtn" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="">{'< Prev'}</a>
                </li>
                {/* page status */}
                <li className='page-no'>
                    Page{' '}
                    <strong>
                        <input
                            className="w-[30px] text-center mx-1 outline-none bg-[#dadada16]"
                            type="number"
                            value={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                        />
                        of {pageOptions.length}
                    </strong>{' '}
                </li>
                <li className="mybtn" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="">{'Next >'}</a>
                </li>
                <li className="mybtn" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="">{' >>'}</a>
                </li>

                {/* jump to a specific page */}
                <li>



                </li>{' '}
                {/* no to rows at a time */}
                {/* <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select> */}
            </ul>
        </ >
    )
}