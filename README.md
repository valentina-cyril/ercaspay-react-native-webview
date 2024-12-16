
 
# Ercaspay React Native Webview

##### NB: It has only be tested on React Native Expo, though it should work on pure React Native apps

This package lets you accept payments with Ercaspay in few minutes Just install, add your keys, and it handles the rest. This was created at Ercaspay Hackathon 2024 so you know you’re in good hands. 

 

### **Installation**

Add `ercaspay-react-native-webview` to your project by running;

```bash 
npm install ercaspay-react-native-webview


```
### **Additional Setup**

To ensure everything works smoothly, install and configure the required dependency, `react-native-webview`:

 
```bash 
npm add react-native-webview
```

for expo applications run;
```bash 
npx expo install react-native-webview
```
That’s it! You’re all set.

### **Usage**
##### Basic Example

```javascript
import React from 'react';
import ErscasPay from 'ercaspay-react-native-webview';
import { StyleSheet, View } from 'react-native';

function Pay() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ErscasPay
        ercaspayKey='ECRS-TEST-SKbknwOmFff..' // from your Ercaspay dashboard
        paymentReference='ajajjsu81234678' //auto generated probably from the backend
        amount={10000} 
        customerName='John doe'
        customerEmail='john@mailinator.com'
        currency='NGN'
        paymentMethods='card,bank-transfer' //go through ercaspay doc to see other options, this is a comma separated string
        onCancel={(e) => {
          //handle response when any operation fails
        }}
        onSuccess={(res) => {
        // handle response when the transaction is successful 
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```


### **API Reference**

| Name                                 |                                                                                   use/description                                                                                   |                                                      extra |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------: |
| `ercaspayKey`                        |                                                           secret key(from your ercaspay dashboard visit ercaspay.com to get yours)                                          |                                                      |
| `amount`                             |                                                                                  Amount to be paid (above 100)                                                                                |                                                      |
| `activityIndicatorColor`             |                                                                                   color of loader                                                                                   |                                           default: `blue` |
| `customerEmail(required by ercaspay)` |                                                                                    Customers email                                                                                    |                                            default: `nill` |
| `customerPhoneNumber`                      |                                                                                   customer Phone Number                                                                                   |                                            default: `nill` |
| `customerName(required by ercaspay)`                        |                                                                                    Customer Name                                                                                     |                                            default: `nill` |
| `feeBearer`                         |    it is either `"customer"` or `"merchant"`.  account.   |                                            default: `customer` |
| `redirectUrl`                         |    A URL which user will be redirected to, on completion of the payment    |                                            default: `nill` |
| `description`                         |    Description for the transaction.     |                                            default: `nill` |
|`paymentReference(required by ercaspay)`                        |                                                                                           Merchant's Unique reference for the transaction. possibly generated from the backend                                                                                            |                                                                                                                      |                                            default: `nill` |
| `paymentMethods(required by ercaspay)`                           | Specify payment methods available to users. This is a comma separated value eg "card, bank-transfer, qrcode, ussd,"  Example of usage: `paymentMethods={"card,bank-transfer"}` |                                        default: `"card" ` |
| `onCancel`                           |       callback function if  complete payment failed or payment transaction could not be verified.        |                                    |
| `onSuccess`                          |                            callback function if transaction was successful and verified (read ercaspay doc for checkout payment verification )                            |   




## **Contributions**

Want to help improve this package? [Read how to contribute](https://github.com/valentina-cyril/ercaspay-react-native-webview/tree/main/CONTRIBUTING.md) and feel free to submit your PR!

## **Licensing**

 MIT 

 ### Other links
- [NPM Package](https://www.npmjs.com/package/ercaspay-react-native-webview)





 


