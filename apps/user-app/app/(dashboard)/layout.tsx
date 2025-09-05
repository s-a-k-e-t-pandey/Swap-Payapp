import { Sidebaritem } from "../../components/Sidebaritem"
import { RiHomeSmileLine } from "react-icons/ri";
import { BiTransferAlt } from "react-icons/bi";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function Layout({children}: {children: React.ReactNode}): JSX.Element{
    return (
        <div className="flex ">
            <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
                <div>
                    <Sidebaritem href={"/dashboard"} icon={<RiHomeSmileLine />} title="Home"></Sidebaritem>
                    <Sidebaritem href={"/transfer"} icon={<BiTransferAlt />} title="Transfer"></Sidebaritem>
                    <Sidebaritem href={"/transactions"} icon={<FaClockRotateLeft />} title="Transactions"></Sidebaritem>
                    <Sidebaritem href={"/p2p"} icon={<P2PTransferIcon/>} title="P2P Transfer"></Sidebaritem>
                </div>
            </div>
            {children}
        </div>
    )
}

function P2PTransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  }
