import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageUploading from 'react-images-uploading';
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import {
  collection,
  doc,
  FieldPath,
  FieldValue,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
 
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem,savefreshItem,getAllfreshFoodItems } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { stringify } from "postcss";

const CreateContainer = () => {
 
  const [images, setImages] = useState([]);
//   const img=Object.values(images);
// //  {images?.map((val,ind)=>{
// // img.push(val)
// //  })}
//  console.log(img,images)
  const maxNumber = 3;//maximum image upload
  const onChange = (imageList) => {
    setImages(imageList);
  };


  const [title, setTitle] = useState("");
  const [qty, setqty] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [freshcategory, setfreshCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();
  const [{foodCategory}] = useStateValue();
  const [{foodfreshCategory}] = useStateValue();
  const [freshfood,setfreshfood] = useState()
  const [food,setfood] = useState()
  const getAllCategories = async () => {
    const items = await getDocs(
      query(collection(firestore, "foodCategory"))
    );
  
    setfood(items.docs.map((doc) => doc.data()));
  };
const getAllFreshCategories = async () => {
  const items = await getDocs(
    query(collection(firestore, "freshfoodCategory"))
  );

  setfreshfood(items.docs.map((doc) => doc.data()));
  console.log(items)
};
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !qty  || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL:  [...images],
          category: category,
          // calories: calories,
          qty: qty,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const savefreshDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !qty || !imageAsset || !price || !freshcategory) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: freshcategory,
          // calories: calories,
          qty: qty,
          price: price,
        };
        savefreshItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchfreshData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setImages(null)
    setCalories("");
    setPrice("");
    setCategory("Select Category");
    setfreshCategory("Select Category");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  const fetchfreshData = async () => {
    await getAllfreshFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FRESH_FOOD_ITEMS,
        freshfoodItems: data,
      });
    });
  };
  useEffect(() => {
    getAllCategories()
    getAllFreshCategories()
  
  }, []);
  return (
    <div className="w-full min-h-screen bg-primary flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] border bg-primary border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category for hot deal
            </option>
            {food &&
            food.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.title}
                >
                  {item.title}
                </option>
              ))}
          </select>
        </div>
        <div className=" justify-center items-center">
          <p className="justify-center">OR</p>
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setfreshCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category for fresh food
            </option>
            {freshfood &&
            freshfood.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.title}
                >
                  {item.title}
                </option>
              ))}
          </select>
        </div>
        <ImageUploading
        multiple //multiple image upload
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          
          <div className="flex flex-col">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload Image 
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item flex flex-row ">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
        {/* <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div> */}

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={qty}
              onChange={(e) => setqty(e.target.value)}
              placeholder="Quantity"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex flex-row justify-center gap-5">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save in Hot Items
          </button>

          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={savefreshDetails}
          >
            Save in Fresh Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
