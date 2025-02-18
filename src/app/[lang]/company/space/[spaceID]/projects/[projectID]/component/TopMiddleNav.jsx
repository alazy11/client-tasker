"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopMiddleNav ({children,spaceID, setEmployee, projectID,setSetting, active = false}) {

   let path = usePathname();

   return (
      <div>
      <div className='pe-4 ps-4 min-h-12 border-bottom-e8eaed flex'>
         <div className='flex items-center flex-grow'>
            <ul className='flex self-stretch gap-1'>
               <li className='flex items-center'>
                  <Link href="#" className={`relative h-7 w-full rounded-md ps-1.5 pe-1.5 flex top-item items-center gap-1 hover:bg-gray-100 ${path === `/en/company/space/${spaceID}/projects/${projectID}` ? 'active' : ''}`}>
                     <span className='w-4 h-4 text-656f7d'>
                     <svg width={'100%'} height={'100%'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3h7v9H3z"></path>
<path d="M14 3h7v5h-7z"></path>
<path d="M14 12h7v9h-7z"></path>
<path d="M3 16h7v5H3z"></path>
</svg>
                     </span>
                     <span className='text-ellipsis whitespace-nowrap text-sm font-medium text-656f7d'>
                        Overview
                     </span>
                  </Link>
               </li>

               <li className='flex items-center'>
                  <Link href={`/en/company/space/${spaceID}/projects/${projectID}/folders`} className={`relative h-7 w-full rounded-md ps-1.5 pe-1.5 flex top-item items-center gap-1 hover:bg-gray-100 ${path === `/en/company/space/${spaceID}/projects/${projectID}/folders` ? 'active' : ''}`}>
                     <span className='w-4 h-4 text-656f7d'>
                     <svg width={'100%'} height={'100%'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.334 19.5H3.694A.693.693 0 0 1 3 18.806V7.5h17.25a.75.75 0 0 1 .75.75v10.584a.665.665 0 0 1-.666.666Z"></path>
  <path d="M9.225 4.378 12 7.5H3V4.875a.75.75 0 0 1 .75-.75h4.912a.75.75 0 0 1 .563.253Z"></path>
</svg>
                     </span>
                     <span className='text-ellipsis whitespace-nowrap text-sm font-medium text-656f7d'>
                        Folders
                     </span>
                  </Link>
               </li>

               <li className='flex items-center'>
                  <Link href={`/en/company/space/${spaceID}/projects/${projectID}/task`} className={`relative h-7 w-full rounded-md ps-1.5 pe-1.5 flex top-item items-center gap-1 hover:bg-gray-100 ${path === `/en/company/space/${spaceID}/projects/${projectID}/task` ? 'active' : ''}`} >
                     <span className='w-4 h-4 text-656f7d'>
                     <svg width={'100%'} height={'100%'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 10H3" />
    <path d="M21 6H3" />
    <path d="M21 14H3" />
    <path d="M17 18H3" />
</svg>
                     </span>
                     
                     <span className='text-ellipsis whitespace-nowrap text-sm font-medium text-656f7d'>
                        Tasks
                     </span>
                  </Link>
               </li>


               <li className='flex items-center'>
                  <Link href={`/en/company/space/${spaceID}/projects/${projectID}/plan`} className={`relative h-7 w-full rounded-md ps-1.5 pe-1.5 flex top-item items-center gap-1 hover:bg-gray-100 ${path === `/en/company/space/${spaceID}/projects/${projectID}/plan` ? 'active' : ''}`} >
                     <span className='w-4 h-4 text-656f7d'>
                     <svg width={'100%'} height={'100%'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
</svg>
                     </span>

                     <span className='text-ellipsis whitespace-nowrap text-sm font-medium text-656f7d'>
                        Plan
                     </span>
                  </Link>
               </li>

               <li className='flex items-center'>
                  <Link href={`/en/company/space/${spaceID}/projects/${projectID}/event`} className={`relative h-7 w-full rounded-md ps-1.5 pe-1.5 flex top-item items-center gap-1 hover:bg-gray-100 ${path === `/en/company/space/${spaceID}/projects/${projectID}/event` ? 'active' : ''}`} >
                     <span className='w-4 h-4 text-656f7d'>
                     <svg width={'100%'} height={'100%'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
</svg>
                     </span>

                     <span className='text-ellipsis whitespace-nowrap text-sm font-medium text-656f7d'>
                        Events
                     </span>
                  </Link>
               </li>

               <li className='flex items-center'>
                  <Link href={`/en/company/space/${spaceID}/projects/${projectID}/timeline`} className={`relative h-7 w-full rounded-md ps-1.5 pe-1.5 flex top-item items-center gap-1 hover:bg-gray-100 ${path === `/en/company/space/${spaceID}/projects/${projectID}/timeline` ? 'active' : ''}`} >
                     <span className='w-4 h-4 text-656f7d'>
                     <svg width={'100%'} height={'100%'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 21v-7" />
    <path d="M4 10V3" />
    <path d="M12 21v-9" />
    <path d="M12 8V3" />
    <path d="M20 21v-5" />
    <path d="M20 12V3" />
    <path d="M1 14h6" />
    <path d="M9 8h6" />
    <path d="M17 16h6" />
</svg>
                     </span>

                     <span className='text-ellipsis whitespace-nowrap text-sm font-medium text-656f7d'>
                        Timeline
                     </span>
                  </Link>
               </li>

            </ul>
            <div>

            </div>
         </div>
         <div className='flex items-center' >
            <ul className='flex self-stretch gap-1'>

               <li className='flex items-center'>
                  <button className='relative bg-transparent border-0 h-7 w-full rounded-md ps-1.5 pe-1.5 flex items-center gap-1 hover:bg-gray-100 '>
                     <span className='w-4 h-4 text-656f7d'>
                     <svg width={'100%'} height={'100%'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z"></path>
<path d="m21 21-4.35-4.35"></path>
</svg>
                     </span>
                     <span className='text-ellipsis whitespace-nowrap text-sm font-medium text-656f7d'>
                        Search
                     </span>
                  </button>
               </li>

               <li className='flex items-center'>
                  <button className='relative backgroung-f2f1fe border-0 h-7 w-full rounded-md ps-1.5 pe-1.5 flex items-center gap-1 hover:bg-gray-100'>
                     <span className='w-4 h-4 color-544dc9'>
                     <svg width={'100%'} height={'100%'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M21 19H9"></path>
<path d="M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
<path d="M3 19h2"></path>
<path d="M21 12h-2"></path>
<path d="M17 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
<path d="M3 12h12"></path>
<path d="M21 5H11"></path>
<path d="M9 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
<path d="M3 5h4"></path>
</svg>
                     </span>
                     <span className='text-ellipsis whitespace-nowrap text-sm font-medium color-544dc9'>
                        Hide
                     </span>
                  </button>
               </li>

               <li className='flex items-center'>
                  {/* setting-active */}
                  <button className='relative bg-transparent border-0 h-7 w-full rounded-md ps-1.5 pe-1.5 flex items-center gap-1 hover:bg-gray-100' onClick={(e)=>{
                     setSetting(true)
                  }}>
                     <span className='w-4 h-4 text-656f7d'>
                     <svg width={'100%'} height={'100%'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12.296 9.015a3 3 0 1 0-.59 5.97 3 3 0 0 0 .59-5.97v0ZM19.518 12a7.238 7.238 0 0 1-.072.975l2.12 1.662a.507.507 0 0 1 .114.644l-2.005 3.469a.507.507 0 0 1-.615.215l-2.105-.847a.753.753 0 0 0-.711.082 7.703 7.703 0 0 1-1.01.588.747.747 0 0 0-.413.569l-.316 2.244a.519.519 0 0 1-.5.43h-4.01a.52.52 0 0 1-.501-.415l-.315-2.242a.753.753 0 0 0-.422-.573 7.278 7.278 0 0 1-1.006-.59.75.75 0 0 0-.708-.08l-2.105.848a.507.507 0 0 1-.616-.215L2.32 15.295a.506.506 0 0 1 .114-.644l1.792-1.406a.752.752 0 0 0 .28-.66 6.392 6.392 0 0 1 0-1.165.75.75 0 0 0-.284-.654L2.431 9.36a.507.507 0 0 1-.111-.641L4.325 5.25a.507.507 0 0 1 .616-.215l2.105.847a.755.755 0 0 0 .71-.082 7.71 7.71 0 0 1 1.01-.587.747.747 0 0 0 .414-.57L9.495 2.4a.52.52 0 0 1 .5-.43h4.01a.52.52 0 0 1 .502.416l.315 2.241a.753.753 0 0 0 .421.573c.351.17.687.366 1.006.59a.75.75 0 0 0 .709.08l2.104-.848a.507.507 0 0 1 .616.215l2.005 3.469a.506.506 0 0 1-.115.644l-1.791 1.406a.752.752 0 0 0-.284.66c.016.195.026.39.026.585Z"></path>
</svg>
                     </span>
                     <span className='text-ellipsis whitespace-nowrap text-sm font-medium text-656f7d'>
                        Settings
                     </span>
                  </button>
               </li>

               <li className='flex items-center'>
                  <div className='seperate'></div>
               </li>

               <li className='flex items-center'>

                  <button
                  disabled={active}
                  className='flex items-center h-6 ps-2 pe-2 relative rounded text-xs button-background text-white font-medium gap-1 disabled:cursor-not-allowed disabled:before:absolute disabled:before:w-full disabled:before:h-full disabled:before:top-0 disabled:before:left-0 disabled:before:z-50 disabled:before:bg-gray-50/20' 
                  onClick={(e)=>{
                     setEmployee(true);
                  }}>
                     {children}
                     <span className='w-4 h-4 text-white'>
                     <svg width={'100%'} height={'100%'} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5.25v13.5"></path>
<path d="M18.75 12H5.25"></path>
</svg>
                     </span>
                  </button>

                  {/* {
                     model &&
                     <LinkddSpace user={user} spaceHandler={spaceHandler} setModel={setModel} spaceInfo={{}} />
                  } */}

               </li>

            </ul>
         </div>
      </div>
   </div>
   );

}