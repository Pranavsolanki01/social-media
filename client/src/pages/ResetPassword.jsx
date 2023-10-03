import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../components"
import { CustomButton, Loading } from "../components";
const ResetPassword = () => {

    const [errMsg, setErrMsg] = useState("");
    const [isSubmitting, setIsSubmitting]=useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode:"onChange",
    });

    const onSubmit =async(data) => {}

    return ( 
        <div className='w-full h-[100vh] bg-bgColor flex items-center justify-center p-6'>
            <div className='bg-primary w-full md:w-1/2 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg'>
                <p className='text-ascent-1 text-lg font-semibold'>
                    Email Address
                </p>
                <span className='text-sm text-ascent-2'>
                    Enter email address used during the registration
                </span>
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className='py-4 flex flex-col gap-5'
                    >
                    <TextInput
                    name='email@mail.com'
                    placeholder='email@example.com'
                    type='email'
                    register={register("email", {
                        required: 'Email is required..!',
                    })}
                    styles='w-full rounded-lg'
                    labelStyle='ml-2'
                    error={errors.email ? errors.email.message:''}
                    />
                    {
                        errMsg?.message && (
                            <span
                            role='alert' 
                            className={`text-sm ${errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]" }mt-0.5`}>
                                {errMsg?.message}
                            </span>
                        )}

                        {isSubmitting ? (
                            <Loading/>
                            ) : (
                            <CustomButton
                                type='submit'
                                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm fonts-medium text-white outline-none`}
                                title="Submit"
                            />
                            ) 
                        }
                </form>
            </div>
            
        </div>
    );
};  

export default ResetPassword; 