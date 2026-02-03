import React, { useRef, useState } from 'react'
import { createCategory } from '../api/categoryApi';
import toast from 'react-hot-toast';
import CategoryForm from '../components/CategoryForm';
import { useNavigate } from 'react-router-dom';
const AddCategory = () => {


    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) return toast.error("Enter categroy name")
        if (!file) return toast.error("Choose a image please")

        const formData = new FormData();
        formData.append("name", name)
        formData.append("image", file)

        try {
            setLoading(true)
            await createCategory(formData)
            toast.success("Category created")
            
            setName("")
            setFile(null)

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }


        } catch (error) {
            toast.error("Create file failed")
            console.log(error);
            
        } finally {
            setLoading(false);
        }

    }
  return (
    <div className="p-6">
    <h1 className="text-xl mb-4">
        Add Category
    </h1>



   <CategoryForm 
   name={name}
   setName={setName} 
   file={file}
   setFile={setFile}
   loading={loading}
   fileInputRef={fileInputRef}
   buttonText={"Create"}
   handleSubmit={handleSubmit}/>
    </div>
  )
}

export default AddCategory
