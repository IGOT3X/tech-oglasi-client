
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const RenderMarkdown = ({toRender}:{toRender:string}) =>{

    const lines = toRender.split('\n');
    
    return (
        <div>
            {   
                lines.map(line=>(
                    line==""?<br />:
                    line.startsWith("* ")||line.startsWith("- ")?
                    <div className="flex gap-1 items-start">
                        <img className="w-[18px] mt-[3px]" src="minus.svg" alt="" />
                        <p>
                            <ReactMarkdown>{line.split("* ")[1]}</ReactMarkdown>
                            <ReactMarkdown>{line.split("- ")[1]}</ReactMarkdown>
                        </p>
                    </div>
                    :
                    <ReactMarkdown>{line}</ReactMarkdown>
                ))
            }
        </div>
      );
}

export default RenderMarkdown;