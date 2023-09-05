import type { Category } from "@/models/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import http from "@/utils/http";
import { ElMessage } from "element-plus";

export const categoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])

  const all_category = async (): Promise<void> => {
    const result = await http.get(`/category?_sort=id&_order=desc`)
    if (result.status == 200) {
      categories.value = [...result.data]
    }
  }

  const add_category = async (payload: Category): Promise<void> => {
    const result = await http.post('/category', payload)
    if (result.status == 201) {
      categories.value = [result.data, ...categories.value]
      ElMessage.success("Yangi turkum muvaffaqiyatli qo'shildi")
    }
  }

  const remove_category = async (id: number): Promise<void> => {
    const result = await http.delete(`/category/${id}`)
    if (result.status == 200) {
      categories.value = categories.value.filter((category: Category) => {
        return category.id !== id
      })
      ElMessage.warning("Turkum muvaffaqiyatli o'chirildi")
    }
  }

  const toggle_category_status = async (category: Category): Promise<void> => {
    category.status = !category.status
    save_category(category)
  }
    


  const get_category = async(id: number) => {
    return http.get(`category/${id}`)
  }

  const save_category = async(category: Category): Promise<void> => {
    let result = await http.put(`/category/${category.id}`, category)
    if(result.status == 200){
      categories.value = categories.value.map((cat: Category) => {
        if(cat.id === category.id) return category        
        return cat
      })
      ElMessage.success("Turkum holati o'zgartirildi")
      } 
  }

  return {
    categories,
    all_category,
    add_category,
    remove_category,
    toggle_category_status,
    get_category,
    save_category
  }
})