import type { Category } from "@/models/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import http from "@/utils/http";
import { ElMessage } from "element-plus";

export const categoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])

  const add_category = async (payload: Category): Promise<void> => {
      const result = await http.post('/category', payload)
      if(result.status == 201){
        categories.value = [result.data, ...categories.value]
        ElMessage.success("Yangi turkum muvaffaqiyatli qo'shildi")
      }
    }
    
    const remove_category = async(id: number): Promise<void> => {
      const result = await http.delete('/category', payload)
      if(result.status == 200){
        categories.value = categories.value.filter((category: Category) => {
          return category.id !== id
        })
      }
  }
 
  return{
    categories,
    add_category,
    remove_category
  }
})