import Markdown from "markdown-to-jsx";
import Link from "next/link";

interface CustomLinkProps {
    href: string;
    children: React.ReactNode;
  }
  
  const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => (
    <Link
      className="text-blue-600 hover:text-blue-800 active:text-purple-700 underline"
      href={`https://wiki-client.vercel.app/wiki/${href}`}
    >
      {children}
    </Link>
  );
  
  const customRenderers = {
    a: CustomLink,
  };
  
  interface MarkdownRendererProps {
    data: {
      body: string;
    };
  }
  
  const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ data }) => (
    <p>
      <Markdown
        className="markdown"
      >
        {data.body}
      </Markdown>
    </p>
  );
  
  export default MarkdownRenderer;