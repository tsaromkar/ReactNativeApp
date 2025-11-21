import { useCallback, useEffect, useState } from "react";
import { axiosGet } from "@network/axios";

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
            const res = await axiosGet(`/product-api/get-product-types`);
            const { data } = res;
            setProductTypes(data.types)
        } catch (error) { }
    }

    const fetchProducts = useCallback(async (newSearch = null) => {
        try {
            setLoading(true);

            let url = `/product-api/get-products-with-pages?page=${page}&pageSize=${pageSize}`;
            if (newSearch) {
                url += `&search=${encodeURIComponent(newSearch)}`;
            }
            if (selectedFilters.size) {
                url += `&type=${Array.from(selectedFilters).join(",")}`;
            }

            const res = await axiosGet(url);
            const { data } = res;

            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (e) { } finally {
            setLoading(false);
        }
    }, [page, selectedFilters]);

    useEffect(() => {
        fetchProductTypes();
    }, []);

    useEffect(() => {
        if (debouncedSearch || selectedFilters.size > 0) setPage(1);
        fetchProducts(debouncedSearch);
    }, [debouncedSearch, selectedFilters, page, fetchProducts]);

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