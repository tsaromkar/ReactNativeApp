import { useEffect, useState } from "react";
import { BASE_URL } from "@env";

export const usePagination = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedFilters, setSelectedFilters] = useState(new Set());
    const [productTypes, setProductTypes] = useState([]);
    const pageSize = 6;

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(handler);
    }, [search]);

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

    const fetchProducts = async (newSearch = null) => {
        try {
            setLoading(true);

            let url = `${BASE_URL}/api/get-products-with-pages?page=${page}&pageSize=${pageSize}`;
            if (newSearch) {
                url += `&search=${encodeURIComponent(newSearch)}`;
            }
            if (selectedFilters.size) {
                url += `&type=${Array.from(selectedFilters).join(",")}`;
            }

            console.log("🚀 ~ fetchProducts ~ url:", url)
            const res = await fetch(url);
            const json = await res.json();
            const { data } = json;
            console.log("🚀 ~ fetchProducts ~ data:", data);

            setProducts(data.products);
            setTotalPages(data.totalPages);
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

    useEffect(() => {
        fetchProductTypes();
    }, []);

    useEffect(() => {
        if (debouncedSearch || selectedFilters.size > 0) setPage(1);
        fetchProducts(debouncedSearch);
    }, [debouncedSearch, selectedFilters, page]);

    const handleSearch = () => {
        setPage(1);
        fetchProducts(search);
    };

    return {
        products,
        page,
        setPage,
        totalPages,
        loading,
        search,
        setSearch,
        fetchProducts,
        handleSearch,
        selectedFilters,
        setSelectedFilters,
        productTypes,
    }
}