export const constants = {
    regularARF_delimiter: '950001600000000@',
    customARF_delimiter: '@',
    pipe_delimiter: '|',
    delimiterArray: [',', '|', '@'],
    arfArray: ['REGULAR ARF', 'CUSTOM ARF', 'PARSED ARF', 'PARSED CUSTOM ARF', 'GENERIC PARSED ARF', 'GENERIC PARSED ARF TT', 'OTHERS'],
    fileTypeArray: ['csv', 'parquet'],
    feature: "compare",
    emailPattern: /^\w+([-+.']\w+)*@experian.com(,\w+([-+.']\w+)*@experian.com)*$/,
    pathPattern: /^s3:\/\/([^\/]+)\/(.*?([^\/]+)\/?)$/,
    callerIdPattern: /^[0-9_]*$/
}
