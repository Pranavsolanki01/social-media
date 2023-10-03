import React from "react";

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

    
    return <div>ResetPassword Page</div>
};  

export default ResetPassword;  