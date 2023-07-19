import { useState } from "react";
import * as React from 'react';
import Navbar from "./Layout/Navbar/Navbar";
import CommandInput from "./Layout/CommandInput";
import SessionPanel from "./SessionManager/SessionPanel";
import Spinner from './Layout/Spinner';
import myImage from './bot.jpg'
import myImage1 from './userAvatar.jpg'
import myImage2 from './botAvatar.png'
export default function Chat() {
  const [disableInput, setDisableInput] = useState(false);
  const [messages,setMessages]= useState([]);
  const [res,setRes]=useState([]);
  const [response, setResponse] = useState("");
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);
  const [ fileName, setFileName ] = useState("");
   const [showChatPanel, setShowChatPanel] = useState(false);
  const onLoadingTrue = () => setUploading(true);
  const onLoadingFalse = () => setUploading(false);

  const onAskingTrue = () => setAsking(true)
  const onAskingFalse = () => setAsking(false)



  const handleCommandSubmit = async (command) => {
    setMessages([...messages,command,""]);
    setDisableInput(true);
    const apiUrl = "http://5.181.217.225:5000/first";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: command }),
    };
    onAskingTrue();
    
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    setRes((prevRes) => [...prevRes, data.response,""]);
    setResponse(data.response);
    console.log(data.response)
    setDisableInput(false);
    setHasResponse(true);
    onAskingFalse();
  };


  console.log(messages);
  console.log(res);
  const toggleChatPanel = () => {
    setShowChatPanel(!showChatPanel);
  };
  return (
    <div className="w-[438px]">
      <button href={myImage2} className="h-40 w-40 rounded-full ml-[90vw] mt-[80vh] fixed bg-white" alt="" onClick={toggleChatPanel}><img src={myImage2} alt="" /></button> {/* Button to toggle the chat panel visibility */}
      {showChatPanel && (
      <div className="md:ml-[73vw] mt-[21vh] relative w-full h-full">
      { uploading ? <Spinner /> : ""
      }   
      <div className="border-[1px] border-black bottom-0 right-0 max-h-[650px] md:w-[480px] bg-white grid content-between" style={{ minHeight: "calc(80vh - 72px)" }}>
      <div className="border-2 h-[80px] w-full flex justify-center align-center text-white bg-blue-600 align-center">
        <div className="align-center text-[45px]">Ajaffee Va</div></div>
        
        <div className="overflow-scroll overflow-x-hidden max-h-[600px] h-[470px]">{messages.map((data,key)=>
        key%2===0?<div className="flex mt-2 justify-end mr-2 gap-2">
          <span className="break-words bg-blue-500 px-3 py-3 max-w-[350px] rounded-3xl text-white">{data}</span>
          <img className=" h-12 w-12 rounded-full" src={myImage1} alt="" />
          </div>:
      <div className="ml-2 mt-2 gap-2 flex justify-start">
        
        <img className="h-12 w-12 rounded-full" src={myImage} alt="" />
        
        <div className="overflow-scroll overflow-x-hidden max-h-[600px] h-[470px]">
        
        {res.map((itemData, index) => (
          <div key={index} className="max-w-[350px] break-words bg-gray-200 px-3 py-3 rounded-3xl my-2">
            {itemData.split(/\n/).map((line, idx) => (
              <div key={idx}>
                {line.trim() && (
                  <>
                    {line.endsWith("Price") ? (
                      <strong>{line}</strong>
                    ) : (
                      line
                    )}
                  </>
                )}
                <br />
              </div>
            ))}

          </div>
        ))}
      </div>

      

      </div>
      )};
    </div>



        <div className="relative w-full justify-between">
          <div className="w-full justify-between grid pb-4" style={{ placeContent: "center" }}>
            <CommandInput onCommandSubmit={handleCommandSubmit} messages={messages}/>
          </div>
        </div>
      </div>
    </div>
      )};</div>
  );
}
