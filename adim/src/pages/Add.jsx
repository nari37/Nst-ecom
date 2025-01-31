
import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {

  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setname] = useState("");
  const [desciription, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("men");
  const [subcategory, setsubcategory] = useState("topwear");
  const [bestseller, setbestseller] = useState(false);
  const [sizes, setsizes] = useState([]);
  const [loading, setLoading] = useState(false);


  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", desciription);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      // Log FormData entries for debugging
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
         {headers:{token}} 
      );

  

      if (response.data.success) {
        toast.success(response.data.message);
        setname("");
        setdescription("");
        setprice("");
        setsizes([]);
        setbestseller(false);
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        setLoading(false);
      } else {
        toast.error(response.data.message);
      }
   
   
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {["image1", "image2", "image3", "image4"].map((img, index) => (
            <label key={index} htmlFor={img}>
              <img
                className="w-20"
                src={
                  !eval(img)
                    ? assets.upload_area
                    : URL.createObjectURL(eval(img))
                }
                alt=""
              />
              <input
                onChange={(e) => eval(`set${img}`)(e.target.files[0])}
                type="file"
                id={img}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setname(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setdescription(e.target.value)}
          value={desciription}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setcategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="men">MEN</option>
            <option value="women">WOMEN</option>
            <option value="kids">KIDS</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setsubcategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setprice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            min="0"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["s", "m", "l", "xl", "xxl"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setsizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        {/* <input
          onChange={() => setbestseller(prev => !prev)}
          checked={bestseller}
          type="checkbox"
          id='bestseller'
        /> */}
        <input
  onChange={(e) => setbestseller(e.target.checked)}
  checked={bestseller}
  type="checkbox"
  id='bestseller'
/>

        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button
    type="submit"
  className={`w-28 py-3 mt-4 text-white ${loading ? "bg-gray-800" : "bg-black"}`}
  disabled={loading}
      >
    {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default Add;


