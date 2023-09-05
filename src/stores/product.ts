import type { Product } from "@/models/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import http from "@/utils/http";
import { ElMessage } from "element-plus";

export const productStore = defineStore('products', () => {
  const products = ref<Product[]>([])

  const all_product = async (): Promise<void> => {
    let result = await http.get(`/products?_sort=id&_order=desc&_limit=10`)
    if (result.status == 200) {
      products.value = [...result.data]
    }
  }

  const add_product = async (payload: Product): Promise<void> => {
    let result = await http.post('/products', payload)
    if (result.status == 201) {
      products.value = [result.data, ...products.value]
      ElMessage.success("Yangi xususiyat qo'shildi")
    }
  }

  const remove_product = async (id: number): Promise<void> => {
    let result = await http.delete(`/products/${id}`)
    if (result.status == 200) {
      products.value = products.value.filter((product: Product) => {
        return product.id !== id
      })
      ElMessage.warning("Xususiyat muvaffaqiyatli o'chirildi")
    }
  }

  const toggle_product_status = async (product: Product): Promise<void> => {
    product.status = !product.status
    save_product(product)
  }

  const get_product = async(id: number | null) => {
    return http.get(`/products/${id}`)
  }

  const save_product = async(product: Product): Promise<void> =>{
    let result = await http.put(`/products/${product.id}`, product)
    if(result.status == 200){
      products.value = products.value.map((cat: Product) => {
        if(cat.id === product.id) return product        
        return cat
      })
      ElMessage.success("Xususiyat holati o'zgartirildi")
      } 
  }

  return {
    products,
    all_product,
    add_product,
    remove_product,
    toggle_product_status,
    get_product,
    save_product
  }
})