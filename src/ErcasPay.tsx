import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Modal, View, ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { ErcasPayProps } from './config/types';

function ErscasPay({
    ercaspayKey = "",
    amount = 0,
    paymentReference = "",
    paymentMethods = "card",
    customerName = "",
    customerEmail = "",
    customerPhoneNumber,
    redirectUrl,
    description,
    currency = "NGN",
    feeBearer = "customer",
    metadata,
    onCancel,
    onSuccess,
    activityIndicatorColor = "FF6C37",
    modalProps
}: ErcasPayProps) {
    const [isLoading, setisLoading] = useState(true);
    const [showModal, setshowModal] = useState(false);
    const [checkoutURL, setCheckoutURL] = useState("");
    const [transRef, setTransRef] = useState("")

    const callInitiatePayment = async () => {
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
        }
        try {
            var request = await fetch("https://api.merchant.staging.ercaspay.com/api/v1/payment/initiate", {
                method: "POST",
                body: payload && JSON.stringify(payload),
                headers: {
                    "Authorization": `Bearer ${ercaspayKey}`,
                    "Content-type": "application/json",
                    "Accept": "application/json",
                },
            })
            

            const data = await request.json()
            console.log({ data })
            if (data.responseCode === "failed") {
                onCancel(data)
                setisLoading(false);
                setshowModal(false);
            }
            if (data.responseCode === "success") {
                setTransRef(data.responseBody.transactionReference)
                setCheckoutURL(data.responseBody.checkoutUrl)
                setshowModal(true);
                setisLoading(false);
            }
            request = null!

            return;
        } catch (e) {
            console.error(e);
            setisLoading(false);
            setshowModal(false);
            return onCancel(e)
        }
    }

    const verifyPayment = async() => {
        try {

            var request = await fetch(`https://api.merchant.staging.ercaspay.com/api/v1/payment/transaction/verify/${transRef}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${ercaspayKey}`,
                    "Content-type": "application/json",
                    "Accept": "application/json",
                },
            })

            const data = await request.json()
            console.log({ data })
            if (data.responseCode === "failed") {
                onCancel(data)
                setisLoading(false);
                setshowModal(false);
            }
            if (data.responseCode === "success") {
                onSuccess(data)
                setshowModal(false);
                setisLoading(false);
            }
            request = null!

            return;
        } catch (e) {
            console.error(e);
            setisLoading(false);
            setshowModal(false);
            return onCancel(e);
        }
    }

    useEffect(() => {
        console.log("started ercaspay")
        if (ercaspayKey) {
            callInitiatePayment();
        }
    }, [ercaspayKey])


    const onNavigationStateChange = (state: WebViewNavigation) => {
        const { url } = state;
        const lastPart = url.substring(url.lastIndexOf('/') + 1);
        console.log(lastPart); 

        if (url === redirectUrl) {
            verifyPayment()
            return;
        }

        if(lastPart === "success?callbackurl"){
            verifyPayment();
            return;
        }

        if(lastPart.includes("status=FAILED")){
            verifyPayment();
            return;
        }  

        if(lastPart === "error"){
            verifyPayment();
            return;
        }  
    };
    return (
        <>
            <Modal style={{ flex: 1 }} visible={showModal} animationType="slide" transparent={false} >
                <SafeAreaView style={{ flex: 1 }}>
                    <WebView
                        style={[{ flex: 1 }]}
                        source={{ uri: checkoutURL }}
                        onLoadStart={() => setisLoading(true)}
                        onLoadEnd={() => setisLoading(false)}
                        onNavigationStateChange={onNavigationStateChange}
                        cacheEnabled={false}
                        cacheMode={'LOAD_NO_CACHE'}
                    />
                    {isLoading && (
                        <View>
                            <ActivityIndicator animating={isLoading} size="large" color={activityIndicatorColor} />
                        </View>
                    )}
                </SafeAreaView>
            </Modal>
        </>
    );
};
export default ErscasPay
