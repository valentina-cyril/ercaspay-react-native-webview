import * as React from 'react';
import { ModalProps } from 'react-native';

interface Response {
    status: string;
}

interface SuccessResponse extends Response {
    transactionRef?: string;
    paymentReference?: string;
}

export interface ErcasPayProps {
    ercaspayKey: string;
    amount: string | number;
    paymentReference: string;
    paymentMethods: string;
    customerName: string;
    customerEmail: string;
    customerPhoneNumber?: string;
    redirectUrl?: string;
    description?: string;
    currency: string;
    feeBearer?: string;
    metadata?: {
        firstname?: string;
        lastname?: string;
        email?: string;
    }
    isLive?:boolean;
    onCancel: (Response: Response | any) => void;
    onSuccess: (SuccessResponse: SuccessResponse) => void;
    activityIndicatorColor?: string;
    modalProps?: ModalProps;
}