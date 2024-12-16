import React from 'react';
import { ErcasPayProps } from './config/types';
declare function ErscasPay({ ercaspayKey, amount, paymentReference, paymentMethods, customerName, customerEmail, customerPhoneNumber, redirectUrl, description, currency, feeBearer, metadata, onCancel, onSuccess, activityIndicatorColor, modalProps }: ErcasPayProps): React.JSX.Element;
export default ErscasPay;
