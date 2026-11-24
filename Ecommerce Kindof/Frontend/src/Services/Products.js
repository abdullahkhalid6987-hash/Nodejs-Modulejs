const getProducts = async () => {
    const response = await fetch('http://localhost:3000/api/v1/products/allProducts', {
        method: 'get',
              headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    return data;
}

export {
    getProducts
}