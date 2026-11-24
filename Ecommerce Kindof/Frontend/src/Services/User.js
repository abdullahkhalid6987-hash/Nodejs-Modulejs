
const registerUser = async (formData) => {
        const plainDataObject = Object.fromEntries(formData.entries());
    const response = await fetch('http://localhost:3000/api/v1/users/register',{
        method: "post",
         headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(plainDataObject),
    }
    )
    const data = await response.json()

    if(data.statusCode === 200){
        return data;
    }

    throw new Error(data.message || "An unexpected registration error occurred");
}

const loginUser = async (formData) => {
    const plainDataObject = Object.fromEntries(formData.entries())
       const response = await fetch('http://localhost:3000/api/v1/users/login',{
        method: "post",
         headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(plainDataObject),
        credentials: "include"
    }
    )

    const data = await response.json()
    
    if(data.statusCode === 200){
        return data;
    }

    throw new Error(data.message || "An unexpected registration error occurred");
}

const logoutUser = async () => {
       const response = await fetch('http://localhost:3000/api/v1/users/logout',{
        method: "post",
         headers: {
        "Content-Type": "application/json",
      },
        credentials: "include"
    }
    )
    const data = await response.json()
        if(data.statusCode === 200){
        return data;
    }

    throw new Error(data.message || "An unexpected registration error occurred");
}

const userSession = async() => {
     const response = await fetch('http://localhost:3000/api/v1/users/refreshToken',{
        method: "post",
         headers: {
        "Content-Type": "application/json",
      },
        credentials: "include"
    }
    )
    const data = await response.json()
        if(data.statusCode === 200){
        return data;
    }

    throw new Error(data.message || "An unexpected error occurred");
}

const ordersList = async () => {
       const response = await fetch('http://localhost:3000/api/v1/users/orderList',{
        method: "get",
         headers: {
        "Content-Type": "application/json",
      },
        credentials: "include"
    }
    )

    const data = await response.json()
    
    if(data.statusCode === 200){
        return data;
    }

    throw new Error(data.message || "An unexpected registration error occurred");
}

const addOrder = async (productId, quantity) => {
       const response = await fetch(`http://localhost:3000/api/v1/users/addProduct/${productId}`,{
        method: "post",
         headers: {
        "Content-Type": "application/json",
      },
        credentials: "include",
        body: JSON.stringify({
            quantity
        })
    }
    )

    const data = await response.json()
    
    if(data.statusCode === 200){
        return data;
    }

    throw new Error(data.message || "An unexpected error occurred");
}

const removeOrder = async (productId) => {
       const response = await fetch(`http://localhost:3000/api/v1/users/removeProduct/${productId}`,{
        method: "post",
         headers: {
        "Content-Type": "application/json",
      },
        credentials: "include"
    }
    )

    const data = await response.json()
    
    if(data.statusCode === 200){
        return data;
    }

    throw new Error(data.message || "An unexpected error occurred");
}





export {
    registerUser,
    loginUser,
    logoutUser,
    userSession,
    ordersList,
    addOrder,
    removeOrder
}