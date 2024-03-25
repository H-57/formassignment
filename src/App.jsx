import ProductCard from "./components/ProductCard";
import { useForm } from "react-hook-form"
import { productData,Country } from "../staticData";
import Alert from "./components/Alert";
// import { useProducts } from "./context/productContext";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

import {  toast } from 'react-toastify';

function App() {
  // const { products, updateProducts, Total } = useProducts();

  const {Total,products} = useSelector((state) => state.productsReducer);

  const {register,handleSubmit,watch,formState: { errors },reset} = useForm()


  const onSubmit = async(data) => {
  const result=await(await  fetch(`${import.meta.env.VITE_Host}/form`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },body:JSON.stringify({...data,products})
    })).json()

  if(result.success){
    toast.success(result.message)
    reset()
  }else{
    toast.error(result.message)
  }


   
  }


  
  return (
    <>
 
    <span className="hidden bg-red-400/40"></span>
      <section className="bg-white mx-auto mt-10 md:w-fit px-10 rounded-md shadow-md">
        <h2 className=" py-5">My Products </h2>
        <section className=" flex md:flex-row mx-auto gap-5 flex-col items-center">
          {productData.map((item, index) => (
            <ProductCard key={item.title} {...item}  />
          ))}
        </section>
        <hr className="my-5   " />
        <div className="flex justify-end gap-14 font-semibold ">
          <span>Total</span>
          <span>${Total}</span>
        </div>
        {/* form section */}
        <section className="mb-10 pb-10 mt-20">
          <h2 className="text-3xl font-bold ">Product Order Form</h2>
          <p className="font-semibold text-gray-500">
            Please make sure to fill in the required fields and submit this form
            to complete your
          </p>
          <p className="font-semibold text-gray-500">order.</p>
          <form noValidate={true}  className="mt-20 overflow-hidden w-[100%] " onSubmit={handleSubmit(onSubmit)}>
            <div className={`focus-within:bg-blue-300/20 px-4  rounded-sm  my-5 ${errors.firstName?"focus-within:bg-red-400/40 bg-red-400/40":""} `}>
              <p  className="pb-3">
               
                Full Name
              </p>
              <div className="flex gap-5   ">
                <span className=" flex flex-col md:w-[50%] w-[48%]  ">
                  <input
                    type="text"
                    {...register("firstName", { required: "name is required" })}
                    className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 "
                  />
                  <label className=" text-xs mt-3 ">First Name</label>
                </span>
                <span className="flex flex-col md:w-[50%]  w-[48%] ">
                  <input
                    type="text"
                    {...register("lastName")}
                    className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2"
                  />
                  <label className="text-xs mt-3  ">last Name</label>
                </span>
              </div>
             {errors.firstName&& <Alert message={errors.firstName.message}/>}
            </div>
            <div className={`focus-within:bg-blue-300/20 px-4  rounded-sm  my-5 ${errors.email?"focus-within:bg-red-400/40 bg-red-400/40":""}`}>
              <p  className="mb-3"> E-mail </p>
              <span className=" flex flex-col grow">
                <input
                formNoValidate={true}
                  type="email"
                  {...register("email",{ pattern: {value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,message:"Please enter a valid email"},required:"email is required" })}
                  placeholder="ex:myname2example.com"
                  className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 md:w-[49%]"
                />
                <label className=" text-xs mt-3">example@example.com</label>
              </span>
              {errors.email&& <Alert message={errors.email.message}/>}
            </div>
            <div className={`focus-within:bg-blue-300/20 px-4  rounded-sm  my-5 ${errors.number?"focus-within:bg-red-400/40 bg-red-400/40":""}`}>
              <p  className="mb-3"> Contact Number </p>
              <span className=" flex flex-col grow">
                <input
                  type="number"
                  {...register("number", { required: "enter a mobile number",pattern:{value:/^(\+\d{1,3}[- ]?)?\d{10}$/,message:"please enter a valid number"}})}
                  placeholder="(000)000-0000"
                  className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 md:w-[49%]"
                />
              </span>
              {errors.number&& <Alert message={errors.number.message}/>}
            </div>

            <div className={`focus-within:bg-blue-300/20 px-4  rounded-sm  my-5 ${errors.address?"focus-within:bg-red-400/40 bg-red-400/40":""}`}>
              <p  className="mb-3">Billing Address </p>
              <span className=" flex flex-col grow ">
                
                <input
                  type="text"
                  {...register("address", { required: "enter a address fields" })}
                  className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 "
                />
                <label className=" text-xs mt-3">Street Address</label>
                <input
                  type="text"
                  {...register("address2")}
                  className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-8"
                />
                <label className=" text-xs mt-3">Street Address Line 2</label>
                <div className="flex gap-3  ">
                  <span className=" flex flex-col grow  md:w-[50%] w-[48%]">
                    <input
                      type="text"
                      {...register("city")}
                      className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-8"
                    />
                    <label className=" text-xs mt-3">City</label>
                  </span>
                  <span className="flex flex-col grow   md:w-[50%] w-[48%]">
                    <input
                      type="text"
                      {...register("state")}
                      className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-8"
                    />
                    <label className="text-xs mt-3">State / Province</label>
                  </span>
                </div>
                <div className="flex gap-3  ">
                  <span className=" flex flex-col grow  md:w-[50%] w-[48%]">
                    <input
                      type="text"
                      {...register("zip")}
                      className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-8"
                    />
                    <label className=" text-xs mt-3">Postal / Zip Code</label>
                  </span>
                  <span className="flex flex-col grow  md:w-[50%] w-[48%] ">
                    <select
                      type="text"
                      {...register("country")}
                      className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-8 bg-white"
                    
                    >
                      {Country.map((country) => (
                        <option value={country}>{country}</option>
                      ))}
                      </select>
                    <label className="text-xs mt-3"> Country</label>
                  </span>
                </div>
              </span>
              {errors.address&& <Alert message={errors.address.message}/>}
            </div>

            <div className="flex flex-col focus-within:bg-blue-300/20 px-4 my-5 rounded-sm ">
              <p>Is shipping address same as billing address?</p>
              <span>
                <input
                  type="radio"
                  id="yes"
                  {...register("same", { required: true })}
                  value={"yes"}
                  name="same"
                  className="border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-4"
                />
                Yes
              </span>
              <span>
                {" "}
                <input
                  type="radio"
                  id="no"
                  {...register("same", { required: true })}
                  value={"no"}
                  name="same"
                  className="border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-4"
                />
                No
              </span>
            </div>

        { watch("same")=="yes"&&   <div className="focus-within:bg-blue-300/20 px-4 my-5 rounded-sm ">
              <label htmlFor="">Shipping Address </label>
              <span className=" flex flex-col grow">
                <input
                  type="text"
                  {...register("shipaddress")}
                  className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-4  "
                />
                <label className=" text-xs mt-3">Street Address</label>
                <input
                  type="text"
                  {...register("shipaddress2")}
                  className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2  mt-8"
                />
                <label className=" text-xs mt-3">Street Address Line 2</label>
                <div className="flex gap-3  ">
                  <span className=" flex flex-col grow  md:w-[50%] w-[48%]">
                    <input
                      type="text"
                      {...register("shipcity")}
                      className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-8"
                    />
                    <label className=" text-xs mt-3">City</label>
                  </span>
                  <span className="flex flex-col grow  md:w-[50%] w-[48%] ">
                    <input
                      type="text"
                      {...register("shipstate")}
                      className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-8"
                    />
                    <label className="text-xs mt-3">State / Province</label>
                  </span>
                </div>
                <div className="flex gap-3  ">
                  <span className=" flex flex-col grow">
                    <input
                      type="text"
                      {...register("shipzip")}
                      className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2 mt-8 "
                    />
                    <label className=" text-xs mt-3">Postal / Zip Code</label>
                  </span>
                </div>
              </span>
            </div>}

            <div className="flex flex-col focus-within:bg-blue-300/20 px-4 my-5 rounded-sm">
              <p className="mb-3">Send Gift? </p>
              <span>
                <input
                  type="radio"
                  id="yes"
                  {...register("gift", { required: true })}
                  value={"yes"}
                  name="gift"
                  className="border hover:ring-2 ring-blue-200 rounded-sm p-2"
                />
                Yes
              </span>
              <span>
                {" "}
                <input
                  type="radio"
                  id="no"
                  {...register("gift", { required: true })}
                  value={"no"}
                  name="gift"
                  className="border hover:ring-2 ring-blue-200 rounded-sm p-2"
                />
                No
              </span>
            </div>

     { watch('gift')=="yes"&&     <div className="focus-within:bg-blue-300/20 px-4 my-5 rounded-sm">
              <p className="mb-3"> Recipient's Full Name </p>
              <div className="flex gap-3  ">
                <span className=" flex flex-col grow  md:w-[50%] w-[48%]">
                  <input
                    type="text"
                    {...register("receivername")}
                    className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2"
                  />
                  <label className=" text-xs mt-3">First Name</label>
                </span>
                <span className="flex flex-col grow   md:w-[50%] w-[48%]">
                  <input
                    type="text"
                    {...register("receiverlastname")}
                    className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2"
                  />
                  <label className="text-xs mt-3">last Name</label>
                </span>
              </div>
            </div>}
        { watch('gift')=="yes"&&      <div className="flex flex-col focus-within:bg-blue-300/20 px-4 my-5 rounded-sm">
              <p className="mb-3"> Gift Message </p>
              <textarea
                name=""
                {...register("giftmessage")}
                id=""
                cols="30"
                rows="6"
                className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2"
              ></textarea>
            </div>}
            <div className="flex flex-col focus-within:bg-blue-300/20 px-4 my-5 rounded-sm">
              <p className="mb-3"> Special Instructions </p>
              <textarea
                name=""
                {...register("instruction")}
                id=""
                cols="30"
                rows="6"
                className="outline-blue-400 border hover:ring-2 ring-blue-200 rounded-sm p-2"
              ></textarea>
            </div>
<div className="flex justify-center my-10">

            <button className="bg-green-500 hover:bg-green-600 text-white text-center px-14 py-3 rounded-sm font-semibold ">Submit</button>
</div>
          </form>
        </section>
      </section>
    </>
  );
}

export default App;
