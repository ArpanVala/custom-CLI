import fs from 'node:fs/promises'
import http from 'node:http'
import open from 'open'
const interplote = (html,data)=>{
    return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => { return data[placeholder] || '';
});}

const formatNotes = notes => {
    return notes.map((note)=>{
        return `<tr>
        <td className="note">
            <p>${note.content}</p>
        </td>
        <td className="tag">
            <p>${note.tags.map(tag => `<button> ${tag}</button>`).join('')}</p>
        </td></tr>
        `
    }).join('\n')
}

const createServer = (notes)=>{
    return http.createServer(async (req,res)=>{
        const PATH = new URL('./template.html',import.meta.url).pathname.slice(1,)
        const template=await fs.readFile(PATH,'utf-8')
        const html = interplote(template,{notes:formatNotes(notes)})

        res.writeHead(200,{'Content-Type':  'text/html'});
        res.end(html);
    })
}

export const start =(notes,port)=>{
    const server= createServer(notes)
    server.listen(port,()=>{
        console.log(`Server is listening on port ${port}`);
    });
    open(`http://localhost:${port}`)
}   