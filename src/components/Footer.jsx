import React from "react";
import { Divider } from "./Divider";

export const Footer = () => {
  return (
    <>
      <div className="mt-4">
        <Divider />
        <div className="text-white mt-2 h-full text-sm lg:h-[200px] lg:leading-9 lg:space-x-64 w-full lg:flex justify-center items-center">
          <div className="mb-4">
            <p className="underline">CONTACT</p>
            <a className="" href="">
              Dreammovies@gmail.com
            </a>
            <p>Contact +91987654321</p>
          </div>
          <div className="mb-4">
            <p className="">@2024 Dream Movies</p>
            <h1 className="tracking-widest">Desinged By Hellfire</h1>
          </div>
          <div className="mb-4">
            <p className="underline">ABOUT</p>
            <p>Best Movie view Experience</p>
            <p className="">We have to make smooth user intractions</p>
          </div>
        </div>
      </div>
    </>
  );
};
