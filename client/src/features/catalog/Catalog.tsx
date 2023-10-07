import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import {  Grid, Paper} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
    {value:'name', label:'Alphabetical'},
    {value:'priceDesc', label:'Price - high to low'},
    {value:'price', label:'Price - low to high'},
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
    const {productsLoaded,status, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters())
    }, [dispatch, filtersLoaded]);

    if(!filtersLoaded) return <LoadingComponent message='Loading products...'/>

    return (
        <Grid container spacing={4} sx={{mb:0} }>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <ProductSearch />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <RadioButtonGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(event) => dispatch(setProductParams({orderBy: event.target.value})) }
                    />
                </Paper>
                <Paper sx={{mb:2, p:2} }>
                    <CheckboxButtons items={brands}
                        checked={productParams.brand!}
                        onChange={(items: string[]) => dispatch(setProductParams({ pageNumber: 1,brand: items.length > 0 ? items:null }))}
                    /> 
                </Paper>
                <Paper sx={{mb:2, p:2} }>
                    <CheckboxButtons items={types}
                        checked={productParams.types!}
                        onChange={(items: string[]) => dispatch(setProductParams({ pageNumber:1, types: items.length > 0 ? items : null }))}
                    /> 
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={9} style={{ padding: 10 }}>
                {metaData && 
                    <AppPagination metaData={metaData}
                        onPageChange={(page: number) =>
                            dispatch(setProductParams({ pageNumber: page }))}
                    />
                }
                
            </Grid>
        </Grid>
    )
}