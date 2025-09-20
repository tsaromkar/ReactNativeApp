import { useEffect, useState } from "react";
import { get } from "@network/fetch";

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
            const res = await get(`/api/get-product-types`);
            const { data } = res;
            setProductTypes(data.types)
        } catch (error) {
            console.error("Error fetching product-types:", error);
            Toast.show({
                type: 'error',
                text1: error.message,
            })
        }
    }

    const fetchProducts = async (newSearch = null) => {
        try {
            setLoading(true);

            let url = `/api/get-products-with-pages?page=${page}&pageSize=${pageSize}`;
            if (newSearch) {
                url += `&search=${encodeURIComponent(newSearch)}`;
            }
            if (selectedFilters.size) {
                url += `&type=${Array.from(selectedFilters).join(",")}`;
            }

            const res = await get(url);
            const { data } = res;

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