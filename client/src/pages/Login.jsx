import React, { useState } from "react";
import{ Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { CustomButton, Loading, TextInput } from "../components";

const Login = () => {
    const {
        register, handleSubmit, formState: { errors },    
    } = useForm({
        mode:"onChange",
    });

    const [errMsg, setErrMsg] = useState("");
    const [isSubmitting, setIsSubmitting]=useState("false");
    const dispatch = useDispatch()
    return ( 
        <div className="bg-bgColor w-full h-[1000vh] flex items-center
        justify-center p-6">
            <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0
            flex bg-primary rounded-xl overflow-hidden shadow-xl">
            
               { /* left */ }

                <div className="w-full lg:w=1/2 h-full p-10 2xl:px-20 flex flex-col
                justify-center">
                    <div className="w-full flex gap-2 items-center mb-6">
                        <div className="p-2 bg-[#065ad8] rounded text-white">
                        <TbSocial /> 
                        </div>
                        <span className="text-2xl text-[#065ad8] "font-semibold>
                            SnapIt
                        </span>
                    </div>
                    <p className="text-ascent-1 text-base font-semibold">
                        Log into your account to continue
                    </p>
                    <span className="text-sm mt-2 text-ascent-2"> Welcome back! </span>
                    

                    <form className="py-8 flex flex-col gap-5">
                      
                       <TextInput
                       name="email" placeholder="email@exapmle.com"

                       label="Email Address"
                       type="email"
                       register={
                        register("email",{
                            required: "Email is required",
                        })}
                        styles="w-full rounded-full"
                        labelStyles="ml-2"
                        error={errors.email ? errors.email.message: ""}
                       />

                        <TextInput
                        name="password" 
                        label="Password"
                        placeholder="********"
                        type="password"
                        styles="w-full rounded-full"
                        labelStyles="ml-2"
                        register={
                            register("password",{
                                required: "Password is required",
                         })}
                        
                        error={errors.password ? errors.password?.message: ""}
                       />

                       <Link
                       to="/reset-password"
                       className="text-sm text-right text-blue font-semibold"
                       >Forgot Password ?
                       </Link>


                       {
                        errMsg?.massage && (
                            <span className={'text-sm ${errMsg?.status == "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]" }mt-0.5'}>
                                {errMsg?.massage}
                            </span>
                        )}

                        {
                            isSubmitting ? (<Loading/>) : (<CustomButton
                            type='submit'
                            containerStyles={'inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none'}
                            title='Login'
                            />
                            )
                        }

                    </form>
                </div>
            
                { /* right */ }
            </div>
        </div>
    );
};

export default Login;