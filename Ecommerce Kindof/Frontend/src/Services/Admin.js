const addProduct = async (formData) => {
     const response = await fetch('http://localhost:3000/api/v1/products/addProduct',{
        method: "post",
        credentials: "include",
        body: formData,
}
     )
     const data = await response.json()

    if(data.statusCode === 200){
        return data
    }

    throw new Error (data.message || "There was an error while creating the product")

}

const removeProduct = async (productId) => {
     const response = await fetch(`http://localhost:3000/api/v1/products/removeProduct/${productId}`,{
        method: "post",
        credentials: "include",
}
     )
     const data = await response.json()

    if(data.statusCode === 200){
        return data
    }

    throw new Error (data.message || "There was an error while creating the product")

}

const getAllUsers = async (productId) => {
     const response = await fetch(`http://localhost:3000/api/v1/users/getUsers`,{
        method: "get",
        credentials: "include",
}
     )
     const data = await response.json()

    if(data.statusCode === 200){
        return data
    }

    throw new Error (data.message || "There was an error while creating the product")

}

export{
    addProduct,
    removeProduct,
    getAllUsers
}