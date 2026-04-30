import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(smartidPlugin)
public class smartidPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "smartidPlugin"
    public let jsName = "smartid"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "startLocation", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getRawData", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startSecurityChecks", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stopSecurityChecks", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startBlockCellphoneScreen", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "enableOverlayProtection", returnType: CAPPluginReturnPromise),
    ]
    private let implementation = smartid()

 @objc func startLocation(_ call: CAPPluginCall){
    DispatchQueue.main.async {
        self.implementation.startLocation()
        call.resolve()
    }
}

@objc func getRawData(_ call: CAPPluginCall) {
    let backendDomain = call.getString("backendDomain")
    
    self.implementation.getRawData(backendDomain: backendDomain) { (result, error) in
        if let error = error {
            let message = error["message"] as? String ?? "Error desconocido"
            let code = String(describing: error["errorCode"] ?? "0")
            call.reject(message, code, nil, error)
        } else if let result = result {
            call.resolve(result)
        }
    }
}

 @objc func startSecurityChecks(_ call: CAPPluginCall){
        call.resolve()
}

 @objc func stopSecurityChecks(_ call: CAPPluginCall){
        call.resolve()
}

 @objc func startBlockCellphoneScreen(_ call: CAPPluginCall){
        call.resolve()
}

 @objc func enableOverlayProtection(_ call: CAPPluginCall){
        call.resolve()
}

}
