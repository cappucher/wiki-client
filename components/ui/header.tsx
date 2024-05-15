import Link from "next/link"
import { MainNav } from "./main-nav"

interface linkProps extends React.HTMLAttributes<HTMLElement> {
    link: number
}

export function Header({ className, link, ...props }: linkProps) {
    
    return (
        <div className="border-b mb-5">
            <div className="flex h-16 items-center px-4">
                <Link
                    href="/"
                >
                    <h1 className="text-2xl	 font-semibold">Harkawiki</h1>
                </Link>
                <div className="ml-auto flex items-center space-x-4">
                    <MainNav className="mx-6" link={link} />
                </div>
            </div>
        </div>
    )
}

