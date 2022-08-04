import React, { forwardRef, useState } from "react";

const Button = forwardRef(function Button(props, ref) {
  const [promisePending, setPromisePending] = useState(false);
  const {
    children,
    startIcon,
    endIcon,
    loading,
    onClick,
    ...restProps
  } = props;

  const handleClick = (e) => {
    const promise = onClick?.(e);
    if (!promise) return;
    setPromisePending(true);
    promise.finally(() => setPromisePending(false));
  };

  const startIconElement = startIcon ? <div>{startIcon}</div> : null;
  const endIconElement = endIcon ? <div>{endIcon}</div> : null;
  const buttonTextElement = <div>{children}</div>;

  const isLoading = !!loading || promisePending;
  return (
    <button
      {...restProps}
      ref={ref}
      onClick={handleClick}
    >
      {startIconElement}
      {buttonTextElement}
      {endIconElement}
    </button>
  );
});

export { Button };
