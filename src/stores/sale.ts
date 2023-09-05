import type { Sale } from "@/models/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import cookies from "vue-cookies";
import http from "@/utils/http";
import { ElMessage } from "element-plus";

export const saleStore = defineStore('sales', () => {
    const sales = ref<Sale[]>([])
    const cart = ref<Sale[]>([])

    const add_to_cart = (payload: Sale) => {
        cart.value = [payload, ...cart.value]
        ElMessage.success("Mahsulot savatchaga qo'shildi")
    }

    const save_cart = async (payload: Sale[]) => {
        await Promise.all(payload.map(async(item: Sale) => {
            await http.post('/products', {
                product: item.product,
                date: item.date,
                quantity: item.quantity
            }).then(async() => {
                await http.put(`/sales/products/${item.info.id}`, {
                    ...item.info,
                    quantity: item.info.quantity - item.quantity
                })
            })
        }))
        cookies.remove('cart')
    }

    return {
        sales,
        cart,

        add_to_cart,
        save_cart
    }
})