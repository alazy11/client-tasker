"use client";
import ModelOverlay from "@/app/[lang]/component/ModelOverlay";


export default function RenameSpace({setRename}) {
    return (
        <ModelOverlay showModel={setRename}>
        <div
           className={`bg-white w-480px h-auto flex flex-col rounded-xl overflow-hidden relative z-2000 rename-space`}
           role="dialog"
        style = {{backgroundColor:'var(--cu-background-subtle)'}}
        >
           <div className="w-full h-full">

            <div className="cu-create-project-modal__title relative">
            Edit Space name

            <button className="cu-modal__close">
                <span>
                <svg width={"100%"} height={"100%"} className="block" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd" strokeLinecap="round" strokeWidth="2.5"><path d="m2 2 20 20M22 2 2 22"></path></g></svg>
                </span>
            </button>

            </div>

            <div className="cu-create-project-modal__body">

                <div className="cu-form__label">
                    Space name
                </div>

                <div className="cu-form__field">
                    <input type="text" className="cu-form__input"
                    placeholder="Enter Space name"
                    />
                </div>

            </div>

            </div>
            </div>
            </ModelOverlay>
    )
}