import React from 'react'
import DownloadIcon from "@/components/DownloadIcon";

const InvoiceTable = ({data,status,showMore}) => {
  return (
    <table className=" min-w-[400px] w-full">
    <tbody>

    
   {
    data.slice(0,3).map((d,i)=>
    {
      return <tr key={i} className="">
        <td className="text-[14px] font-[400] text-[#1B2559] xs:pl-0 md:pl-0 whitespace-nowrap pr-0 py-[6.5px]">{d.date.toDateString()}</td>
        <td className="text-[14px] font-[500] text-[#1B2559] xs:pl-4 md:pl-0 whitespace-nowrap pr-0 py-[6.5px]">${d.price}</td>
        <td className="xs:pl-4 md:pl-0 whitespace-nowrap pr-0 py-[6.5px]">{status[d.status]}</td>
        <td className="capitalize text-[14px] font-[500] text-[#718096] flex items-center gap-1 xs:pl-4 md:pl-0 whitespace-nowrap pr-0 py-[6.5px]"><DownloadIcon className=""/>download reciept</td>
      </tr>
    })
   }
   {
   showMore && <> {data.slice(3).map((d,i)=>
    {
      return <tr key={i} className="">
        <td className="text-[14px] font-[400] text-[#1B2559] xs:pl-0 md:pl-0 whitespace-nowrap pr-0 py-[6.5px]">{d.date.toDateString()}</td>
        <td className="text-[14px] font-[500] text-[#1B2559] xs:pl-4 md:pl-0 whitespace-nowrap pr-0 py-[6.5px]">${d.price}</td>
        <td className="xs:pl-4 md:pl-0 whitespace-nowrap pr-0 py-[6.5px]">{status[d.status]}</td>
        <td className="capitalize text-[14px] font-[500] text-[#718096] flex items-center gap-1 xs:pl-4 md:pl-0 whitespace-nowrap pr-0 py-[6.5px]"><DownloadIcon className=""/>download reciept</td>
      </tr>
    })}</>
   }
   </tbody>
  </table>
  )
}

export default InvoiceTable
