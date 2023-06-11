
export const SCHEMA = {
    customers: {
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
          id: {
            type: 'string',
            maxLength: 100,
          },
          name: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
        },
        required: ['id', 'name', 'address', 'phone', 'email'],
    },

    inwards: {
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
          id: {
            type: 'string',
            maxLength: 100,
          },
          jobID: {
            type: 'string',
          },
          customerID: {
            type: 'string',
          },
          inwardDate: {
            type: 'string',
          },
          receivedFrom: {
            type: 'string',
          },
          totalCharge: {
            type: 'string',
          },
          serviceCharge: {
            type: 'string',
          },
          partCharge: {
            type: 'string',
          },
          isActive: {
            type: 'boolean',
          },
          jobDataID: {
            type: 'string',
          },
          inwardProducts: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string"
                    },
                    products: {
                        type: "string"
                    },
                    serialNo: {
                        type: "string"
                    },
                    problem: {
                        type: "string"
                    },
                    remarks: {
                        type: "string"
                    },
                }
            }
          },
        },
        required: ['id', 'jobID', 'customerID', 'inwardDate', 'receivedFrom', 'totalCharge', 'serviceCharge' , 'partCharge', 'isActive', 'jobDataID', 'inwardProducts'],
    },
    outwards: {
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
          id: {
            type: 'string',
            maxLength: 100,
          },
          jobID: {
            type: 'string',
          },
          inwardID: {
            type: 'string',
          },
          customerID: {
            type: 'string',
          },
          invoiceDate: {
            type: 'string',
          },
          serviceCharge: {
            type: 'string',
          },
          partCharge: {
            type: 'string',
          },
          totalCharge: {
            type: 'string',
          },
          jobStatus: {
            type: 'string',
          },
          remarks: {
            type: 'string',
          },
          isActive: {
            type: 'boolean',
          },
        },
        required: ['id', 'jobID', 'inwardID', 'customerID', 'invoiceDate','serviceCharge','partCharge','totalCharge','jobStatus','isActive'],
    },
    payments: {
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
          id: {
            type: 'string',
            maxLength: 100,
          },
          jobID: {
            type: 'string',
          },
          outwardID: {
            type: 'string',
          },
          inwardID: {
            type: 'string',
          },
          customerID: {
            type: 'string',
          },
          outstandingAmount: {
            type: 'string',
          },
          paidAmount: {
            type: 'string',
          },
          invoiceDate: {
            type: 'string',
          },
          paymentDate: {
            type: 'string',
          },
          isPending: {
            type: 'boolean',
          },
          transactionData: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string"
                    },
                    paymentDate: {
                        type: "string"
                    },
                    paymentMode: {
                        type: "string"
                    },
                    remarks: {
                        type: "string"
                    },
                    amount: {
                        type: "string"
                    },
                }
            }
          },
        },
        required: ['id', 'jobID','outwardID','inwardID','customerID','outstandingAmount','paidAmount','invoiceDate','paymentDate','isPending'],
    },
    jobs: {
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
          id: {
            type: 'string',
            maxLength: 100,
          },
          jobID: {
            type: 'string',
          },
          paymentID: {
            type: 'string',
          },
          outwardID: {
            type: 'string',
          },
          inwardID: {
            type: 'string',
          },
          customerID: {
            type: 'string',
          },
          inwardDate: {
            type: 'string',
          },
        },
        required: ['id','jobID','inwardID','customerID','inwardDate'],
    },
    jobcount: {
        version: 0,
        primaryKey: 'year',
        type: 'object',
        properties: {
          year: {
            type: 'string',
            maxLength: 100,
          },
          count: {
            type: 'number',
          },
        },
        required: ['year', 'count'],
    },
    settings: {
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
          id: {
            type: 'string',
            maxLength: 100,
          },
          companyName: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          contact: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          jobID: {
            type: 'string',
          },
          inwardTC: {
            type: 'string',
          },
          outwardTC: {
            type: 'string',
          },
          paymentTC: {
            type: 'string',
          },
        },
        required: ['id', 'companyName','address','contact','email','jobID'],
    },
};