// components/PromptBox.js
import { useState, useRef } from 'react';
import PromptBoxIcon from './PromptBoxIcon';
import GenerateIcon from './GenerateIcon';
import uploadImage from '@/utils/uploadImage';

export default function PromptBox2({ onSend, onImageUpload , setIsFirst, isFirst, setSideBarData,setData }) {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [blobUrl, setBlobUrl] = useState('');



//   const handleSend = () => {
//     if (prompt.trim() !== '') {
//       onSend(prompt);
//       setPrompt('');
//     }
//   };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

   const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    let base64Image;
    reader.onloadend = () => {
      setSelectedFile(reader.result.split(',')[1]); // Get base64 without prefix
      // base64Image = reader.result.split(',')[1]; // Get base64 without prefix
    };
    if(e.target.files[0]){
      setBlobUrl(URL.createObjectURL(e.target.files[0]));
    }
    
  };

    
    const generateContent = async () => {
               
     
      // if (isFirst) {
      //   setIsFirst(false)
      //   setSideBarData((old) => {
      //     let data = [...old]
      //     data.push({
      //       id: `${data.length}`,
      //       text: prompt
      //     })
      //     data.reverse()
      //     return data;
      //   })
      // }
      // else {
      //   console.log(prompt)
      // }
      // setPrompt("")

      if (prompt.trim() !== '') return;
      console.log(selectedFile)
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Image: selectedFile }),
    });

    const data = await res.json();
    if (data.url) setUploadedUrl(data.url);
    else alert('Upload failed');

  
    }

  return (
    <div className="flex items-end p-2 border rounded-xl shadow-md bg-white mt-2 w-full">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Image Add Button */}
      <button
        onClick={handleAddImageClick}
        className="p-2 rounded-full hover:bg-gray-200 transition flex justify-center items-center"
        disabled={isUploading}
      >
        <PromptBoxIcon  className="inline-block "/>
        {/* <Paperclip className="w-5 h-5 text-gray-600" /> */}
      </button>

      {/* Textarea with auto-resize */}
      <textarea
        className="flex-1 resize-none border-none outline-none p-2 bg-transparent max-h-60 overflow-y-auto"
        rows={1}
        placeholder="Type your message..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          height: 'auto',
          minHeight: '40px'
        }}
      />

      {/* Send Button */}
      <button
        onClick={generateContent}
        className="p-2 rounded-full hover:bg-blue-500 transition text-white bg-blue-600"
      >
        
        <GenerateIcon />
      </button>
    </div>
  );
}
