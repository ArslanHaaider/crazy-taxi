'use server'
type SubmitReturn = {
  message?:string,
  error?:string
}

type Values = {
  pickup: string,
}
const submitForm = async (data:Values) : Promise<SubmitReturn>=>{
  if(data.pickup === 'arslaan'){
    return {message:'success'}
  }
  else{
    return {error : "Name is wrong"}
  }
}

export default submitForm