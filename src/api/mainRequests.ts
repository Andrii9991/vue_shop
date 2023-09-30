import store from "@/store";
import { instanceApi } from "./instance";
import { AxiosResponse } from 'axios'


export const getAllProducts = async():Promise<AxiosResponse> =>{
    const responsePhones = await instanceApi.get('products/category/smartphones')
    const phonesList = responsePhones.data.products
    const responseLaptops = await instanceApi.get('products/category/laptops')
     const laptopsList = responseLaptops.data.products 
    
    const allResponses = phonesList.concat(laptopsList);
    
    store.commit('products/setProducts', allResponses)
    return responsePhones
}