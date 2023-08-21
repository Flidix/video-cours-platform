export function authEmailPage(confirmationLink: string): string {
   return `
      <h1>Підтвердження облікового запису</h1>
      <p>Перейдіть за <a href="${confirmationLink}">посиланням</a>, щоб підтвердити обліковий запис.</p>
    `;
 }
 