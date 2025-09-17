import { useEffect, useState } from "react";
import { BASE_URL } from "@env";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedFilters, setSelectedFilters] = useState(new Set());
    const [productTypes, setProductTypes] = useState([]);
    const [topDeals, setTopDeals] = useState([]);
    const pageSize = 10;

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(handler);
    }, [search]);

    const fetchTopDeals = async () => {
        try {
            let url = `${BASE_URL}/api/get-top-deals`;
            const res = await fetch(url);
            const { data } = await res.json();
            console.log("🚀 ~ fetchTopDeals ~ data:", data);
            setTopDeals(data.topDeals)
        } catch (error) {
            console.error("Error fetching top deals:", error);
        }
    }

    const fetchProductTypes = async () => {
        try {
            let url = `${BASE_URL}/api/get-product-types`;
            const res = await fetch(url);
            const { data } = await res.json();
            console.log("🚀 ~ fetchProductTypes ~ data:", data);
            setProductTypes(data.types)
        } catch (error) {
            console.error("Error fetching product-types:", error);
        }
    }

    const fetchProducts = async (loadMore = false, newSearch = null) => {
        try {
            setLoading(true);

            let url = `${BASE_URL}/api/get-products?pageSize=${pageSize}`;
            if (loadMore && lastVisible) {
                url += `&lastVisible=${lastVisible}`;
            }
            if (newSearch) {
                url += `&search=${encodeURIComponent(newSearch)}`;
            }
            if (selectedFilters.size) {
                url += `&type=${Array.from(selectedFilters).join(",")}`;
            }

            console.log("🚀 ~ fetchProducts ~ url:", url)
            const res = await fetch(url);
            const { data } = await res.json();
            console.log("🚀 ~ fetchProducts ~ data:", data)

            if (loadMore) {
                setProducts(prev => [...prev, ...data.products]);
            } else {
                setProducts(data.products);
            }

            setLastVisible(data.lastVisible);
        } catch (error) {
            console.error("Error fetching products:", error);
            Toast.show({
                type: 'error',
                text1: error.message,
            })
        } finally {
            setLoading(false);
        }
    };

    const handleFetch = (search) => {
        setLastVisible(null);
        fetchProducts(false, search);
    }

    useEffect(() => {
        fetchTopDeals();
        fetchProductTypes();
        fetchProducts();
    }, []);

    useEffect(() => {
        handleFetch(debouncedSearch);
    }, [debouncedSearch, selectedFilters]);

    const handleSearch = () => {
        handleFetch(search);
    };

    return {
        products,
        loading,
        lastVisible,
        search,
        setSearch,
        fetchProducts,
        handleSearch,
        selectedFilters,
        setSelectedFilters,
        productTypes,
        topDeals
    }
}