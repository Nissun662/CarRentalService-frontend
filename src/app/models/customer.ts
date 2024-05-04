// export interface Customer {

//     // field_name: datatype;

//     cusId: number;
//     fullName: string;
//     email: string;
//     userName: string;
//     password: string;
//     role: string;

// } 

export interface Customer {
    cusId: number;
    fullName: string;
    email: string;
    userName: string;
    password: string;
    role: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
}

