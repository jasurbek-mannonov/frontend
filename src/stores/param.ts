import type { Param } from "@/models/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import http from "@/utils/http";
import { ElMessage } from "element-plus";
import axios from "axios";

export const paramStore = defineStore('params', () => {
  const params = ref<Param[]>([])

  const all_param = async (): Promise<void> => {
    const result = await http.get(`/param?_sort=id&_order=desc`)
    if (result.status == 200) {
      params.value = [...result.data]
    }
  }

  const add_param = async (payload: Param): Promise<void> => {
    const result = await http.post('/param', payload)
    if (result.status == 201) {
      params.value = [result.data, ...params.value]
      ElMessage.success("Yangi xususiyat qo'shildi")
    }
  }

  const remove_param = async (id: number): Promise<void> => {
    const result = await http.delete(`/param/${id}`)
    if (result.status == 200) {
      params.value = params.value.filter((param: Param) => {
        return param.id !== id
      })
      ElMessage.warning("Xususiyat muvaffaqiyatli o'chirildi")
    }
  }

  const toggle_param_status = async (param: Param): Promise<void> => {
    param.status = !param.status
    save_param(param)
  }
    
  const get_param = async(id: number) => {
    return http.get(`/param/${id}`)
  }

  const save_param = async (param: Param): Promise<void> => {
    let result = await http.put(`/param/${param.id}`, param)
    if(result.status == 200){
      params.value = params.value.map((cat: Param) => {
        if(cat.id === param.id) return param        
        return cat
      })
      ElMessage.success("Xususiyat holati o'zgartirildi")
      } 
  }

  const get_param_by_category = async (id: number | null) => {
    return axios.get(`/param?category=${id}`)
  }

  return {
    params,
    all_param,
    add_param,
    remove_param,
    toggle_param_status,
    get_param,
    get_param_by_category
  }
})