"use clinet";

import React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

export type ToastRef = {
  show: () => void;
  hide: () => void;
};

export type ToastProps = React.PropsWithChildren<ToastPrimitive.ToastProps>;

export const ToastProvier = ToastPrimitive.Provider;
export const ToastViewport = ToastPrimitive.Viewport;

export const Toast = React.forwardRef<ToastRef, ToastProps>(
  (props, forwardedRef) => {
    const { children, ...toastProps } = props;

    return (
      <>
        <ToastPrimitive.Root
          className="rounded-md shadow-xl border p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          {...toastProps}
        >
          <ToastPrimitive.Description>{children}</ToastPrimitive.Description>
        </ToastPrimitive.Root>
      </>
    );
  }
);
