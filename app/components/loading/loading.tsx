import Image from "next/image";
import React from "react";
import loadingSpinenr from "../../../public/loading-spinner.svg";
import s from "./loading.module.scss"; // Adjust the path as needed

const Loading = () => {
  return (
    <div className={s["Loading-container"]}>
      <div>
        <p className={s["Loading-container__heading"]}>Loading...</p>
        <Image src={loadingSpinenr} height={200} width={200} alt="" />
      </div>
    </div>
  );
};

export default Loading;
