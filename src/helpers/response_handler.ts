    const responseObj = (err: any, responseCode: any, msg: any, data: any) =>{
        return {
            err: err,
            responseCode: responseCode,
            msg: msg,
            response: data
        }
    }

    const sendResponse = (responseObj: any) => {
        try {
            if (responseObj.responseCode != 200) {
                if (!responseObj.response)
                    responseObj.response = {}
                if (!responseObj.err_stack)
                    responseObj.err_stack = ""
                if (responseObj.response.err_stack) {
                    responseObj.err_stack = responseObj.response.err_stack
                    delete responseObj.response.err_stack
                }
            }
            return responseObj
        } catch (err) {
            console.log(err)
            return ({ msg: 'Internal Server Error' })
        }
    }

export{
    responseObj,
    sendResponse
    }
