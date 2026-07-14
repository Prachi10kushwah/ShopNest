import React,{createContext, useState} from "react";
import all_product from "../components/Assets/all_product"
import { useEffect } from "react";


export const ShopContext = createContext(null)
    const getDefaultCart = () => {
    let cart = {};

    all_product.forEach((product) => {
        cart[product.id] = 0;
    });

    return cart;
    };

    const getDefaultWishlist = () => {
    let wishlist = {};

    all_product.forEach((product) => {
        wishlist[product.id] = false;
    });

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


    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]: prev[itemId]+1}))
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: 0,
        }));
        };
    const toggleWishlist = (itemId) => {
        setWishlistItems((prev) => ({...prev,[itemId]: !prev[itemId],}));
    }
// Quantity increase and decrease ----------------------------------
    const increaseQuantity = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1,
        }));
        };

        const decreaseQuantity = (itemId) => {
        if (cartItems[itemId] > 1) {
            setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1,
            }));
        } else {
            removeFromCart(itemId);
        }
    }
        const getTotalCartAmount = () => {
            let totalAmount = 0;

            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                let product = all_product.find(
                    (product) => product.id === Number(item)
                );

                if (product) {
                    totalAmount += product.new_price * cartItems[item];
                }
                }
            }

            return totalAmount;
            };

    const contextvalue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        wishlistItems,
        toggleWishlist,
        search,
        setSearch,
        sortOption,
        setSortOption,
        increaseQuantity,
        decreaseQuantity,
        getTotalCartAmount,
    }
    
    return(
        <ShopContext.Provider value={contextvalue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;