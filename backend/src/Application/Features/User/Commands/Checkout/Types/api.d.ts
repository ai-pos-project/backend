declare namespace Checkout {
    interface IPackage {
        id: string;
        amount: number;
        products: Product[];
    }
    interface IProduct {
        name: string;
        quantity: number;
        price: number;
    }
    interface IOrder {
        orderId: string;
        amount: number;
        currency: string;
        packages: IPackage[];
        redirectUrls: {
            confirmUrl: string;
            cancelUrl: string;
        };
    }
    type TLinePayBody = IOrder | IConfirmLinePay;
    interface IConfirmLinePay {
        amount: number;
        currency: string;
    }
    interface ICheckoutDeo {
        order: Order;
        redirectLinePayUrl?: string;
    }
    interface ICheckoutResponse {
        data: {
            order: Order;
            redirectLinePayUrl?: string;
        }
    }
}