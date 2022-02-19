import axios, { AxiosRequestHeaders } from 'axios'
import Axios, { AxiosObservable } from 'axios-observable'
import StringUtil from '../utils/strings'

export const SUCCESS = "200"
export const BAD_REQUEST = 400

export type ResponseMeta = {
  code: string,
  message?: string
}

export type RequestBody = {
  requestId: string,
  data: {},
}

export type ResponseData = {
  meta: ResponseMeta,
  data?: {}
}

function defaultResponse(): ResponseData {
  return {
    meta: {
      code: "srv_000000",
      message: "has no call"
    },
  }
}

function responseError(code: string, error: string): ResponseData {
  return {
    meta: {
      code: code,
      message: error
    },
  }
}
 
const apiHeaders = (token: String | null, contentType: string ): AxiosRequestHeaders => {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
    'Authorization': `Bearer ${token}`,
    'Content-Type': contentType,
  }
}  

class Restful {

  private  static defaultContentType: string  = "application/json"

  public static createRequestId(): string {
    return StringUtil.generateRandom(12)
  }

  public static async get(url: string) {
    const accessToken = localStorage.getItem('jwt');
    const headers = apiHeaders(accessToken, this.defaultContentType)
    let res:any = await axios.get(url, headers)
    return res
  } 

  public static post(url: string, req: RequestBody): AxiosObservable<any> {
    const accessToken = localStorage.getItem('jwt');
    const headers = apiHeaders(accessToken, this.defaultContentType)
    return Axios.post(url, req, {headers})
  }

  public static async patch(url: string, req: RequestBody): Promise<ResponseData> {
    const accessToken = localStorage.getItem('jwt');
    const headers = apiHeaders(accessToken, this.defaultContentType)

    let response = defaultResponse()
    axios.patch(url, req, {headers}).
    then(res => { response = res.data }).
    catch(error => { response = responseError("srv_100003", String(error)) })
    return response
  }
}

export default Restful