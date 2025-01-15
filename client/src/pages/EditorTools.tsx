import { DialogAddElementHeader } from "../components/EditorComponents/HeaderEditorTools/DialogAddElementHeader";
import { DialogEditHeader } from "../components/EditorComponents/HeaderEditorTools/DialogEditHeader";
import EditElement from "../components/EditorComponents/Element/EditElementBox/EditElement";
import { DialogAddElement } from "../components/EditorComponents/Element/DialogAddElements";
import EditText from "../components/EditorComponents/Element/EditText/EditText";

const FakeEditor = () => {
  return (
    <div>
      {/* <DialogAddElementHeader /> */}
      {/* <DialogEditHeader /> */}
      <EditElement />
      <EditText />
      <DialogAddElement />
    </div>
  );
};

export default FakeEditor;
