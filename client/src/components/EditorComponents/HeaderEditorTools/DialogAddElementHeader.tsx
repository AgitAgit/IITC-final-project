import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Switch } from "../../ui/switch";
import { useState } from "react";
import BtnIcon from "../../../assets/button.png";
import SocialLinksIcon from "../../../assets/share.png";
import LanguageIcon from "../../../assets/internet.png";
import AccountIcon from "../../../assets/user.png";
import CartIcon from "../../../assets/shopping-cart.png";

// Define preferences type
type Preferences = {
  [key: string]: boolean;
};
export const DialogAddElementHeader: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    Account: true, //
    "Social Links": true,
  });

  const handleToggle = (key: string): void => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Dialog
      onOpenChange={(isOpen: boolean) =>
        console.log("Dialog open state:", isOpen)
      }
    >
      <DialogTrigger asChild>
        <button className="flex font-bold items-center gap-2 bg-gray-100 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm">
          <Plus size={26} />
          <span className="font-medium">Add Elements</span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="absolute top-full mt-2 left-0 w-auto bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col p-10 min-w-[300px]"
        style={{
          transform: "none",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-start">
            <h1 className="font-bold">Add Elements</h1>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Element: Button */}
          <div className="flex items-center justify-between py-2 border-b border-gray-200 gap-8 md:gap-[180px]">
            <div className="flex items-center gap-4">
              <img src={BtnIcon} alt="Button" className="w-5 h-5" />
              <label htmlFor="Button" className="font-medium">
                Button
              </label>
            </div>
            <Switch
              id="Button"
              checked={preferences["Button"] || false}
              onCheckedChange={() => handleToggle("Button")}
              className={preferences["Button"] ? "bg-green-400" : ""}
            />
          </div>
          {/* Element: Social Links */}
          <div className="flex items-center justify-between py-2 border-b border-gray-200 gap-8 md:gap-12">
            <div className="flex items-center gap-4">
              <img
                src={SocialLinksIcon}
                alt="Social Links"
                className="w-5 h-5"
              />
              <label htmlFor="Social Links" className="font-medium">
                Social Links
              </label>
            </div>
            <Switch
              id="Social Links"
              checked={preferences["Social Links"] || false}
              onCheckedChange={() => handleToggle("Social Links")}
              className={preferences["Social Links"] ? "bg-green-400" : ""}
            />
          </div>
          {/* Element: Cart */}
          <div className="flex items-center justify-between py-2 border-b border-gray-200 gap-8 md:gap-12">
            <div className="flex items-center gap-4">
              <img src={CartIcon} alt="Cart" className="w-5 h-5" />
              <label htmlFor="Cart" className="font-medium">
                Cart
              </label>
            </div>
            <Switch
              id="Cart"
              checked={preferences["Cart"] || false}
              onCheckedChange={() => handleToggle("Cart")}
              className={preferences["Cart"] ? "bg-green-400" : ""}
            />
          </div>
          {/* Element: Account */}
          <div className="flex items-center justify-between py-2 border-b border-gray-200 gap-8 md:gap-12">
            <div className="flex items-center gap-4">
              <img src={AccountIcon} alt="Account" className="w-5 h-5" />
              <label htmlFor="Account" className="font-medium">
                Account
              </label>
            </div>
            <Switch
              id="Account"
              checked={preferences["Account"] || false}
              onCheckedChange={() => handleToggle("Account")}
              className={preferences["Account"] ? "bg-green-400" : ""}
            />
          </div>
          {/* Element: Language Switch */}
          <div className="flex items-center justify-between py-2 border-b border-gray-200 gap-8 md:gap-12">
            <div className="flex items-center gap-4">
              <img
                src={LanguageIcon}
                alt="Language Switch"
                className="w-5 h-5"
              />
              <label htmlFor="Language Switch" className="font-medium">
                Language Switch
              </label>
            </div>
            <Switch
              id="Language Switch"
              checked={preferences["Language Switch"] || false}
              onCheckedChange={() => handleToggle("Language Switch")}
              className={preferences["Language Switch"] ? "bg-green-400" : ""}
            />
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
