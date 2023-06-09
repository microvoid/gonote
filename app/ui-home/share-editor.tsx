import { MarktionEditor } from "../ui-editor";

export function ShareEditor(props: { basicContent?: string }) {
  return (
    <div className="h-[600px] p-5 mx-auto md:w-[768px] sm:w-3/4">
      <MarktionEditor basicContent={props.basicContent} />
    </div>
  );
}

export default ShareEditor;
