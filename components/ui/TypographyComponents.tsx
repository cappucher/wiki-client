import Link from "next/link";

export interface TypographyProps {
    children: React.ReactNode;
}

export interface TypographyLinkProps {
    children: React.ReactNode;
    href: string
}


const TypographyH1: React.FC<TypographyProps> = ({ children }) => {
    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {children}
        </h1>
    )
}

const TypographyH2: React.FC<TypographyProps> = ({ children }) => {
    return (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {children}
        </h2>
    )
}

const TypographyH3: React.FC<TypographyProps> = ({ children }) => {
    return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {children}
        </h3>
    )
}

const TypographyH4: React.FC<TypographyProps> = ({ children }) => {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {children}
        </h4>
    )
}

const TypographyP: React.FC<TypographyProps> = ({ children }) => {
    return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            {children}
        </p>
    )
}

const TypographyBlockquote: React.FC<TypographyProps> = ({ children }) => {
    return (
        <blockquote className="mt-6 border-l-2 pl-6 italic">
            {children}
        </blockquote>
    )
}

const TypographyUL: React.FC<TypographyProps> = ({ children }) => {
    return (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            {children}
        </ul>
    )
}

const TypographyInlineCode: React.FC<TypographyProps> = ({ children }) => {
    return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            @radix-ui/react-alert-dialog
        </code>
    )
}

const TypographyLink: React.FC<TypographyLinkProps> = ({ href, children }) => {
    return (
        <Link
            href={href}
            className="font-medium text-primary underline underline-offset-4"
        >
            {children}
        </Link>
    )
}

export { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyP, TypographyBlockquote, TypographyInlineCode, TypographyUL, TypographyLink };
