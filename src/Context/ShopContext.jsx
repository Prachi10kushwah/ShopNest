import React,{createContext, useState} from "react";
import all_product from "../components/Assets/all_product"
import { useEffect } from "react";


export const ShopContext = createContext(null)
    const getDefaultCart = () =>{
        let cart = {};
        for (let index = 0; index <= all_product.length; index++){
            cart[index] = 0
        }
        return cart
    }
    const getDefaultWishlist = () => {
        let wishlist = {};
        for (let index = 0; index <= all_product.length; index++) {
            wishlist[index] = false;
        }
        return wishlist;
    };

    const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    });
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlistItems");
        return savedWishlist ? JSON.parse(savedWishlist) : getDefaultWishlist();
    });   
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("all");

    useEffect(() => {
        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem(
            "wishlistItems",
            JSON.stringify(wishlistItems)
        );
    }, [wishlistItems]);

    useEffect(() => {
        localStorage.setItem(
            "wishlistItems",
            JSON.stringify(wishlistItems)
        );
    }, [wishlistItems]);

    
    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]: prev[itemId]+1}))
    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]: prev[itemId]-1}))
    }
    const toggleWishlist = (itemId) => {
        setWishlistItems((prev) => ({...prev,[itemId]: !prev[itemId],}));
    }
    const contextvalue = {
        all_product
        ,cartItems,
        addToCart,
        removeFromCart,
        wishlistItems,
        toggleWishlist,
        search,
        setSearch,
        sortOption,
        setSortOption,
    }
    
    return(
        <ShopContext.Provider value={contextvalue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;