import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://ddrfqvjpckvxvibhqtqn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkcmZxdmpwY2t2eHZpYmhxdHFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNDI4MzQsImV4cCI6MjA2MDcxODgzNH0.KoKOs9P4shZs2bXrN4gC1GFjv8TdvvSfD1ExYLZuL8A"
)
export default function mediaUpload(file){

    const promise = new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp+file.name
            supabase.storage.from("images").upload(newFileName,file,{
                cacheControl:"3600",
                upsert:false
            }).then(
                ()=>{
                    const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                    reject("File uploading failed")
                }
            )       
        }
    )
    return promise
}

