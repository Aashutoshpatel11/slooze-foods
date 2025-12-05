'use client'
import axios, { Axios } from 'axios';
import React, {  useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { useSelector } from 'react-redux';

type Inputs = {
name: string
price: number
country: string
}

function FoodItemsList() {
    const [displayForm, setDisplayForm] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const [foodItems, setFoodItems] = useState([])
    const user = useSelector( (state:any) => state.auth.userData )
    // console.log("USER", user);
    

    const getAllFoodItems = async() => {
        try {
            const res = await axios.post(`http://localhost:3000/api/food-item/get-all`, {
                country: user?.country
            })
            if( res.data.success ){
                setFoodItems(res.data.data)
                // console.log("ALL FOOD ITEMS",res.data.data);
            }
        } catch (error:any) {
            console.log("ERROR FETCHING FOOD ITEMS::", error);
            throw new Error(error)
        }
    }
    useEffect( () => {
        getAllFoodItems()
    }, [user])

    const onSubmit = async (data:Inputs) => {
        try {
            data.country = user.country
            const res = await axios.post(`http://localhost:3000/api/food-item/add`, data)
            if( res.data.success ){
                getAllFoodItems()
                setDisplayForm(false)
            }
        } catch (error:any) {
            console.log("ERROR ADDING FOOD ITEM::", error);
            throw new Error(error)
        }
    }

    const addItemToCart = async (itemId:string) => {
        try {
            const res = await axios.post(`http://localhost:3000/api/food-item/add-to-cart/${user._id}=${itemId}`)
            
        } catch (error:any) {
            console.log("ADD ITEM TO CART ERROR::", error);
            throw new Error(error)
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
        
            <div className="bg-base-100 rounded-box shadow-md flex flex-col h-[500px]">
                
                <div className="z-0 flex justify-between items-center p-4 border-b border-base-200 ">
                    <span className=" z-0 text-xs font-bold opacity-60 uppercase tracking-wide">
                        Food items
                    </span>
                    <button 
                        onClick={() => setDisplayForm(true) } 
                        className="btn btn-sm btn-circle btn-primary tooltip tooltip-left z-0" 
                        data-tip="Add Item"
                    >+</button>
                </div>

                <div className="overflow-y-auto flex-1">
                <ul className="menu z-0 w-full p-0">

                    {
                    foodItems && [...foodItems].reverse().map( (item:any) => (
                        <li key={item._id} className="z-0 hover:bg-base-200 transition-colors border-b border-base-200 last:border-none">
                            <div className="flex justify-between items-center px-4 md:px-10 py-4">
                                <span className="text-lg md:text-xl font-medium">{item?.name}</span>
                                <div className="flex items-center gap-2">
                                    <span>{`Price: ${item.price}`}</span>
                                    <button onClick={ () => addItemToCart(item._id) } className="btn btn-sm btn-square btn-ghost border border-base-300">+</button>
                                </div>
                            </div>
                        </li>
                    ) ) 
                    }

                </ul>
                </div>
            </div>

            {displayForm && (
                <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-xl ">
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Add Item</legend>
                        <br />

                        <label className="label">Name</label>
                        <input {...register("name")} type="text" className="input" placeholder="" />

                        <label className="label">Price</label>
                        <input {...register("price")} type="number" className="input" placeholder="" />

                        <br />

                        <div className='flex w-full justify-between' >
                            <button
                            onClick={ (e) => setDisplayForm(false) }
                            className='btn btn-ghost btn-sm' >Close</button>
                            <button className='btn btn-accent btn-sm' >Add item</button>
                            
                        </div>

                        </fieldset>
                    </form>
            </div>
            )}

        </div>
    );
}

export default FoodItemsList;