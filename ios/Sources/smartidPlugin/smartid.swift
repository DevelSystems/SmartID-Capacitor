import Foundation
import SmartId

@objc public class smartid: NSObject {

    @objc public func startLocation() {
        SID.startLocation()
    }

@objc public func getRawData(backendDomain: String?, completion: @escaping ([String: Any]?, [String: Any]?) -> Void) {
        
        SID.shared
            .getRawData(
                applicationBackendDomain: backendDomain
            )
            .onSuccess(success: { time, json in
                let responseMap: [String: Any] = [
                    "time": time,
                    "data": json
                ]
                completion(responseMap, nil)
            })
            .onFailure(failure: { time, message, errorCode in
                let errorMap: [String: Any] = [
                    "time": time,
                    "message": message,
                    "errorCode": errorCode
                ]
                completion(nil, errorMap)
            })
            .start() 
    }
}
