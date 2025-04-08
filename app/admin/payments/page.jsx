"use client"

import { GetPayments, UpdatePaymentStatus } from "@/actions/payments"
import { Check, ChevronDown, LoaderCircle, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"


export default function PaymentsPage() {

    const [isLoading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    const [filter, setFilter] = useState("all");
    const [currentImage,setCurrentImage] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const data = JSON.parse(await GetPayments())
            setPayments(data)
            setLoading(false)
        }
        getData()
    }, [])

    const handleStatusChange = async (paymentId, newStatus) => {
        setPayments((prevPayments) =>
            prevPayments.map((payment) => (payment._id === paymentId ? { ...payment, status: newStatus } : payment)),
        )

        const success = await UpdatePaymentStatus(paymentId, newStatus);

        if (!success) {
            const data = JSON.parse(await GetPayments())
            setPayments(data)
        }
    }

    const verifyPayment = async (paymentId) => {
        await handleStatusChange(paymentId, "verified")
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "verified":
                return "bg-green-500"
            case "verification-pending":
                return "bg-yellow-500"
            case "flagged":
                return "bg-red-500"
            case "refunded":
                return "bg-blue-500"
            default:
                return "bg-gray-500"
        }
    }

    const filteredPayments = filter === "all" ? payments : payments.filter((payment) => payment.status === filter)

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full">
                <LoaderCircle className="animate-spin size-16" />
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full h-full text-white px-2">
            <span className="text-3xl font-bold mx-auto text-white mb-6">Payments</span>

            <div className="flex justify-end space-x-2 items-center mb-4">
                <span className="text-lg font-medium text-gray-300">Filter by Status:</span>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-zinc-800 text-gray-300 border border-gray-700 rounded-md px-4 py-2"
                >
                    <option value="all">All</option>
                    <option value="verified">Verified</option>
                    <option value="verification-pending">Verification Pending</option>
                    <option value="flagged">Flagged</option>
                    <option value="refunded">Refunded</option>
                </select>
            </div>

            <div className="rounded-md border border-gray-700 bg-zinc-800">
                <Table>
                    <TableHeader>
                        <TableRow className={`bg-zinc-900 hover:bg-zinc-800`}>
                            <TableHead className="text-gray-300">Transaction ID</TableHead>
                            <TableHead className="text-gray-300">User</TableHead>
                            <TableHead className="text-gray-300">Type</TableHead>
                            <TableHead className="text-gray-300">Amount</TableHead>
                            <TableHead className="text-gray-300">Receipt</TableHead>
                            <TableHead className="text-gray-300">Date</TableHead>
                            <TableHead className="text-gray-300">Status</TableHead>
                            <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPayments.map((payment) => (
                            <TableRow key={payment._id} className="hover:bg-zinc-800">
                                <TableCell className="font-medium text-gray-200">{payment.transactionId}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full overflow-hidden">
                                            <Image
                                                src={payment.user.image || "/placeholder.svg"}
                                                alt={payment.user.name}
                                                width={32}
                                                height={32}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-200">{payment.user.name}</span>
                                            <span className="text-xs text-gray-400">{payment.user.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="capitalize text-gray-200">{payment.type}</TableCell>
                                <TableCell className="text-gray-200">₹ {payment.amount} /-</TableCell>
                                <TableCell>
                                    <button
                                        onClick={()=>setCurrentImage(payment.imageUrl)}
                                        className="bg-zinc-600 py-1 px-2 rounded hover:bg-zinc-500 active:ring-2 active:ring-black"
                                    >View</button>
                                </TableCell>
                                <TableCell className="text-gray-200">{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge className={`${getStatusColor(payment.status)} text-gray-900`}>{payment.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-8 px-2 text-gray-200 border-gray-600 bg-zinc-700">
                                                    <span>Change Status</span>
                                                    <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(payment._id, "verification-pending")}
                                                    disabled={payment.status === "verification-pending"}
                                                    className="text-gray-200 hover:bg-gray-700"
                                                >
                                                    Verification Pending
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(payment._id, "verified")}
                                                    disabled={payment.status === "verified"}
                                                    className="text-gray-200 hover:bg-gray-700"
                                                >
                                                    Verified
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(payment._id, "flagged")}
                                                    disabled={payment.status === "flagged"}
                                                    className="text-gray-200 hover:bg-gray-700"
                                                >
                                                    Flagged
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(payment._id, "refunded")}
                                                    disabled={payment.status === "refunded"}
                                                    className="text-gray-200 hover:bg-gray-700"
                                                >
                                                    Refunded
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        {payment.status !== "verified" && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 px-2 text-green-500 border-gray-600 hover:bg-zinc-700 bg-zinc-800 hover:text-green-600"
                                                onClick={() => verifyPayment(payment._id)}
                                            >
                                                <Check className="h-4 w-4 mr-1" /> Verify
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            {currentImage &&
            <dialog
                open
                className="bg-[rgba(0,0,0,0.8)] fixed flex w-full h-full top-0 left-0 z-[200] justify-center items-center text-white"
                onClick={()=>setCurrentImage(null)}
            >   
                <span className="fixed text-white text-lg font-bold top-0 bg-black">( Click / Tap anywhere to close )</span>
                <Image
                    src={currentImage}
                    alt="reciept"
                    width={500}
                    height={500}
                    className="max-w-full max-h-full p-4 bg-white"
                />

            </dialog>}
        </div>
    )
}
