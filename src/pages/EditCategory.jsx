import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategoryById, updateCategory } from '../api/categoryApi';
import toast from 'react-hot-toast';
import CategoryForm from '../components/CategoryForm';

const EditCategory = () => {
    const [name, setName] = useState("");
    const [loading, setloading] = useState(true);
    const [Loading, setLoading] = useState(false)
    const [image, setImage] = useState(""); // existing image path
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const loadCategories = async () => {
        try {
            const res = await fetchCategoryById(id)
            console.log("CATEGORY RESPONSE 👉", res.data);

setName(res.data.category.name);
setImage(res.data.category.image);
            
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
}
    const handleSubmit = async (e) => {
        
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.append("name", name)

        if (file) {
            formData.append("image", file)
        }
        setLoading(true)
        await updateCategory(id, formData)

        toast.success("Category updated")
        navigate("/admin/categories")
        } catch (error) {
            console.log(error)
            toast.error("Category updateion failed")
        } finally {
            setLoading(false)
        }
    }

    
    useEffect(() => {
        loadCategories()
    }, [id]);


    if (loading) {
        return <p className='text-3xl text-center'>loading...</p>
    }

    return (
    <div className='p-6'>
        <h1 className='text-xl mb-4'>Edit Category</h1>



        <CategoryForm 
        name={name}
        setName={setName} 
        file={file}
        setFile={setFile}
        image={image}
        loading={Loading}
        fileInputRef={fileInputRef}
        buttonText={"Edit"}
        handleSubmit={handleSubmit}/>

    </div>
  )
}

export default EditCategory
