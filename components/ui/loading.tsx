import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "./separator"

export function Loading() {
    return (
        <>
            <div className="mx-12 mt-10">
                <Skeleton className="h-10 w-[500px]" />
                <Separator className="my-4" />
                <Skeleton className="h-[400px] w-[800px] rounded-xl" />
            </div>
        </>
    )
}