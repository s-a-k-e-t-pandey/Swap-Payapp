"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [processed, setProcessed] = useState(false);

    if(processed){
        setTimeout(()=>{
            setProcessed(false);
            setNumber("");
            setAmount("");
        }, 10000);
    }


    return <div className="h-[90vh] w-[80vw]">
        {!processed ? (
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            await p2pTransfer(number, Number(amount) * 100)
                            setProcessed(true);
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
        ) : (
        <Center>
            <Card title="Payment Successful">
                <div className="min-w-72 p-6 text-center">
                    <div className="mb-4">
                        <div className="h-16 w-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Payment Sent Successfully!
                    </h3>
                    <div className="text-sm text-gray-600 mb-4">
                        <p>Amount: ₹{Number(amount).toLocaleString()}</p>
                        <p>To: {number}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            {new Date().toLocaleString()}
                        </p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <Button onClick={() => {
                            setNumber("");
                            setAmount("");
                            setProcessed(false);
                        }}>
                            Make Another Payment
                        </Button>
                    </div>
                </div>
            </Card>
        </Center>
        )}
    </div>
}