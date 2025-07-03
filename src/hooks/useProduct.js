import { useState } from 'react'
import axios from 'axios'

const BASEURL = process.env.REACT_APP_BASEURL

const useProduct = () => {
    const [products, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState(null)

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalAction, setModalAction] = useState('create')

    const [productData, setProductData] = useState({
        id: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: ''
    })

    const getAllProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASEURL}/products`)
            setProducts(response.data)
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching products')
            console.error("Error getting all products", error)
        } finally {
            setIsLoading(false)
        }
    }

    const getProductById = async (id) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASEURL}/products/${id}`)
            setProductSelected(response.data)
        } catch (error) {
            setError(error.response?.data?.message || `Error fetching product with id: ${id}`)
            console.error("Error getting product by id", error)
        } finally {
            setIsLoading(false)
        }
    }

    const createProduct = async (productData) => {
        try {
            setIsLoading(true)
            const response = await axios.post(`${BASEURL}/products`, productData)
            if (response) {
                getAllProducts()
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating product')
            console.error("Error creating product", error)
        } finally {
            setIsLoading(false)
        }
    }

    const updateProduct = async (id, updatedData) => {
        try {
            setIsLoading(true)
            const response = await axios.put(`${BASEURL}/products/${id}`, updatedData)
            if (response) {
                setProductSelected(response.data.payload)
            }
            getAllProducts()
        } catch (error) {
            setError(error.response?.data?.message || `Error updating product with id: ${id}`)
            console.error("Error updating product", error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteProduct = async (id) => {
        try {
            setIsLoading(true)
            await axios.delete(`${BASEURL}/products/${id}`)
            setProductSelected(null)
            getAllProducts()
        } catch (error) {
            setError(error.response?.data?.message || `Error deleting product with id: ${id}`)
            console.error("Error deleting product", error)
        } finally {
            setIsLoading(false)
        }
    }

    // --- Event Handlers ---
    const handleShowModal = (action, product) => {
        setModalAction(action)
        if (action === 'update' && product) {
            setProductData({
                id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category
            })
            setProductSelected(product)
        } else {
            setProductData({
                id: '',
                name: '',
                description: '',
                price: 0,
                stock: 0,
                category: ''
            })
            setProductSelected(null)
        }
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setProductData({
            id: '',
            name: '',
            description: '',
            price: 0,
            stock: 0,
            category: ''
        })
        setProductSelected(null)
        setError(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }

    const handleSubmitForm = async () => {
        try {
            if (modalAction === 'create') {
                await createProduct(productData)
            } else if (modalAction === 'update' && productSelected) {
                await updateProduct(productSelected._id, productData)
            }
            handleCloseModal()
        } catch (err) {
            alert("Error saving product")
        }
    }

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id)
            } catch (err) {
                alert("Error deleting product")
            }
        }
    }

    return {
        products,
        productData,
        isLoading,
        error,
        showModal,
        modalAction,
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        handleShowModal,
        handleCloseModal,
        handleInputChange,
        handleSubmitForm,
        handleDeleteProduct
    }
}

export default useProduct