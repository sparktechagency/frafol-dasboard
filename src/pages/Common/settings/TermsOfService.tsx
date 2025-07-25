import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import ReuseButton from "../../../ui/Button/ReuseButton";

const TermsOfService = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleOnSave = () => {
    console.log("Saved PP");
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Terms of Service
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-[95%]">
          <div className=" mb-10">
            <JoditEditor
              ref={editor}
              value={content}
              config={{ height: 500, theme: "light", readonly: false }}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <ReuseButton variant="secondary" onClick={handleOnSave}>
            Save
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};
export default TermsOfService;
