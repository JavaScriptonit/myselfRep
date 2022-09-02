// Тестирование на бэкенде:

// 1ый вариант при помощи cy.request:

//@TODO Ошибка от graphql (Status: 500 - Internal Server Error) - Body: POST body missing. Did you forget use body-parser middleware?
// export const emailRegisterQuery = `{"query":"\n  mutation emailRegister($payload: EmailRegisterDto!) {\n    emailRegister(payload: $payload) {\n      __typename\n      ... on RegisterResponse {\n        result\n        jwtToken\n      }\n      ... on ValidationError {\n        result\n        errors {\n          message\n          field\n        }\n      }\n    }\n  }\n","variables":{"payload":{"currency":"RUB","email":"shabunovaa@yandex.ru","countryCode":"rus","recaptchaToken":"03ANYolquvz87h2lrjwBsEa3Sb6zHChogMMSrhMSMPJY5JcyoGpMuKfu0a8v_ANrxBKjvMxUnnii6IngivdA9yrac1iBJPr8oFS9CbkdPGsQP72PXZAKYc_iQBhuTklcrDP9Zfz5fHv3P07Mki3YtdqCkwY7H3tDPRn51j_4PsjCnXXtfPqX0Rep3M9RQHyM7RgthfgrNLa04g5u_zQ5vGg_MgqNgHEnFpYDEV0qYvHdI1hwZWnWPmV3nmHFnG0RMrxkCnrmei3Tr56tuB_JGukX86_HYi55suiFs8BmQPRr2zTEildzYnf1ET0xd5PlKbp5YREAo41ZEi0FQRQX6ilhASIYfi2l0uOPKGnNmgPHSueZAlENMqYPNyTPDXAq8e3qDrX0910aPtq05iiu3boaqnX3LieN1JDnjlzbDUar7AKn6scCFMs9bgans7t4UyChocnjfoL1SmUCFlOJQkuPsWoIOscj2dxrO3wcxj58RH-gvoiprBmc7lzYC4oQG-DpJaB7wkZUjT","registrationPromoCode":"WELCOME"},"lang":"ru"}}`;

it('Нажать на кнопку "Зарегистрироваться" с не заполненными страной и валютой', () => {
    //@TODO Убрать код после ретеста Ошибок (400 и 500) - emailRegisterQuery
    cy.request({
        method: 'POST',
        url: '/graphql',
        body: `{
            query: "\n  mutation emailRegister($payload: EmailRegisterDto!) {\n    emailRegister(payload: $payload) {\n      __typename\n      ... on RegisterResponse {\n        result\n        jwtToken\n      }\n      ... on ValidationError {\n        result\n        errors {\n          message\n          field\n        }\n      }\n    }\n  }\n"
            variables:
            lang: "ru"
            payload:
                countryCode: "rus"
                currency: "RUB"
                email: "0.6485624077448193@bk.ru"
                recaptchaToken: "03ANYolqszVf9de5isi3-rrDhx2Yaw2iS5aMTvoeNyEd22POhrBYHtWjurQcpSxiOsXeChKIzSQxwFoPbP-TuQZ4UWRzLjH8ZFr1VBExNuKnZbJg8NPO5kFtIyz0bOcgPchQyQDehAknZjfcbZ8nAlxwRxWlEFavFcncbEEGR8anmDZnUIcMmJMF3pGBx3KkYQxtThbCnkMlFdlXqyW8njOT-y33kdMPA0bxIdKVwoCNESU4I0zQtINrYZHiWIaHX2_CovkTxiyuc_KsITul_K0iBCwK5u_QaHoRWJj1jLUk5pI0QwEjYdQq1FRwpRhL_dYoSE4HrsYiLAynuzdOwNrnbkCRKwGerRbsObS-yxmMtz7ID3IDyuRVHq2pygGlCWresQIyYRO5gp24AnhrUFNT6NRsElOdSdqjw7Fmq2EHAhm41h2B1KUHMT5dKEhKQXEmsUdz_roTeOGg_fPoJRoHViN_ddKItrCmRaYBr5q3unOy7ChPuwk0mQLj-L91_7B-ky4rB-iKyn"
                registrationPromoCode: "WELCOME"
        }`,
        headers: {Language: 'ru'},
    }).then((response) => {
        cy.log(response);
    });
});

// 2ой вариант при помощи cy.apiMutation:

export const makeEmailRegisterQuery = (payload) => `emailRegister(${payload}: EmailRegisterDto!) {
    emailRegister(payload: $payload) {
      __typename
      ... on RegisterResponse {
        result
        jwtToken
      }
      ... on ValidationError {
        result
        errors {
          message
          field
        }
      }
    }
  }
}`;


cy.apiMutation(makeEmailRegisterQuery({
    countryCode: 'rus',
    currency: 'RUB',
    email: 'breda.33@gdienter.com',
    recaptchaToken:
        '03ANYolqu3OtqP2eLzwPnb4cTXyU7ifbsdePbkAu63xFaWc26Pb_qrsviDoB2EABL5UeOmnBAiYYjR5l0aebkfZiPkXYmB-0UIbujKfj6HC1tFTZIohMMbGhsyoVeu3Bl4bxHxISa7dDhXKyd3II4EeOpp3lxZRdhQB4K-d2q3jpRu1XtLBlVIIIcZ68EE96QSY0t_ylERDOjLbrNH04oZeF6FjtP_LYSvnRB15O16lchVEZPx6bPg-yOPn_SGOikH15NXIZ_fIzeC0QDWj3-mU-CZvQ5T-x0IjlP5ky_k_PwXNBXwAc81ftqyn_jDDzcNcWhPKgDnagrgjrQ-tD5xMb9euJTSF7bhj3Z2yFdXOQNi2FG3Mjhx4XLUYKpnLwIn7L-WAt9yghzLqHJyu5uR0ZA1VbxZMPXoIOwbKkWlHPBvtj6IvBfYcQocJb123quRBsEwOM3elV_yd3jHMmOqJfl6sL_o8gKec0hZR8yzcEJfqkfZdoTGhbpO8wTcIel_a5TK4Xnco3EpW-9jNbsBLfZHSCcdNzKbjA',
    registrationPromoCode: 'WELCOME',
    }),
    'ru',
).then((response) => {
    cy.log(response);
});



// emailRegisterQuery без payload:

//@TODO Ошибка от graphql (Status: 400 - Bad Request) -   "GraphQLError: Syntax Error: Expected Name, found \"!\".", "line": 2, "column": 42
// export const emailRegisterQuery = `{
//   emailRegister(payload: EmailRegisterDto!) {
//     emailRegister(payload: $payload) {
//       __typename
//       ... on RegisterResponse {
//         result
//         jwtToken
//       }
//       ... on ValidationError {
//         result
//         errors {
//           message
//           field
//         }
//       }
//     }
//   }
// }`;
