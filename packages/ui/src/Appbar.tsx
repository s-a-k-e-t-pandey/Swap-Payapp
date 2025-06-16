import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
    return <div className="flex justify-between border-b border-slate-300 bg-stone-300 px-4">
        <div className="flex items-center  py-2">
            <div className="text-2xl text-blue-800 font-stretch-ultra-expanded font-extrabold flex flex-col justify-center">
                pay
            </div>
            <div className="text-2xl text-cyan-500 font-stretch-extra-expanded font-extrabold flex flex-col justify-center">
                tm
            </div>
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}