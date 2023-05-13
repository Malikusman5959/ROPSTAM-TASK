import React from 'react'

export default function ConfirmModal({handler , close}) {
    return (
        <div className='mybackdrop h-[100vh] w-[100vw] absolute flex flex-col justify-center items-center bg-[]'>
            <div className='text-white w-[500px] h-[160px] p-6 bg-[#1e3a8a] rounded-lg'>
                <p> <text className='text-red-500 font-black'>WARNING!</text> All the vehicles having the this category will also be deleted. <br /> Are you sure you want to continue? </p>
                <div className='flex flex-row justify-around items-center mt-4'>
                    <button onClick={handler} className='py-[2px] px-[20px] rounded-lg bg-red-500 hover:bg-red-700'> Yes </button>
                    <button onClick={close} className='py-[2px] px-[20px] rounded-lg bg-[#095abd] hover:bg-[#67abff]'> No </button>
                </div>
            </div>
        </div>
    )
}