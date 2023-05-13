import React from 'react'
import { ReactTable } from './React-Table'

function index(props) {
  return (
    <ReactTable columns={props.columns} data={props.data}/>
  )
}

export default index;
