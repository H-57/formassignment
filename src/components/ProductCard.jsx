import React, { useEffect, useState,useContext } from "react";
import{FaMagnifyingGlassPlus,FaPlus}from "react-icons/fa6"
// import {useProducts} from "../context/productContext"
import { useSelector, useDispatch } from 'react-redux'
import { setTotal, setProducts } from "../store/slice/product";

function ProductCard({ title, image, price, size, sizelabel, color}) {
  const dispatch = useDispatch()
  const {products,Total} = useSelector((state) => state.productsReducer)
  // const { products, updateProducts, Total } = useProducts();
  // console.log("Products in ProductCard:", products);
  // console.log("Total in ProductCard:", Total);
  const [IsChecked, setIsChecked] = useState(false)
const [showBanner, setshowBanner] = useState(false)
const [CardData, setCardData] = useState({title:title,price:price,size:"",color:"",quantity:"1"})


const handelProductData = () => {
  const existingIndex = products.findIndex((obj) => obj.title === title);
  let updatedProducts = [...products]; 

  if (IsChecked) {
    if (existingIndex !== -1) {
      // Object already exists, replace it
      updatedProducts[existingIndex] = CardData;
    } else {
      
      updatedProducts.push(CardData);
    }
  } else if (existingIndex !== -1) {
    // Object exists and IsChecked is false, remove it
    updatedProducts.splice(existingIndex, 1);
  }

  dispatch(setProducts(updatedProducts)); // Update the products state
};

useEffect(() => {
  handelProductData();
}, [IsChecked, CardData]);

useEffect(() => {
  let sum = 0;
  products.forEach((item) => {
    sum += item.price * item.quantity;
  });
  dispatch(setTotal(sum));
}, [products]);

  return (
    <>
      <span className="block hidden object-cover object-contain  " />
      <div  className="group border-gray-300 border rounded-md overflow-hidden md:w-52 h-96 w-[100%] ">
        <div className="">
          <input
            type="checkbox"
            checked={IsChecked}
            onChange={()=>{
             
              setIsChecked(!IsChecked)}}
            className=" w-5 h-5 ml-3 mt-3  absolute cursor-pointer z-30"
          />
          <div className="group/img h-[150px] overflow-hidden relative">
            <div onClick={()=>{
              // console.log("click")
              
              setshowBanner(!showBanner)}} className="w-[100%] h-[100%] group-hover/img:bg-blue-rgba  absolute z-10"><FaMagnifyingGlassPlus size={20} color="white"className="hidden group-hover/img:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" /></div>
            <img
              src={image}
              alt="tshirt-image"
              className={`${
                title == "Shoes" ? "object-cover" : "object-contain"
              }  h-[100%] w-[100%]`}
            />
          </div>
        </div>


        <div onClick={(e)=>{
         (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION')?null:
          setIsChecked(!IsChecked)}} className={`group-hover:bg-[#f5f7fd] p-3 h-[100%] text-gray-500 ${IsChecked?"bg-[#f5f7fd]":""}`}>
          <p className="font-semibold text-black ">{title}</p>
          <p className="text-blue-600 font-extrabold text-sm">${price}.00</p>

          <div className=" inline-block w-fit space-y-2 my-5 mr-3">
            <p className="text-xs "> Quantity</p>
            <select onChange={(e)=>setCardData({...CardData,quantity:e.target.value})}  className="bg-white hover:ring-2 ring-blue-200 outline-none border border-gray-300 rounded-md pl-2 pr-2 py-2 ">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
          {color && (
            <div className="inline-block w-fit space-y-2 my-5">
              <p className="text-xs capitalize">color</p>
              <select onChange={(e)=>setCardData({...CardData,color:e.target.value})} className="bg-white outline-none border hover:ring-2 ring-blue-200 border-gray-300 rounded-md  pl-2 pr-2 py-2">
                {color.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </div>
          )}
          <div className="inline-block w-fit space-y-2 ">
            {size && (
              <>
                {" "}
                <p className="text-xs">{sizelabel}</p>
                <select onChange={(e)=>setCardData({...CardData,size:e.target.value})} className="bg-white hover:ring-2 ring-blue-200  border border-gray-300 rounded-md  pl-2 pr-5 py-2">
                  {size.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={` ${showBanner?"block":"hidden"} w-full h-full absolute z-50  top-0 left-0 bg-gray-rgba `}>

      <div className={`   w-[80vw] h-[80vh] m-auto mt-10  bg-white rounded-md shadow-black shadow-2xl`}>
        <FaPlus  onClick={()=>{setshowBanner(!showBanner)}} size={30} color="gray"  className="absolute top-[10%] right-[10%] translate-x-[-50%] translate-y-[-50%] rounded-full rotate-45 bg-slate-200" />
        <img src={image} alt="image preview" className="w-[100%] h-[100%] object-contain" />
      </div>
      </div>
    </>
  );
}

export default ProductCard;
