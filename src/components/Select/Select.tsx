"use client";

import { CSSProperties, FC, useEffect, useState } from "react";
import styles from "./Select.module.scss";

interface SelectOption {
  value: string;
  label: string;
  image: string;
  contractAddress?: `0x${string}`;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (option: SelectOption) => void;
  defaultValue?: string;
  className?: string;
}

const DownArrow = ({ style }: { style?: CSSProperties }) => {
  return (
    <svg
      className={styles.svg}
      style={style}
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.7081 1.70757L11.7081 11.7076C11.6152 11.8005 11.5049 11.8743 11.3835 11.9246C11.2621 11.975 11.132 12.0009 11.0006 12.0009C10.8691 12.0009 10.739 11.975 10.6176 11.9246C10.4962 11.8743 10.3859 11.8005 10.2931 11.7076L0.293056 1.70757C0.105415 1.51993 0 1.26543 0 1.00007C0 0.734704 0.105415 0.480208 0.293056 0.292567C0.480697 0.104927 0.735192 -0.000488281 1.00056 -0.000488281C1.26592 -0.000488281 1.52042 0.104927 1.70806 0.292567L11.0006 9.58632L20.2931 0.292567C20.386 0.199657 20.4963 0.125957 20.6177 0.0756741C20.7391 0.0253914 20.8692 -0.000488281 21.0006 -0.000488281C21.132 -0.000488281 21.2621 0.0253914 21.3835 0.0756741C21.5048 0.125957 21.6151 0.199657 21.7081 0.292567C21.801 0.385477 21.8747 0.495778 21.9249 0.617171C21.9752 0.738564 22.0011 0.868673 22.0011 1.00007C22.0011 1.13146 21.9752 1.26157 21.9249 1.38296C21.8747 1.50436 21.801 1.61466 21.7081 1.70757Z"
        fill="white"
      />
    </svg>
  );
};

const CloseSvg = () => {
  return (
    <svg
      className={styles.svg}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5605 2.5618L9.62039 7.5L14.5605 12.4382C14.6998 12.5775 14.8104 12.743 14.8858 12.9251C14.9612 13.1071 15 13.3023 15 13.4993C15 13.6964 14.9612 13.8915 14.8858 14.0736C14.8104 14.2557 14.6998 14.4211 14.5605 14.5605C14.4211 14.6998 14.2557 14.8104 14.0736 14.8858C13.8915 14.9612 13.6964 15 13.4993 15C13.3023 15 13.1071 14.9612 12.9251 14.8858C12.743 14.8104 12.5775 14.6998 12.4382 14.5605L7.5 9.62039L2.5618 14.5605C2.42245 14.6998 2.25702 14.8104 2.07495 14.8858C1.89288 14.9612 1.69774 15 1.50067 15C1.3036 15 1.10846 14.9612 0.926386 14.8858C0.744317 14.8104 0.578884 14.6998 0.439534 14.5605C0.300185 14.4211 0.189646 14.2557 0.114231 14.0736C0.0388152 13.8915 0 13.6964 0 13.4993C0 13.3023 0.0388152 13.1071 0.114231 12.9251C0.189646 12.743 0.300185 12.5775 0.439534 12.4382L5.37961 7.5L0.439534 2.5618C0.158105 2.28037 0 1.89867 0 1.50067C0 1.10267 0.158105 0.720964 0.439534 0.439534C0.720964 0.158105 1.10267 0 1.50067 0C1.89867 0 2.28037 0.158105 2.5618 0.439534L7.5 5.37961L12.4382 0.439534C12.5775 0.300185 12.743 0.189646 12.9251 0.114231C13.1071 0.0388152 13.3023 0 13.4993 0C13.6964 0 13.8915 0.0388152 14.0736 0.114231C14.2557 0.189646 14.4211 0.300185 14.5605 0.439534C14.6998 0.578884 14.8104 0.744317 14.8858 0.926386C14.9612 1.10846 15 1.3036 15 1.50067C15 1.69774 14.9612 1.89288 14.8858 2.07495C14.8104 2.25702 14.6998 2.42245 14.5605 2.5618Z"
        fill="white"
      />
    </svg>
  );
};

export const Select: FC<SelectProps> = ({
  value,
  options,
  onChange,
  className,
}) => {
  const [option, setOption] = useState(() => {
    if (value) {
      return options.find((option) => option.value === value);
    }
    return options[0];
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSelect = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    setOption(options.find((option) => option.value === value));
  }, [value, onChange, options]);

  return (
    <div className={styles.selectContainer}>
      <div
        className={styles.select}
        onClick={handleToggleSelect}
        style={
          isOpen
            ? {
                borderBottom: "none",
              }
            : {}
        }
      >
        <div className={styles.titleContainer}>
          {option?.image && <img src={option?.image} alt={option.value} />}
          <span>{option?.label}</span>
        </div>
        <div>{isOpen ? <CloseSvg /> : <DownArrow />}</div>
      </div>
      {isOpen && (
        <div className={styles.optionsContainer}>
          <svg
            className={styles.lineSvg}
            viewBox="0 0 330 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 1.5H256L266.5 12L276 1.5H329.5"
              stroke="url(#paint0_linear_165_628)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="paint0_linear_165_628"
                x1="1"
                y1="0.999842"
                x2="330"
                y2="0.999804"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F56121" stopOpacity="0" />
                <stop offset="0.799" stopColor="#F56121" />
                <stop offset="1" stopColor="#F56121" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.optionContainer} ${option.value === value && styles.active} `}
            >
              <div
                className={styles.option}
                onClick={() => {
                  if (value === undefined) {
                    setOption(option);
                  }
                  onChange?.(option);
                  setIsOpen(false);
                }}
              >
                {option.image && <img src={option.image} alt={option.value} />}
                <span>{option.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
