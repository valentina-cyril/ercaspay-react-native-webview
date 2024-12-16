"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
// import { TouchableOpacity, Text, StyleSheet,Modal } from 'react-native';
const react_native_1 = require("react-native");
const react_native_webview_1 = require("react-native-webview");
// interface MyButtonProps {
//     title: string;
//     onPress: () => void;
// }
const MyButton = () => {
    const [isLoading, setisLoading] = (0, react_1.useState)(true);
    const [showModal, setshowModal] = (0, react_1.useState)(false);
    const webView = (0, react_1.useRef)(null);
    const messageReceived = (data) => {
        const webResponse = JSON.parse(data);
        // if (handleWebViewMessage) {
        //   handleWebViewMessage(data);
        // }
        switch (webResponse.event) {
            case 'cancelled':
                setshowModal(false);
                // onCancel({ status: 'cancelled' });
                console.log("cancelled");
                break;
            case 'successful':
                setshowModal(false);
                const reference = webResponse.transactionRef;
                console.log("succesfull");
                // if (onSuccess) {
                //   onSuccess({
                //     status: 'success',
                //     transactionRef: reference,
                //     data: webResponse,
                //   });
                // }
                break;
            default:
                // if (handleWebViewMessage) {
                //   handleWebViewMessage(data);
                // }
                console.log({ data });
                break;
        }
    };
    const ercaspacontent = `   
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ercaspay</title>
      </head>
        <body" style="background-color:#fff;height:100vh">
          <script src="https://gw.ercaspay.com/api/v1"></script>
        <script type="text/javascript">
          function initiateTransaction() {
            const payload = {
              amount: 10,
              paymentReference: "R5md7gd9b4s3h2j5d67g",
              paymentMethods: "card,bank-transfer,ussd,qrcode",
              customerName: "John Doe",
              customerEmail: "johndoe@gmail.com",
              customerPhoneNumber: "09061626364",
              redirectUrl: "https://omolabakeventures.com",
              description: "The description for this payment goes here",
              currency: "USD",
              feeBearer: "customer",
              metadata: {
                firstname: "Ola",
                lastname: "Benson",
                email: "iie@mail.com"
              }
            };

            fetch("https://api.merchant.staging.ercaspay.com/api/v1/payment/initiate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer ECRS-TEST-SKbknwOmFoSwIGVec80sTjPGzs86BSfPa8vKpB5V3e"
              },
              body: JSON.stringify(payload)
            })
              .then(response => response.json())
              .then(data => {
                // Send the API response to React Native
                window.ReactNativeWebView.postMessage(JSON.stringify(data));
              })
              .catch(error => {
                window.ReactNativeWebView.postMessage(JSON.stringify({ status: "error", message: error.message }));
              });
          }

          // Automatically trigger the transaction on page load
          document.addEventListener('DOMContentLoaded', initiateTransaction);
        </script>
        </body>
    </html> 
    `;
    const onNavigationStateChange = (state) => {
        const { url } = state;
        if (url === "ooooooo") {
            setshowModal(false);
        }
    };
    return (react_1.default.createElement(react_native_1.Modal, { style: { flex: 1 }, visible: showModal, animationType: "slide", transparent: false },
        react_1.default.createElement(react_native_1.SafeAreaView, { style: { flex: 1 } },
            react_1.default.createElement(react_native_webview_1.WebView, { style: [{ flex: 1 }], source: { html: ercaspacontent }, onMessage: (e) => {
                    var _a;
                    messageReceived((_a = e.nativeEvent) === null || _a === void 0 ? void 0 : _a.data);
                }, onLoadStart: () => setisLoading(true), onLoadEnd: () => setisLoading(false), onNavigationStateChange: onNavigationStateChange, ref: webView, cacheEnabled: false, cacheMode: 'LOAD_NO_CACHE' }),
            isLoading && (react_1.default.createElement(react_native_1.View, null,
                react_1.default.createElement(react_native_1.ActivityIndicator, { size: "large", color: "red" }))))));
};
const styles = react_native_1.StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
exports.default = MyButton;
