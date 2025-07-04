'use client'
import AddPaymentMethodModal from "@/components/AddPaymentMethodModal";
import BillingCard from "@/components/BillingCard";
import BillingInfoModal from "@/components/BillingInfoModal";
import CancelPlanModal from "@/components/CancelPlanModal";
import CancelledIcon from "@/components/CancelledIcon";
import DownloadIcon from "@/components/DownloadIcon";
import EditIcon from "@/components/EditIcon";
import InvoiceTable from "@/components/InvoiceTable";
import PaidIcon from "@/components/PaidIcon";
import SelectPaymentModal from "@/components/SelectPaymentModal";
import ShowMoreIcon from "@/components/ShowMoreIcon";
import VisaIcon from "@/components/VisaIcon";
import { useDisclosure } from "@heroui/react";
import React, { useState } from "react";

const data=[
  {
    date:new Date(),
    price:14.00,
    status:"paid",

  },
  {
    date:new Date(),
    price:14.00,
    status:"paid",

  },
  {
    date:new Date(),
    price:14.00,
    status:"cancelled",

  },
  {
    date:new Date(),
    price:14.00,
    status:"paid",

  },
  {
    date:new Date(),
    price:14.00,
    status:"paid",

  },
  {
    date:new Date(),
    price:14.00,
    status:"cancelled",

  },
  {
    date:new Date(),
    price:14.03,
    status:"paid",

  },
  {
    date:new Date(),
    price:14.00,
    status:"cancelled",

  },
  {
    date:new Date(),
    price:14.00,
    status:"paid",

  },
  {
    date:new Date(),
    price:14.00,
    status:"cancelled",

  },
]

const status={
  paid:<span className="uppercase flex items-center gap-1 text-[#27AE60] font-[500] text-[14px]"><PaidIcon/> Paid</span>,
  cancelled:<span className="uppercase flex items-center gap-1 text-[#EE6A5F] font-[500] text-[14px]"><CancelledIcon/> Cancelled</span>
}

const Page = () => {
  const {isOpen:isOpen1, onOpen:onOpen1, onOpenChange:onOpenChange1} = useDisclosure();
  const {isOpen:isOpen2, onOpen:onOpen2, onOpenChange:onOpenChange2} = useDisclosure();
  const {isOpen:isOpen3, onOpen:onOpen3, onOpenChange:onOpenChange3} = useDisclosure();
  const {isOpen:isOpen4, onOpen:onOpen4, onOpenChange:onOpenChange4} = useDisclosure();
  const [showMore,setShowMore]=useState(false)
  return (
    <div className="min-h-[100dvh] overflow-y-auto flex flex-col  w-full ">
      {/* top */}
      <div className="bg-[#1B2559] flex  items-center h-[144px]">
        <div className=" xs:px-2  sm:px-0 flex flex-col gap-2 max-w-[872px] w-full mx-auto">
          <p className="text-[12px] font-[500] text-[#FFFFFFCC]">
            <button>{"<"}--</button> <span>Return to EunomAI</span>
          </p>
          <h1 className="text-[#fff] text-[24px] font-[700]">
            Manage your EunomAI billing settings
          </h1>
        </div>
      </div>

      <div className="flex-1 mt-[20px]">
        <div className="xs:px-2 sm:px-0 flex flex-col md:gap-[60px] xs:gap-[30px] max-w-[872px] w-full mx-auto">
          <BillingCard title={"CURRENT PLAN"}>
            <div className="w-full flex flex-col gap-7">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[#1B2559] font-[600] text-[14px]">
                    ChatGPT Plus Subscription
                  </span>
                  <h1 className="text-[#1B2559] text-[28px] font-[700]">
                    $25 per month
                  </h1>
                </div>
                <button
                  className="capitalize text-[#fff] text-[14px] font-[600] px-3 py-2 rounded-[45px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #EE6A5F 0%, #D45146 100%)",
                  }}
                  onClick={onOpen1}
                >
                  cancel plan
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[16px] font-[400] text-[#1B2559]">
                  Your plan renews on 12 May 2024
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <VisaIcon />
                    <span className="flex items-center text-[#1B2559] font-[500] text-[16px]">
                      Visa ... 8569
                    </span>
                  </div>
                  <div>
                    <EditIcon  className="cursor-pointer" onClick={onOpen2}/>
                  </div>
                </div>
              </div>
            </div>
          </BillingCard>
          <BillingCard title={"BILLING INFORMATION"}>
            <div className="w-full flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-7">
                  <div className="flex items-center gap-1">
                    <VisaIcon />
                    <span className="flex items-center text-[#1B2559] font-[500] text-[16px]">
                      Visa ... 8569
                    </span>
                  </div>
                  <div>
                    <span className="flex items-center text-[#1B2559] font-[500] text-[16px]">
                      Expire 05/2036 ...
                    </span>
                  </div>
                </div>

                <div>
                  <button className="text-[#1A5CF4] font-[500] text-[14px]" onClick={onOpen3}>
                    + Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </BillingCard>
          <BillingCard title={"PAYMENT METHOD"}>
            <div className="w-full flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 text-[#1B2559] font-[400] text-[14px]">
                  <div className="grid grid-cols-12 ">
                    <span className="  inline-block xs:col-span-4 md:col-span-2">
                      Name
                    </span>
                    <span className="xs:col-span-8 md:col-span-10">Eunomai Pvt. Ltd.</span>
                  </div>
                  <div className="grid grid-cols-12">
                    <span className="  inline-block xs:col-span-4 md:col-span-2">
                      Address
                    </span>
                    <span className="whitespace-normal xs:col-span-8 md:col-span-10">
                      Palmerston Park, Rathmines South, Dublin, County Dublin,
                      Ireland, D06 EY73
                    </span>
                  </div>
                </div>
                <div>
                  <button className="text-[#1A5CF4] font-[500] text-[14px] capitalize flex items-center gap-3" onClick={onOpen4}>
                    <EditIcon /> Update information
                  </button>
                </div>
              </div>
            </div>
          </BillingCard>
          <BillingCard title={"INVOICE HISTORY"}>
           
            <div className="w-full overflow-x-auto flex flex-col gap-2 pb-4 items-start">

            
            {/* <table className=" min-w-[400px] w-full">
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
            </table> */}
            <InvoiceTable data={data} status={status} showMore={showMore}/>
             <button className="text-[#718096] font-[500] text-[12px] flex items-center gap-2" onClick={()=>setShowMore(!showMore)}><ShowMoreIcon className={`${showMore?"rotate-180":"rotate-0"}`}/>View {showMore?"Less":"More"}</button> 
            </div>
          </BillingCard>
        </div>
      </div>
      {isOpen1 &&<CancelPlanModal isOpen={isOpen1} onOpen={onOpen1} onOpenChange={onOpenChange1}/>}
      {isOpen2 &&<SelectPaymentModal isOpen={isOpen2} onOpen={onOpen2} onOpenChange={onOpenChange2}/>}
     { isOpen3 &&<AddPaymentMethodModal  isOpen={isOpen3} onOpen={onOpen3} onOpenChange={onOpenChange3}/>}
      {isOpen4 &&<BillingInfoModal isOpen={isOpen4} onOpen={onOpen4} onOpenChange={onOpenChange4}/>}
    </div>
  );
};

export default Page;
