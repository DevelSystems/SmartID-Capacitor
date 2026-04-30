package com.develsystems.smartidexample;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.JSArray;
import com.develsystems.smartid.SmartId;

@CapacitorPlugin(name = "smartid")
public class smartidPlugin extends Plugin {

    private smartid implementation = new smartid();

    @PluginMethod
    public void startLocation(PluginCall call) {
    call.resolve();
}

@PluginMethod
    public void getRawData(PluginCall call) {
        String backendDomain = call.getString("backendDomain");
try {
        implementation.getRawData(getContext(), backendDomain)
            .onSuccess((time, data) -> {
                JSObject ret = new JSObject();
                ret.put("time", time);
                ret.put("data", data); 
                call.resolve(ret);
            })
            .onFailure((time, message, error) -> {
                call.reject(message, error); 
            })
            .start();
              } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

@PluginMethod
public void startSecurityChecks(PluginCall call) {
    String license = call.getString("license");
    Integer channelId = call.getInt("channelId");
    String host = call.getString("host", "");

    if (license == null || channelId == null || host == null) {
        call.reject("Parámetros requeridos");
        return;
    }
try {
    if (hasListeners("securityReasons")) {
        implementation.startSecurityChecks(license, channelId, host, getContext(), reasons -> {
            JSObject ret = new JSObject();
            JSArray reasonsArray = new JSArray();
                if (reasons != null) {
                    for (Object r : reasons) {
                        reasonsArray.put(r);
                    }
                }
            ret.put("reasons", reasonsArray);
            notifyListeners("securityReasons", ret);
        });
        call.resolve();
    } 
    else if (hasListeners("onCloseApp")) {
        implementation.startSecurityChecks(license, channelId, host, getContext(), () -> {
            notifyListeners("onCloseApp", new JSObject());
        });
        call.resolve();
    }
    else {
        implementation.startSecurityChecks(license, channelId, host, getContext());
        call.resolve();
    }
    } catch (Exception e) {
            call.reject(e.getMessage());
        }
}

@PluginMethod
    public void stopSecurityChecks(PluginCall call) {
              try {
                implementation.stopSecurityChecks(getContext());
                call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }


    @PluginMethod
    public void startBlockCellphoneScreen(PluginCall call) {
        boolean enableScreen = call.getBoolean("enableScreen", false);
        boolean enableApp = call.getBoolean("enableApp", false);
        getActivity().runOnUiThread(() -> {
        try {
            implementation.startBlockCellphoneScreen(getContext(), enableScreen, enableApp);
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    });
    }

        @PluginMethod
    public void enableOverlayProtection(PluginCall call) {
      getActivity().runOnUiThread(() -> {
        try {
        boolean enabled = implementation.enableOverlayProtection(getContext());
        JSObject ret = new JSObject();
                ret.put("enabled", enabled);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    });
    }

}
