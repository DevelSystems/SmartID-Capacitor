package com.develsystems.smartidexample;

import android.content.Context;
import com.getcapacitor.Logger;
import com.develsystems.smartid.SmartId;
import com.develsystems.smartid.callbacks.ISecurityReasonsListener;
import com.develsystems.smartid.callbacks.GetRawDataResponse;

public class smartid {

    public GetRawDataResponse getRawData(Context context, String applicationBackendDomain) {
      return  SmartId.getInstance().GetRawData(context, applicationBackendDomain);
    }

    public void startSecurityChecks(String license, int channelId, String host, Context context, ISecurityReasonsListener listener) {
        SmartId.getInstance().StartSecurityChecks(license, channelId, host, context, listener);
    }

    public void startSecurityChecks(String license, int channelId, String host, Context context, Runnable onCloseApp) {
        SmartId.getInstance().StartSecurityChecks(license, channelId, host, context, onCloseApp);
    }

    public void startSecurityChecks(String license, int channelId, String host, Context context) {
        SmartId.getInstance().StartSecurityChecks(license, channelId, host, context);
    }

    public void stopSecurityChecks(Context context) {
        SmartId.getInstance().StopSecurityChecks(context);
    }

    public void startBlockCellphoneScreen(Context context, boolean enableScreen, boolean enableApp) {
        SmartId.getInstance().StartBlockCellphoneScreen(context, enableScreen, enableApp);
    }

    public boolean enableOverlayProtection(android.content.Context context) {
       return  SmartId.getInstance().EnableOverlayProtection(context);
    }


}
