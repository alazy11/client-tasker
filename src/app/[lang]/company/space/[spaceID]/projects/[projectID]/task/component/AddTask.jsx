// AddTask

"use client";

import ModelOverlay from "@/app/[lang]/component/ModelOverlay";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
// import Editor from "@/app/[lang]/component/Editor";
import TextEditor from "@/app/[lang]/component/TextEditor";

import profile from "@/public/project-image/user-profile.jpeg";
import Image from "next/image";
import FileBox from "./FileBox";

// const SpaceModel = dynamic(() => import("./model/SpacesModel"));
const ManagerModel = dynamic(() => import("./model/ManagerModel"));
const PriorityModel = dynamic(() => import("./model/PriorityModel"));
const TagModel = dynamic(() => import("./model/TagModel"));
const FileModel = dynamic(() => import("./model/FileModel"));
const SuccessNotification = dynamic(() => import("@/app/[lang]/component/SuccessNotification"));


// task_id = ?,
// phase_id = ?,
// project_id = ?, 
// employee_id = ?,
// title = ?,
// description = ?,
// start_date = ?,
// end_date = ?,
// link = ?,
// state = ?,
// priority = ?,


function createTask({projectID,title,state,manager,priority,selectedTags,phases,startDate,endDate,desc,folderPath,setLoader,setNotification,setModel,spaceID,referesh,setReferesh,attachment,downloadPath }) {
   setLoader(true)
   const task = {
      projectID,spaceID,title,state,manager,priority,selectedTags,phases,startDate,endDate,desc,folderPath,
      attachment,downloadPath
   }


   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/en/company/space/${spaceID}/project/${projectID}/task`,
   {
      method:'POST',
      credentials: "include",
      headers: {
         "content-type": "application/json",
         "cache-control": "no-cache",
      },
      body:JSON.stringify({...task})
   })
      .then((res) => {
         return res.json();
      })
      .then((data) => {
         if (data.status === "fail" || data.status === "error") {
            // setErrorMessage(true);
            // setErrorText(data?.message);
            console.log("data space faild....", data);
            setLoader(false)
         } else {
            // setErrorMessage(false);
            console.log("data project dd....", data.data);
            setLoader(false);
            setNotification(true);
            setTimeout(() => {
               setModel(false);
               setReferesh(!referesh)
            }, 1500);
            // setSpace(data.data);
         }
      })
      .catch((error) => {
         console.log(error);
         setLoader(false)
      });

}


function updateTask({projectID,title,state,manager,priority,selectedTags,phases,startDate,endDate,desc,folderPath,taskID,setLoader,setNotification,setModel,spaceID,referesh,setReferesh,setTaskInfo }) {
   setLoader(true)
   const task = {
      projectID,spaceID,title,state,manager,priority,selectedTags,phases,startDate,endDate,desc,folderPath
   }


   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/en/company/space/${spaceID}/project/${projectID}/task/${taskID}`,
   {
      method:'PUT',
      credentials: "include",
      headers: {
         "content-type": "application/json",
         "cache-control": "no-cache",
      },
      body:JSON.stringify({...task})
   })
      .then((res) => {
         return res.json();
      })
      .then((data) => {
         if (data.status === "fail" || data.status === "error") {
            // setErrorMessage(true);
            // setErrorText(data?.message);
            console.log("data space faild....", data);
            setLoader(false)
         } else {
            // setErrorMessage(false);
            console.log("data project dd....", data.data);
            setLoader(false);
            setNotification(true);
            setTaskInfo({});
            setTimeout(() => {
               setModel(false);
               setReferesh(!referesh)
            }, 1500);
            // setSpace(data.data);
         }
      })
      .catch((error) => {
         console.log(error);
         setLoader(false)
      });

}

function handleDate(date) {
   let day = new Date(date).getDate().toString();
   let month = new Date(date).getMonth().toString();
   let year = new Date(date).getFullYear();
   return `${year}-${month.length < 2 ? '0'+month : month}-${day.length < 2 ? '0'+day : day}`;
}


export default function AddTask({ setModel, spaceID,taskInfo = {}, referesh,setReferesh,projectID,process,setTaskInfo,folderPublic }) {
   const [loader, setLoader] = useState(false);
   const date = useRef(null);
   const [managerModel, setManagerModel] = useState(false);
   const [priorityModel, setPriorityModel] = useState(false);
   const [tagModel, setTagModel] = useState(false);
   const [space_id, setSpace_id] = useState(spaceID);
   const [title, setTitle] = useState(taskInfo.title || '');
   const [state, setState] = useState('todo');
   const [manager, setManager] = useState((Object.values(taskInfo).length > 0 ? [{user_id:taskInfo.user_id,public_name:taskInfo.public_name,profile_path:taskInfo.profile_path}] : null) || []);
   const [priority, setPriority] = useState(taskInfo.priority || "normal");
   const [fileModel, setFileModel] = useState(false);
   const [selectedTags, setSelectedTags] = useState([]);
   const [phases, setPhases] = useState("27");
   const [startDate, setStartDate] = useState((taskInfo.start_date && handleDate(taskInfo.start_date)) || "");
   const [endDate, setEndDate] = useState((taskInfo.end_date && handleDate(taskInfo.end_date)) || "");
   const [desc, setDesc] = useState(taskInfo.description || '');
   const [folderID, setFolderID] = useState(null);
   const [folderPath, setFolderPath] = useState(taskInfo.folder_path || folderPublic);
   const [downloadPath, setDownloadPath] = useState(null);
   const [folderName, setFolderName] = useState('');
   const [notification, setNotification] = useState(false);
   const [error, setError] = useState({
      title:'',
      assign:'',
      startDate:'',
      endDate:'',
      desc:''
   });
   const[attachment,setAttachment] = useState('')

   useEffect(()=>{

      console.log("attachment",attachment)

   },[attachment])

   // console.log("projectID",projectID)
   // console.log("spaceID",spaceID)


   return (
      <>
         <ModelOverlay showModel={setModel}>
            <div className="project-model contain-content overflow-hidden">
               <div className="grid rounded-xl bg-white w-full h-full relative overflow-hidden">
                  <div className="flex items-center justify-between h-12 ltr:pl-6 rtl:pr-6 ltr:pr-2 rtl:pl-2 border-bottom-e8eaed">
                     <ul className="flex items-center gap-6 h-full w-full">
                        <li className="top-item-project text-sm font-medium leading-4 self-stretch flex items-center relative ">
                           <span>Task</span>
                        </li>
                        <li className="text-656f7d text-sm font-medium leading-4 self-stretch flex items-center relative ">
                           <span>Docs</span>
                        </li>
                        <li className="text-656f7d text-sm font-medium leading-4 self-stretch flex items-center relative ">
                           {" "}
                           <span>Plan</span>
                        </li>
                        <li className="text-656f7d text-sm font-medium leading-4 self-stretch flex items-center relative ">
                           {" "}
                           <span>Events</span>
                        </li>
                     </ul>
                     <div>
                        <button className="w-8 h-8 p-1.5 rounded-md hover:bg-gray-100" onClick={(e)=>{
                           setModel(false)
                           setTaskInfo({})
                        }}>
                           <span
                              className="flex items-center justify-center w-full h-full"
                              style={{ color: "#656f7d" }}
                           >
                              <svg
                                 width={"100%"}
                                 height={"100%"}
                                 fill="none"
                                 stroke="currentColor"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path d="M18 6 6 18" />
                                 <path d="m6 6 12 12" />
                              </svg>
                           </span>
                        </button>
                     </div>
                  </div>

                  {/* {
               activeModel == 1 
               ? */}

                  <div className="grid grid-cols-2 overflow-hidden" autoComplete="off">
                     <div className="border-right-e8eaed flex flex-col overflow-hidden">
                        <div className="border-bottom-e8eaed min-h-12 flex items-center p-2 ltr:pl-3 rtl:pr-3 text-xl font-medium leading-6  text-2a2e34 ">
                           <h2>Details</h2>
                        </div>
                        <div
                           className="w-full flex-1 overflow-auto scroll-bar"
                        >
                           <div className="width-pro min-h-full h-auto m-auto p pt-6 pb-12 ">
                              <div className="w-full min-h-12 mb-3">
                                 {/* <h1 contentEditable={true} aria-placeholder="text" className="text-3xl font-bold w-full min-h-9 outline-none">
                           <span >
                              Title...
                           </span>
                        </h1> */}
                                 <textarea
                                    name="title"
                                    value={title}
                                    placeholder="Task Title..."
                                    className={`text-3xl font-bold outline-0 outline-none leading-5 w-full min-h-9 ${error.title.length > 0 ? 'border-b border-solid border-b-red-700' : ''}`}
                                    // required
                                    onChange={(e)=>{
                                       setTitle(e.target.value)
                                    }}
                                 ></textarea>
                              </div>

                              <ul className="flex flex-col gap-1">
                                 <li className="grid grid-project gap-1 cursor-pointer">
                                    <div className="grid gap-2 label items-center min-h-9">
                                       <span className=" w-4 h-4 flex items-center justify-center color-600">
                                          <svg
                                             width={"100%"}
                                             height={"100%"}
                                             fill="none"
                                             stroke="currentColor"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <path d="M12 21.143a9.143 9.143 0 1 0 0-18.286 9.143 9.143 0 0 0 0 18.286Z" />
                                             <path
                                                fillRule="evenodd"
                                                d="M5.4 12a6.6 6.6 0 1 0 13.2 0 6.6 6.6 0 0 0-13.2 0Zm10.8 0a4.2 4.2 0 1 1-8.4 0 4.2 4.2 0 0 1 8.4 0Z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                       </span>
                                       <p className="text-sm leading-4 font-normal color-600">
                                          State
                                       </p>
                                    </div>

                                    <div>
                                       <div className="w-full flex items-center text-sm font-normal min-h-9 color-700 rounded-md pl-1.5 pr-1.5 select-none hover:bg-gray-50">
                                          <div className="flex items-center gap-1 h-6 rounded pt-1 ltr:pr-2 rtl:pl-2 pb-1 ltr:pl-1 rtl:pr-1 back-todo-state ">
                                             <div className="w-4 h-4 flex items-center justify-center">
                                                <svg
                                                   width={"100%"}
                                                   height={"100%"}
                                                   fill="currentColor"
                                                   viewBox="0 0 24 24"
                                                   xmlns="http://www.w3.org/2000/svg"
                                                >
                                                   <path d="M12 19.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" />
                                                   <path d="M12 22.5A10.5 10.5 0 1 1 22.5 12 10.512 10.512 0 0 1 12 22.5ZM12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9Z" />
                                                </svg>
                                             </div>
                                             <span className="whitespace-nowrap overflow-hidden text-ellipsis text-xs font-medium leading-4 uppercase text-inherit">
                                                TO DO
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </li>

                                 <li
                                    className="grid grid-project gap-1 cursor-pointer"
                                    onClick={(e) => {
                                       setManagerModel(true);
                                    }}
                                 >
                                    <div className="grid gap-2 label items-center min-h-9">
                                       <span className=" w-4 h-4 flex items-center justify-center color-600">
                                          <svg
                                             width={"100%"}
                                             height={"100%"}
                                             fill="none"
                                             stroke="currentColor"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                             <path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
                                          </svg>
                                       </span>
                                       <p className="text-sm leading-4 font-normal color-600">
                                          Assign
                                       </p>
                                    </div>

                                    <div>
                                       <div className={`w-full flex items-center text-sm font-normal min-h-9 color-700 rounded-md pl-1.5 pr-1.5 select-none hover:bg-gray-50 ${error.assign.length > 0 ? 'border-b border-solid border-b-red-700' : ''}`}>
                                          {manager.length > 0 ? (
                                             <div className="border-d6d9de flex items-center gap-2.5 w-fit p-1 pe-2.5 ps-1.5 rounded-3xl">
                                                <div className="h-6 w-6 rounded-full overflow-hidden">
                                                   <Image
                                                      src={
                                                         manager[0]
                                                            ?.profile_path ??
                                                         profile
                                                      }
                                                      alt="profile image"
                                                      className="w-full"
                                                   />
                                                </div>

                                                <div className="text-sm font-semibold text-gray-600">
                                                   <span>
                                                      {manager[0].public_name}
                                                   </span>
                                                </div>
                                             </div>
                                          ) : (
                                             <span className="color-500">
                                                Empty
                                             </span>
                                          )}
                                       </div>
                                    </div>
                                 </li>


                                 <li className="grid grid-project gap-1 cursor-pointer">
                                       <div className="grid gap-2 label items-center min-h-9">
                                          <span className=" w-4 h-4 flex items-center justify-center color-600">
                                             <svg
                                                width={"100%"}
                                                height={"100%"}
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <rect
                                                   width={18}
                                                   height={18}
                                                   x={3}
                                                   y={4}
                                                   rx={2}
                                                   ry={2}
                                                />
                                                <path d="M16 2v4" />
                                                <path d="M8 2v4" />
                                                <path d="M3 10h18" />
                                             </svg>
                                          </span>
                                          <p className="text-sm leading-4 font-normal color-600">
                                             Start Date
                                          </p>
                                       </div>

                                       <div className={`flex items-center ${error.startDate.length > 0 ? 'border-b border-solid border-b-red-700' : ''}`}>
                                          <input
                                             type="date"
                                             ref={date}
                                             name="startDate"
                                             id="start"
                                             className=""
                                             value={startDate}
                                             // value={'1999-09-23'}
                                             onChange={(e) => {
                                                setStartDate(e.target.value);
                                             }}
                                          />
                                       </div>
                                    </li>


                                    <li className="grid grid-project gap-1 cursor-pointer">
                                       <div className="grid gap-2 label items-center min-h-9">
                                          <span className=" w-4 h-4 flex items-center justify-center color-600">
                                             <svg
                                                width={"100%"}
                                                height={"100%"}
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <rect
                                                   width={18}
                                                   height={18}
                                                   x={3}
                                                   y={4}
                                                   rx={2}
                                                   ry={2}
                                                />
                                                <path d="M16 2v4" />
                                                <path d="M8 2v4" />
                                                <path d="M3 10h18" />
                                             </svg>
                                          </span>
                                          <p className="text-sm leading-4 font-normal color-600">
                                             End Date
                                          </p>
                                       </div>

                                       <div className={`flex items-center ${error.endDate.length > 0 ? 'border-b border-solid border-b-red-700' : ''}`}>
                                          <input
                                             type="date"
                                             ref={date}
                                             name="endtDate"
                                             id="start"
                                             className=""
                                             value={endDate}
                                             onChange={(e) => {
                                                setEndDate(e.target.value);
                                             }}
                                          />
                                       </div>
                                    </li>


                                 <li
                                    className="grid grid-project gap-1 cursor-pointer"
                                    onClick={(e) => {
                                       setPriorityModel(true);
                                    }}
                                 >
                                    <div className="grid gap-2 label items-center min-h-9">
                                       <span className=" w-4 h-4 flex items-center justify-center color-600">
                                          <svg
                                             width={"100%"}
                                             height={"100%"}
                                             fill="none"
                                             stroke="currentColor"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <path d="M4 15h13.865a1 1 0 0 0 .768-1.64L15 9l3.633-4.36A1 1 0 0 0 17.865 3H4v18" />
                                          </svg>
                                       </span>
                                       <p className="text-sm leading-4 font-normal color-600">
                                          Priority
                                       </p>
                                    </div>

                                    <div>
                                       <div className="w-full flex items-center text-sm font-normal min-h-9 color-700 rounded-md pl-1.5 pr-1.5 select-none hover:bg-gray-50">
                                          {
                                             <div className="text-sm font-normal capitalize leading-5 flex items-center gap-2 w-full border-none rounded-md text-2a2e34">
                                                <span
                                                   className={`text-base color-${priority} w-4 h-4 flex items-center justify-center`}
                                                >
                                                   <svg
                                                      width={"100%"}
                                                      height={"100%"}
                                                      fill="currentColor"
                                                      stroke="currentColor"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      viewBox="0 0 24 24"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                   >
                                                      <path d="M4 15h13.865a1 1 0 0 0 .768-1.64L15 9l3.633-4.36A1 1 0 0 0 17.865 3H4v18" />
                                                   </svg>
                                                </span>
                                                {priority}
                                             </div>
                                          }
                                       </div>
                                    </div>
                                 </li>

                                 <li
                                    className="grid grid-project gap-1 cursor-pointer"
                                    onClick={(e) => {
                                       setTagModel(true);
                                    }}
                                 >
                                    <div className="grid gap-2 label items-center min-h-9">
                                       <span className=" w-4 h-4 flex items-center justify-center color-600">
                                          <svg
                                             width={"100%"}
                                             height={"100%"}
                                             fill="none"
                                             stroke="currentColor"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <path d="M15.244 21.366a2.164 2.164 0 0 1-3.061 0l-8.549-8.549A2.164 2.164 0 0 1 3 11.287V5.163C3 3.97 3.97 3 5.164 3h6.123c.573 0 1.124.228 1.53.634l8.549 8.549a2.164 2.164 0 0 1 0 3.061l-6.122 6.122z" />
                                             <path d="M6.5 6.5 7 7" />
                                          </svg>
                                       </span>
                                       <p className="text-sm leading-4 font-normal color-600">
                                          Tags
                                       </p>
                                    </div>

                                    <div>
                                       <div className="w-full flex items-center text-sm font-normal min-h-9 color-700 rounded-md pl-1.5 pr-1.5 select-none hover:bg-gray-50">
                                          {selectedTags.length > 0 ? (
                                             <div className="flex items-center gap-1">
                                                {selectedTags?.map(
                                                   (item, inde) => {
                                                      if (inde < 2) {
                                                         return (
                                                            <div
                                                               className="rounded h-5 pt-0.5 pb-0.5 pl-1.5 pr-1.5 gap-1.5 flex items-center justify-center min-w-10 max-w-48"
                                                               style={{
                                                                  backgroundColor:
                                                                     "rgba(13, 43, 56, 0.2)",
                                                               }}
                                                            >
                                                               <span
                                                                  className="inline-flex w-2.5 h-2.5"
                                                                  style={{
                                                                     color: "rgb(13, 43, 56)",
                                                                  }}
                                                               >
                                                                  <svg
                                                                     width={
                                                                        "100%"
                                                                     }
                                                                     height={
                                                                        "100%"
                                                                     }
                                                                     fill="none"
                                                                     stroke="currentColor"
                                                                     strokeLinecap="round"
                                                                     strokeLinejoin="round"
                                                                     strokeWidth={
                                                                        2
                                                                     }
                                                                     viewBox="0 0 24 24"
                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                  >
                                                                     <path d="M15.244 21.366a2.164 2.164 0 0 1-3.061 0l-8.549-8.549A2.164 2.164 0 0 1 3 11.287V5.163C3 3.97 3.97 3 5.164 3h6.123c.573 0 1.124.228 1.53.634l8.549 8.549a2.164 2.164 0 0 1 0 3.061l-6.122 6.122z" />
                                                                     <path d="M6.5 6.5 7 7" />
                                                                  </svg>
                                                               </span>

                                                               <div className="flex-1 h-full">
                                                                  <div
                                                                     className="text-ellipsis overflow-hidden whitespace-nowrap text-xs font-medium h-full leading-4 text-center w-full max-w-full"
                                                                     style={{
                                                                        color: "rgb(13, 43, 56)",
                                                                     }}
                                                                  >
                                                                     {item}
                                                                  </div>
                                                               </div>
                                                            </div>
                                                         );
                                                      }
                                                   }
                                                )}
                                                {selectedTags.length > 2 ? (
                                                   <div
                                                      className="text-xs font-medium leading-4 flex items-center justify-center rounded-xl h-5 minw-5 text-white"
                                                      style={{
                                                         backgroundColor:
                                                            "#cbc9cf",
                                                      }}
                                                   >
                                                      {"+" +
                                                         (selectedTags.length -
                                                            2)}
                                                   </div>
                                                ) : (
                                                   ""
                                                )}
                                             </div>
                                          ) : (
                                             <span className="color-500">
                                                Empty
                                             </span>
                                          )}
                                       </div>
                                    </div>
                                 </li>


                                 <li
                                    className="grid grid-project gap-1 cursor-pointer"
                                    onClick={(e) => {
                                       // setPriorityModel(true);
                                       setFileModel(true);
                                       // setFilePath()
                                    }}
                                 >
                                    <div className="grid gap-2 label items-center min-h-9">
                                       <span className=" w-4 h-4 flex items-center justify-center color-600">
                                             <svg 
                                                width={"1rem"}
                                                height={"1rem"}
                                                className="block"
                                             viewBox="0 0 24 24" fill="currentColor" >
                                                <path  fill-rule="evenodd" d="M14.25 4a3.75 3.75 0 0 0-3.75 3.75V14a1.5 1.5 0 0 0 3 0V8a1 1 0 1 1 2 0v6a3.5 3.5 0 1 1-7 0V7.75a5.75 5.75 0 0 1 11.5 0V14a8 8 0 1 1-16 0V8a1 1 0 0 1 2 0v6a6 6 0 0 0 12 0V7.75A3.75 3.75 0 0 0 14.25 4Z" clip-rule="evenodd"></path>
                                             </svg>
                                       </span>
                                       <p className="text-sm leading-4 font-normal color-600">
                                          Upload Path
                                       </p>
                                    </div>

                                    <div>
                                       <div className="w-full flex items-center text-sm font-normal min-h-9 color-700 rounded-md pl-1.5 pr-1.5 select-none hover:bg-gray-50">
                                          {
                                             <div className="text-sm font-normal capitalize leading-5 flex items-center gap-2 w-full border-none rounded-md text-2a2e34">
                                                {folderPath.substring(folderPath.indexOf(`${projectID}`) + projectID.length) || '\\public'}
                                             </div>
                                          }
                                       </div>
                                    </div>
                                 </li>


                              </ul>

                              <FileBox spaceID={spaceID} projectID={projectID}
                              setAttachment={setAttachment}
                              setDownloadPath={setDownloadPath}
                              downloadPath={downloadPath}
                              />

                           </div>
                        </div>
                     </div>

                     <div className="flex flex-col overflow-hidden">
                        <div className="border-bottom-e8eaed min-h-12 flex items-center p-2 ltr:pl-3 rtl:pr-3 text-xl font-medium leading-6  text-2a2e34 ">
                           <h2>Description</h2>
                        </div>
                        <div className="flex-1 editor-task overflow-hidden">
                           <TextEditor setDesc={setDesc} desc={desc} />
                        </div>
                     </div>
                  </div>

                  <div className="sticky w-full back-nav-side bottom-0 flex items-center justify-between border-top-e8eaed p-4 ltr:pl-6 rtl:pr-6 ">
                     <button
                        className="text-sm font-medium h-8 pl-3 pr-3 rounded-md flex items-center justify-center border-d6d9de hover:bg-zinc-100 bg-white color-700"
                        onClick={(e) => {
                           setModel(false);
                           setTaskInfo({})
                        }}
                     >
                        Cancel
                     </button>
                     {loader ? (
                        <button className="text-sm font-medium h-8 pl-3 pr-3 rounded-md flex items-center justify-center border-transparent button-background text-white">
                           <svg
                              class="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                           >
                              <circle
                                 className="opacity-25"
                                 cx="12"
                                 cy="12"
                                 r="10"
                                 stroke="currentColor"
                                 strokeWidth="4"
                              ></circle>
                              <path
                                 className="opacity-75"
                                 fill="currentColor"
                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                           </svg>
                           Processing...
                        </button>
                     ) : (
                        <button
                           disabled={(manager.length > 0) & (title.trim() !== '') & (startDate.trim() !== '') & (endDate.trim() !== '') & (desc.trim() !== '') ? false : true }
                           className="text-sm relative disabled:cursor-not-allowed disabled:before:absolute disabled:before:w-full disabled:before:h-full disabled:before:top-0 disabled:before:left-0 disabled:before:z-50 disabled:before:bg-gray-50/20 font-medium h-8 pl-3 pr-3 rounded-md flex items-center justify-center border-transparent button-background text-white"
                           onClick={(e) => {
                              if(process === 'add')
                              createTask({space_id,projectID,title,state,manager:manager[0].user_id,priority,selectedTags,phases,startDate,endDate,desc,folderPath,setNotification,setLoader,setModel,spaceID,referesh,setReferesh,attachment,downloadPath });
                              else
                              updateTask({space_id,projectID,title,state,manager:manager[0].user_id,priority,selectedTags,phases,startDate,endDate,desc,folderPath,taskID:taskInfo.task_id,setNotification,setLoader,setModel,spaceID,referesh,setReferesh });
                           }}
                        >
                           Continue
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </ModelOverlay>

         {/* {spaceModel && (
            <SpaceModel
               setSpaceModel={setSpaceModel}
               setSpaceID={setSpace_id}
               spaceID={space_id}
            />
         )} */}
         
         {managerModel && (
            <ManagerModel
               setManagerModel={setManagerModel}
               setManager={setManager}
               manager={manager}
               spaceID={spaceID}
            />
         )}
         {priorityModel && (
            <PriorityModel
               setPriorityModel={setPriorityModel}
               setPriority={setPriority}
               priority={priority}
            />
         )}
         {tagModel && (
            <TagModel
               setTagModel={setTagModel}
               selectedTags={selectedTags}
               setSelectedTags={setSelectedTags}
               spaceID={spaceID}
               projectID={projectID}
            />
         )}

         {fileModel && (
            <FileModel
               setFileModel={setFileModel}
               spaceID={spaceID}
               projectID={projectID}
               setFolderID={setFolderID}
               setFolderPath={setFolderPath}
               setFolderName={setFolderName}
            />
         )}

         {
            notification && <SuccessNotification setNotification={setNotification} >task <strong> {title} </strong> has been created Successfully. </SuccessNotification>
         }
      </>
   );
}







