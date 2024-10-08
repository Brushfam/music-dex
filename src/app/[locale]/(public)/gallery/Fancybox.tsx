import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { OptionsType } from "@fancyapps/ui/types/Fancybox/options";
import { PropsWithChildren, useEffect, useRef } from "react";
import s from "./Gallery.module.scss";

interface Props {
  options?: Partial<OptionsType>;
  delegate?: string;
}

function Fancybox(props: PropsWithChildren<Props>) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return (
    <div ref={containerRef} className={s.fancybox}>
      {props.children}
    </div>
  );
}

export default Fancybox;
