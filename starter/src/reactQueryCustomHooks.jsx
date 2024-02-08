import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import customFetch from './utils'
import { toast } from 'react-toastify'



export const useFetchTasks = () => {
    const {isLoading, data, error, isError} = useQuery({
        queryKey: ["tasks"],
        queryFn: async () =>{
          const {data} = await customFetch.get("/")
          return data
        }
      })

return { isLoading, isError, data}
}

export const useCreateTasks = () =>{
    const queryClient = useQueryClient()

    const {mutate: createTask, isLoading} = useMutation({
        mutationFn: (taskTitle) => customFetch.post('/', {title: taskTitle}),
        onSuccess: () => {
        toast.success('task added')
        },
        onError: (error) => {
        toast.error(error.response.data.msg)
        },
    })

    return {createTask, isLoading}
}
export const useEditTasks = () =>{
    const queryClient = useQueryClient()
    const {mutate: editTask} = useMutation({
        mutationFn: ({taskId, isDone}) => {
           return customFetch.patch(`/${taskId}`, {isDone})
        },
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['task']})
        }
    })

    return {editTask}
}
export const useDeleteTasks = () =>{
    const queryClient = useQueryClient()
    
    const {mutate: deleteTask, isLoading: deleteTaskLoading} = useMutation({
        mutationFn: (taskId) => {
           return customFetch.delete(`/${taskId}`)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['task']})
        }
    })

    return {deleteTask, deleteTaskLoading}
}