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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
// import { TouchableOpacity, , StyleSheet,Modal } from 'react-native';
const react_native_1 = require("react-native");
const react_native_webview_1 = require("react-native-webview");
// interface MyButtonProps {
//     title: string;
//     onPress: () => void;
// }
function ErscasPay({ ercaspayKey = "", amount = 0, paymentReference = "", paymentMethods = "card", customerName = "", customerEmail = "", customerPhoneNumber, redirectUrl, description, currency = "NGN", feeBearer = "customer", metadata, onCancel, onSuccess, activityIndicatorColor = "FF6C37", modalProps }) {
    const [isLoading, setisLoading] = (0, react_1.useState)(true);
    const [showModal, setshowModal] = (0, react_1.useState)(false);
    const [checkoutURL, setCheckoutURL] = (0, react_1.useState)("");
    const [transRef, setTransRef] = (0, react_1.useState)("");
    const callInitiatePayment = () => __awaiter(this, void 0, void 0, function* () {
        const payload = {
            "amount": amount,
            "paymentReference": paymentReference,
            "paymentMethods": paymentMethods,
            "customerName": customerName,
            "customerEmail": customerEmail,
            "customerPhoneNumber": customerPhoneNumber,
            "redirectUrl": redirectUrl,
            "description": description,
            "currency": currency,
            "feeBearer": feeBearer,
            "metadata": metadata
        };
        try {
            // console.log(authToken)
            var request = yield fetch("https://api.merchant.staging.ercaspay.com/api/v1/payment/initiate", {
                method: "POST",
                body: payload && JSON.stringify(payload),
                headers: {
                    "Authorization": `Bearer ${ercaspayKey}`,
                    "Content-type": "application/json",
                    "Accept": "application/json",
                },
            });
            // const responseText = await request.text();  // Log as text before JSON parsing
            // console.log("Raw response:", responseText);
            const status = request.status;
            const data = yield request.json();
            console.log({ data });
            if (data.responseCode === "failed") {
                onCancel(data);
                setisLoading(false);
                setshowModal(false);
            }
            if (data.responseCode === "success") {
                setTransRef(data.responseBody.transactionReference);
                setCheckoutURL(data.responseBody.checkoutUrl);
                setshowModal(true);
                setisLoading(false);
            }
            // setCheckoutURL(data?.checkoutUrl)
            request = null;
            return data;
        }
        catch (e) {
            console.error(e);
            setisLoading(false);
            setshowModal(false);
            return onCancel(e);
        }
    });
    const verifyPayment = () => __awaiter(this, void 0, void 0, function* () {
        try {
            var request = yield fetch(`https://api.merchant.staging.ercaspay.com/api/v1/payment/transaction/verify/${transRef}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${ercaspayKey}`,
                    "Content-type": "application/json",
                    "Accept": "application/json",
                },
            });
            const data = yield request.json();
            console.log({ data });
            if (data.responseCode === "failed") {
                onCancel(data);
                setisLoading(false);
                setshowModal(false);
            }
            if (data.responseCode === "success") {
                onSuccess(data);
                setshowModal(false);
                setisLoading(false);
            }
            request = null;
            return;
        }
        catch (e) {
            console.error(e);
            setisLoading(false);
            setshowModal(false);
            return onCancel(e);
        }
    });
    (0, react_1.useEffect)(() => {
        console.log("started ercaspay");
        if (ercaspayKey) {
            callInitiatePayment();
        }
    }, [ercaspayKey]);
    const onNavigationStateChange = (state) => {
        const { url } = state;
        const lastPart = url.substring(url.lastIndexOf('/') + 1);
        console.log(lastPart);
        if (url === redirectUrl) {
            verifyPayment();
            return;
        }
        if (lastPart === "success?callbackurl") {
            verifyPayment();
            return;
        }
        if (lastPart.includes("status=FAILED")) {
            verifyPayment();
            return;
        }
        if (lastPart === "error") {
            verifyPayment();
            return;
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_native_1.Modal, { style: { flex: 1 }, visible: showModal, animationType: "slide", transparent: false },
            react_1.default.createElement(react_native_1.SafeAreaView, { style: { flex: 1 } },
                react_1.default.createElement(react_native_webview_1.WebView, { style: [{ flex: 1 }], source: { uri: checkoutURL }, onLoadStart: () => setisLoading(true), onLoadEnd: () => setisLoading(false), onNavigationStateChange: onNavigationStateChange, cacheEnabled: false, cacheMode: 'LOAD_NO_CACHE' }),
                isLoading && (react_1.default.createElement(react_native_1.View, null,
                    react_1.default.createElement(react_native_1.ActivityIndicator, { animating: isLoading, size: "large", color: activityIndicatorColor })))))));
}
;
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
exports.default = ErscasPay;
