import axios, { AxiosRequestHeaders } from 'axios'
import Axios, { AxiosObservable } from 'axios-observable'
import StringUtil from '../utils/strings'

export const SUCCESS = 200
export const BAD_REQUEST = 400

export type RequestBody = {
  requestId: string
}

export type ResponseData = {
  code: number
  message?: string
  data: any
}

function defaultResponse(): ResponseData {
  return {
    code: 400,
    data: {}
  }
}

function responseError(code: number, error: string): ResponseData {
  return {
    code: code,
    data: error
  }
}
 
const apiHeaders = ( contentType: string ): AxiosRequestHeaders => {
  const headers =  {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': contentType,
  }
  const token =  localStorage.getItem('jwt')
  if (!token) {
    return headers
  }
  return headers && {'Authorization': `Bearer ${token}`}
}

class Restful {

  private static defaultContentType: string  = "application/json"

  public static createRequestId(): string {
    return StringUtil.generateRandom(12)
  }

  public static  get(url: string): AxiosObservable<any> {
    const headers = apiHeaders(this.defaultContentType)
    return Axios.get(url, {headers})
  } 

  public static post(url: string, req: RequestBody & any): AxiosObservable<any> {
    const headers = apiHeaders(this.defaultContentType)
    return Axios.post(url, req, {headers})
  }

  public static patch(url: string, req: RequestBody & any):  AxiosObservable<any>  {
    const headers = apiHeaders(this.defaultContentType)
    return Axios.patch(url, req, {headers})
  }
}

export default Restful