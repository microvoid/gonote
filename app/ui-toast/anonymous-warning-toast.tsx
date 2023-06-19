"use client";

import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { useSession } from "next-auth/react";
import useLocationStorage from "use-local-storage";

export const AnonymouseWarningToast = () => {
  const [isOpened, setIsAlreadyOpened] = useLocationStorage(
    "AnonymouseWarningToast.open",
    false
  );

  const [open, setOpen] = React.useState(false);
  const session = useSession();

  React.useEffect(() => {
    if (isOpened) {
      return;
    }

    if (session.data?.user?.name === "anonymous") {
      setOpen(true);
    }
  }, [session, isOpened]);

  return (
    <Toast.Root
      className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
      open={open}
      onOpenChange={open => {
        setIsAlreadyOpened(true);
        setOpen(open);
      }}
      duration={3000}
    >
      <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
        Anonymouse User Warning
      </Toast.Title>
      <Toast.Description asChild>
        <div className="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]">
          If login expires, you may not be able to retrieve your data.
        </div>
      </Toast.Description>
      <Toast.Action
        className="[grid-area:_action]"
        asChild
        altText="Goto schedule to undo"
      >
        <button className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-primary shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
          Ok
        </button>
      </Toast.Action>
    </Toast.Root>
  );
};
