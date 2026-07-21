export const useValidateStore = defineStore('validateError', () => {
  const errors = ref<Record<string, any>>({})

  const setError = (name: string, message: string) => {
    errors.value[name] = message
  }

  const resetError = () => {
    errors.value = {}
  }

  return {
    errors,
    setError,
    resetError
  }
})
